import axios from "axios";
import { useEffect, useState } from "react";

import Heading from "../components/Heading";
import WeatherItem from "../components/WeatherItem";

const Weather = () => {
  const [location, setLocation] = useState({});
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
        const position = await getPosition();
        const { latitude, longitude } = position.coords;
        const locationData = await getLocationData(latitude, longitude);
        const city = locationData.state;
        const country = locationData.country;
        setLocation({ city, country });

        const API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
        const response = await axios.get(API_URL);
        const todayWeather = response.data.list[0];
        console.log(
          `Today's weather in ${city}: ${todayWeather.weather[0].description}, ${todayWeather.main.temp} °C`
        );

        const nextFiveDays = response.data.list
          .filter((weather, index) => {
            // Filter out any weather data that is not at morning or evening
            if (
              (weather.dt_txt.includes("06:00:00") ||
                weather.dt_txt.includes("09:00:00") ||
                weather.dt_txt.includes("12:00:00")) &&
              index % 2 === 0
            ) {
              // Get the weather data for the next 5 days
              const date = new Date(weather.dt_txt);
              const currentDate = new Date();
              const diffTime = date - currentDate;
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              return diffDays >= 0 && diffDays <= 5;
            }
            return false;
          })
          .map((weather, index) => {
            // Add an additional "hours" property to each day object
            const hours = response.data.list.filter((hour) => {
              const date = new Date(hour.dt_txt);
              const dayDiff = Math.ceil(
                (date - new Date(weather.dt_txt)) / (1000 * 60 * 60 * 24)
              );
              return dayDiff === 0;
            });
            return {
              ...weather,
              hours: hours,
            };
          });
        setWeatherData([todayWeather, ...nextFiveDays]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchWeatherData();
  }, []);

  const getPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const getLocationData = async (latitude, longitude) => {
    const API_KEY = process.env.REACT_APP_LOCATION_API_KEY;
    const API_URL = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${API_KEY}`;
    const response = await axios.get(API_URL);
    const locationData = response.data.results[0].components;
    return locationData;
  };


  return (
    <div className="p-10 flex flex-col items-center justify-center gap-4 pb-20 overflow-x-hidden">
      <Heading
        title={"إن شاء الله سبحانه وتعالى"}
        subtitle={`Probable weather in the next 5 days ${
          location.city ? `in ${location?.city}, ${location?.country}` : ""
        }.`}
        center
        ar
      />
      {weatherData.map((item) => (
        <WeatherItem data={item} />
      ))}
    </div>
  );
};

export default Weather;
