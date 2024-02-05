const express = require ("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){

  const query = req.body.cityName;
  const apikey= "b6ac9fc8531c4adf52e0047228e9b76a";
  const units= "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+units ;

  https.get (url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp;
      const long = weatherData.coord.lon;
      const lati = weatherData.coord.lat;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<h3>The weather is currently "+description+"<h3>");
      res.write("<h1>The temperature in "+query+" is "+temp+" deg celsius</h1>");
      res.write("<h3>The longitude of the location entered is :"+long+"</h3>")
      res.write("<h3>The latitude of the location entered is :"+lati+"</h3>")
      res.write("<p>Current Weather</p> <img src= "+imageURL+" alt='image'>");
      
      res.send();
    })
  })
})

app.listen(3000,function(){
  console.log("Server is running in port 3000")
})
