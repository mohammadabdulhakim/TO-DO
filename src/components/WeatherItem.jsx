import { useState } from "react";
import moment from "moment";
import Button from "./buttons/Button";

const WeatherItem = ({ data }) => {
  const [hoursShown, setHoursShown] = useState(false);

  const getIconUrl = (iconCode) => {
    return `http://openweathermap.org/img/w/${iconCode}.png`;
  };

  const img = (icon, desc, hour) => {
    return (
      <img
        src={getIconUrl(icon)}
        alt={desc}
        className={"absolute top-0.5 left-0.5"}
      />
    );
  };
  return (
    <div
      key={data.dt}
      className="rounded-md drop-shadow-lg min-h-[120px] w-[600px] max-w-[90vw] bg-second-bg dark:bg-second-dark-bg relative flex items-center justify-center flex-col gap-2 p-4"
    >
      {img(data.weather[0].icon, data.weather[0].description)}
      <p className="absolute top-2 right-3 sub_text">
        {moment(data.dt_txt).format("LL")}
      </p>
      <div className="flex flex-col items-center justify-center">
        <p className="font-bold text-xl">{data.main.temp}°C</p>
        <p>{data.weather[0].description}</p>
      </div>

      {data?.hours && (
        <Button
          small
          outline={hoursShown}
          label={hoursShown ? "Less Details" : "More Details"}
          action={() => setHoursShown((prev) => !prev)}
        />
      )}
      <div className="w-full">
        {hoursShown && (
          <>
            <hr className="border-gray-500 m-3" />
            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2.5 ">
              {data?.hours &&
                data?.hours.map((hourItem) => (
                  <div className="flex items-center justify-center flex-col p-3 py-5 bg-main-bg dark:bg-main-dark-bg drop-shadow-md rounded-md relative">
                    <p className="absolute top-0.5 right-0.5 sub_text">{moment(hourItem.dt_txt).format("LT")}</p>
                    <div className="flex items-center justify-center">
                      {img(
                        hourItem.weather[0].icon,
                        hourItem.weather[0].description,
                      )}
                      <div className="flex flex-col items-center justify-center">
                        <p className="font-bold text-[15px]">
                          {hourItem.main.temp}°C
                        </p>
                        <p>{hourItem.weather[0].description}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WeatherItem;
