const express = require('express');
const app = express();
const https = require('https');
const port = 3000;
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.sendfile(`${__dirname}/index.html`);
});

app.post("/", (req, res) => {
  const query = req.body.cityName;
  const apiKey = "f882f7f76dcc7fb16df2d7b6b7193350";
  const units = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${units}`;

  https.get(url, (resp) => {
    resp.on('data', (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      res.write("<p>The weather is currently " + weatherDescription + "</p>")
      res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius.</h1>");
      res.write(`<img src="http://openweathermap.org/img/wn/${icon}@4x.png" alt="weather-img">`)
      res.write(`<a href="/">Go back to main page</a>`);
      res.send();
    });
  });
});


app.listen(port, () => {
  console.log("Server is running on port " + port);
});
