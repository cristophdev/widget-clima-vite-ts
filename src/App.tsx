import { ChangeEventHandler, useState } from 'react';
import './App.css';
import Day from './assets/day.svg';
import Thunder from './assets/thunder.svg';
import Night from './assets/night.svg'

function App() {
  const [ country, setCountry ] = useState('');
  
  const handleCountry: ChangeEventHandler<HTMLInputElement> = (e) => {
    setCountry(e.target.value);
  }
  
  const fetchData = async () => {
    try {
      const API_KEY = '02210def14bafd3be5c6539498343c8b';
      const API_LINK = `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${API_KEY}`
        
      const resp = await fetch(API_LINK)
  
      if (!resp.ok) {
        throw new Error(`Error de red: ${resp.status}`)
      }
  
      const data = await resp.json();

      //weathrr values
      const temp = data.main.temp - 273.15;
      const minTemp = data.main.temp_min - 273.15;
      const maxTemp = data.main.temp_max - 273.15;
      const humidity = data.main.humidity;

      //return the values
      const weatherData = { temp, minTemp, maxTemp, humidity }
      return weatherData
      
    } catch (error) {
      console.error("Error al obtener los datos", error)
    }
  }


  const handleButton = (e: React.FormEvent<HTMLButtonElement>) => { 
    e.preventDefault()
    fetchData()
  }
  
  return (
    <>
      <h1 className='titulo'>Clima</h1>
      <img src={Thunder} className='thunder' />
      <img src={Night} className='night' />
      <main className='widget-card'>
        <form className='formulario'>
          <h3>Escribe tu Ciudad o País</h3>
          <input id="pais" placeholder='Aquí va tu ciudad o país' onChange={handleCountry} type='text' />
          <button className='enviar-btn' id='submit' type='submit' onClick={handleButton}>Enviar</button>
          <p className='nombre'>Hecho por Cristoher Pérez</p>
        </form>
        <p></p>
      </main>
      <section className='section-img'>
        <img src={Day} className='sun' />
      </section>
    </>
  )
}

export default App
