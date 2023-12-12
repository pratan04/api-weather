const { json } = require("body-parser");
const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");


const app=express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){

    res.sendFile(__dirname +"/index.html");
    


    

    
})

app.post("/",function(req,res){
   
   
const query=req.body.cityName;
const id="8ff80de12990967213c9d4343f3b9ddf";


const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+id;


https.get(url,function(response){
console.log(response.statusCode);

response.on("data",function(data){

    const weatherData=JSON.parse(data);
    const des=weatherData.weather[0].description;
  const temp=weatherData.main.temp;
  const icon=weatherData.weather[0].icon;
  const imgURL="http://openweathermap.org/img/wn/" +icon+ "d@2x.png";
    res.write("<h1>tempreature in"+query+"is"+temp+"</h1><br>");
    res.write("<h2>weather is"+des+"</h2>");
    res.write("<img src="+imgURL+">");
    res.send();
    
})
})
})




app.listen(3000,function(){
    console.log("server 3000");
});