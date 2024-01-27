import { useState, useCallback, MouseEventHandler } from 'react';
import './App.css';
import Day from './assets/day.svg';
import Thunder from './assets/thunder.svg';
import Night from './assets/night.svg';
import useWeatherData from './Hooks/useWeatherData';
import useCountry from './Hooks/useCountry';
import weatherIcon from './Logic/WeatherIcon';
import { API_KEY } from './API/apikey';

function App() {
  const [loading, setLoading] = useState(false);
  const [loadData, setLoadData] = useState(false);
  const { handleCountry, country } = useCountry();
  const { setData, weatherData, setWeatherData } = useWeatherData();

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const API_LINK = `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${API_KEY}`;

      const resp = await fetch(API_LINK);

      if (!resp.ok) {
        throw new Error(`Error de red: ${resp.status}`);
      }

      const data = await resp.json();

      // Weather values
      const weather: string = String(data.weather[0].main);
      const weatherIconInfo: string = String(data.weather[0].icon);
      const temp: number = data.main.temp - 273.15;
      const minTemp: number = data.main.temp_min - 273.15;
      const maxTemp: number = data.main.temp_max - 273.15;
      const humidity: number = data.main.humidity;

      //Return the weatherIcon
      const weatheItIs = weatherIcon(weatherIconInfo);

      //Return the values
      setData({ weather, weatheItIs, temp, minTemp, maxTemp, humidity })

    } catch (error) {
      setWeatherData("error")
    } finally {
      setLoading(false)
    }
  }, [country, setData, setWeatherData]);

  const handleButton: MouseEventHandler = (e) => {
    e.preventDefault();
    setLoadData(true);
    fetchData();
  }

  return (
    <>
      <h1 className='titulo'>Weather</h1>
      <img src={Thunder} className='thunder' alt='Thunder' />
      <img src={Night} className='night' alt='Night' />
      <main className={`widget-card ${loadData ? 'success' : ''}`}>
        <form className='formulario'>
          <h3>Enter your City or Country</h3>
          <input id='pais' placeholder={`Here's your City or Country`} onChange={handleCountry} type='text' />
          <button className='enviar-btn' id='submit' type='submit' onClick={handleButton}>
            Submit
          </button>
          <p className='nombre'>Made by Cristopher Pérez</p>
        </form>
        {loading ?
          (<p className='cargando'>Loading data...</p>)
          : weatherData === "error" ?
            <p className='error'>No results</p>
            : weatherData ?
              (<div className='temperatura-resultados'>
                <div className='clima-info'>
                  <h2>{weatherData.weather}</h2>
                  <img src={weatherData.weatheItIs} />
                </div>
                <p>Temperature: <span>{weatherData?.temp.toFixed(2)}°</span></p>
                <p>Temperature Min: <span>{weatherData?.minTemp.toFixed(2)}°</span></p>
                <p>Temperature Max: <span>{weatherData?.maxTemp.toFixed(2)}°</span></p>
                <p>Humidity: <span>{weatherData?.humidity}%</span></p>
              </div>)
              : null}
      </main>
      <section className='section-img'>
        <img src={Day} className='sun' alt='Day' />
      </section>
    </>
  );
}

export default App;
