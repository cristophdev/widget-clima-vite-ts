import { ChangeEventHandler, useState, useCallback, MouseEventHandler } from 'react';
import './App.css';
import { API_KEY } from './API/apikey';
import Day from './assets/day.svg';
import Thunder from './assets/thunder.svg';
import Night from './assets/night.svg';
import d1 from './assets/weather-img/01d.svg';
import n1 from './assets/weather-img/01n.svg';
import d2 from './assets/weather-img/02d.svg';
import n2 from './assets/weather-img/02n.svg';
import d3 from './assets/weather-img/03d.svg';
import n3 from './assets/weather-img/03n.svg';
import d4 from './assets/weather-img/04d.svg';
import n4 from './assets/weather-img/04n.svg';
import d9 from './assets/weather-img/09d.svg';
import n9 from './assets/weather-img/09n.svg';
import d10 from './assets/weather-img/10d.svg';
import n10 from './assets/weather-img/10n.svg';
import d11 from './assets/weather-img/11d.svg';
import n11 from './assets/weather-img/11n.svg';
import d13 from './assets/weather-img/13d.svg';
import n13 from './assets/weather-img/13n.svg';

function App() {
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadData, setLoadData] = useState(false);
  const [weatherData, setWeatherData] = useState<{
    weather: string;
    weatherItIs: string;
    temp: number;
    minTemp: number;
    maxTemp: number;
    humidity: number;
  } | "error" | null>(null);


  const handleCountry: ChangeEventHandler<HTMLInputElement> = (e) => {
    setCountry(e.target.value);
  };

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      
      const API_LINK: string = `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${API_KEY}`;

      const resp = await fetch(API_LINK);

      if (!resp.ok) {
        throw new Error(`Error de red: ${resp.status}`);
      }

      const data = await resp.json();

      // Weather values
      const weather: string = String(data.weather[0].main);
      const weatherIcon: string = String(data.weather[0].icon);
      const temp: number = data.main.temp - 273.15;
      const minTemp: number = data.main.temp_min - 273.15;
      const maxTemp: number = data.main.temp_max - 273.15;
      const humidity: number = data.main.humidity;

      //
      const weatherinfo = weatherIcon;
      const weatherItIs = weatherinfo === "01d" ? d1
        : weatherinfo === "01n" ? n1
          : weatherinfo === "02d" ? d2
            : weatherinfo === "02n" ? n2
              : weatherinfo === "03d" ? d3
                : weatherinfo === "03n" ? n3
                  : weatherinfo === "04d" ? d4
                    : weatherinfo === "04n" ? n4
                      : weatherinfo === "09d" ? d9
                        : weatherinfo === "09n" ? n9
                          : weatherinfo === "10d" ? d10
                            : weatherinfo === "10n" ? n10
                              : weatherinfo === "11d" ? d11
                                : weatherinfo === "11n" ? n11
                                  : weatherinfo === "13d" ? d13
                                    : weatherinfo === "13n" ? n13
                                      : "";

      // Return the values
      const weatherData = { weather, weatherItIs, temp, minTemp, maxTemp, humidity };
      setWeatherData(weatherData);
    } catch (error) {
      console.error('Error al obtener los datos', error);
      setWeatherData("error")
    } finally {
      setLoading(false)
    }
  }, [country]);

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
          <input id='pais' placeholder='Here´s your City or Country' onChange={handleCountry} type='text' />
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
                  <img src={weatherData.weatherItIs} />
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
