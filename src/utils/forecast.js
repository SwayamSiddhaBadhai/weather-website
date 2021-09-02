const request = require("request")

const forecast = (lat,lon,callback) =>{
    const url="http://api.openweathermap.org/data/2.5/weather?lat=" + encodeURIComponent(lat) +"&lon="+ encodeURIComponent(lon) + "&appid=060116b99a904a02843afb7e4e846c2f"
    request({url,json:true},(error,{body})=>{
        if(error){
            callback("Not connected to network",undefined)
        }
        else if(body.error){
            callback("Enter the proper coordinates",undefined)
        }
        else{
            callback(undefined,"The temp is "+body.main.temp+" and humidity is "+body.main.humidity)
        }
    })
}

module.exports= forecast