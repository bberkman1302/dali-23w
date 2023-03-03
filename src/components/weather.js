
import './weather.css';
import React, { useState, useEffect } from 'react';

function Weather() {
  const [weather, setWeather] = useState(null);



  useEffect(() => {
    const API_KEY = '97aeef7741b917ddc83d17eddb1cd6ec';
    
    //get user's location coordinates
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;

      console.log("hello")
      //fetch weather data based on user's location
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${API_KEY}`;
      fetch(url)
        .then(response => response.json())
        .then(data => setWeather(data));
    });
  }, []);

  //returns "loading" if weather is null
  if (!weather) {
    return <div id = "loading">Loading...</div>;
  }


  return (
    <div className="weather">
      <div id="description">{Math.round(weather.main.temp)}° F</div>
    </div>
  );
}

export default Weather;