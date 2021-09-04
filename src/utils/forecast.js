const request = require("request")

const forecast = (lat,lon,callback) =>{
    const url="http://api.openweathermap.org/data/2.5/weather?lat=" + encodeURIComponent(lat) +"&lon="+ encodeURIComponent(lon) + "&appid=060116b99a904a02843afb7e4e846c2f&units=metric"
    request({url,json:true},(error,{body})=>{
        if(error){
            callback("Not connected to network",undefined)
        }
        else if(body.error){
            callback("Enter the proper coordinates",undefined)
        }
        else{
            
            callback(undefined,body.weather[0].description+" with "+body.main.temp+" degrees. The high today is "+ body.main.temp_max+" with a low of "+body.main.temp_min+" and the humidity is "+body.main.humidity)
        }
    })
}

module.exports= forecast