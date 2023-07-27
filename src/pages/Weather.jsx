import axios from "axios";
import { useEffect, useState } from "react";

import Heading from "../components/Heading";
import moment from "moment";

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
        setLocation({city,country});

        const API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
        const response = await axios.get(API_URL);
        const weatherData = response.data.list.filter(item => item.dt_txt.includes('12:00:00'));
        setWeatherData(weatherData);
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

  const getIconUrl = (iconCode) => {
    return `http://openweathermap.org/img/w/${iconCode}.png`;
  };

  return (
    <div className="p-10 flex flex-col items-center justify-center gap-4 pb-20 overflow-x-hidden">
      <Heading
        title={"إن شاء الله سبحانه وتعالى"}
        subtitle={`Probable weather in the next 5 days in ${location?.city}, ${location?.country}.`}
        center
        ar
      />
      {weatherData.map((item) => (
        <div
          key={item.dt}
          className="rounded-md drop-shadow-lg h-[120px] w-[600px] max-w-[90vw] bg-second-bg dark:bg-second-dark-bg relative flex items-center justify-center flex-col gap-2"
        >
          <img src={getIconUrl(item.weather[0].icon)} alt={item.weather[0].description} className="absolute top-1 left-1 " />
          <p className="absolute top-2 right-3 text-neutral-500">
            {moment(item.dt_txt).format("LL")}
          </p>
          <p className="font-bold text-xl">{item.main.temp}°C</p>
          <p>{item.weather[0].description}</p>
        </div>
      ))}
    </div>
  );
};

export default Weather;
