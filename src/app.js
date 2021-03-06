const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()
const port = process.env.PORT || 3000

//define paths for express config
const publicDirectoryPath = path.join(__dirname,"../public")
const viewPath = path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname,"../templates/partials")

//setup handlebars engine and views location
app.set("view engine","hbs")
app.set("views",viewPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get("",(req,res)=>{
    res.render("index",{
        title:"weather",
        name:"Swati Badhai"
    })
})

app.get("/about",(req,res)=>{
    res.render("about",{
        title:"About me",
        name:"Swati Badhai"
    })
})

app.get("/help",(req,res)=>{
    res.render("help",{
        helpText:"This is some Helpful text",
        title:"Help",
        name:"Swati Badhai"
    })
})

app.get("/weather",(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"You must enter a address"
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location})=>{
        if(error){
            return res.send({
                error:error
            })
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error:error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
})

app.get("/help/*",(req,res)=>{
    res.render("404",{
        name:"Swati Badhai",
        title:"404",
        errorMessage:"Help Article not found"
    })
})

app.get("*",(req,res)=>{
    res.render("404",{
        name:"Swati Badhai",
        title:"404",
        errorMessage:"Page not found"
    })
})

app.listen(port, ()=>{
    console.log("Server is up on port "+ port)
})