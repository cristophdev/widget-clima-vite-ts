import { useState } from "react";
import { WeatherData } from "../Types/Types";

function useWeatherData() {
  const [weatherData, setWeatherData] = useState<WeatherData | "error" | null>(null);

  const setData = ({ weather, weatheItIs, temp, minTemp, maxTemp, humidity } : WeatherData ) => {
    const weatherData = { weather, weatheItIs, temp, minTemp, maxTemp, humidity };
    setWeatherData(weatherData);
  }
  return { setData, weatherData, setWeatherData }
}

export default useWeatherData;