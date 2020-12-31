const express = require('express');
const app = express();
const https = require('https');
const port = 3000;

const apiKey = "f882f7f76dcc7fb16df2d7b6b7193350";
var city = "Warsaw";

app.get("/", (req, res) => {
  const url = 'https://api.openweathermap.org/data/2.5/weather?q=Warsaw&appid=f882f7f76dcc7fb16df2d7b6b7193350&units=metric';
  https.get(url, (resp) => {

    resp.on('data', (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      res.write("<p>The weather is currently " + weatherDescription + "</p>")
      res.write("<h1>The temperature in Warsaw is " + temp + " degrees Celcius.</h1>");
      res.send();
    });
  });
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
