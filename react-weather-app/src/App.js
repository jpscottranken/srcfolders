import React, { useState } from "react"
import axios from "axios"
import "./App.css"

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState("")

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=7262fb4a0ed32b58938363ff4098e281`

  //const icon = "http://openweathermap.org/img/w" + icon + ".png"

  const locationSearch = (e) => {
    if (e.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })

      setLocation("")
    }
  }

  return (
    <div className='app'>
      <div className='wrapper'>
        <div className='searchBox'>
          Location:
          <input
            value={location}
            type='text'
            placeholder='Enter location here'
            onKeyPress={locationSearch}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className='weatherInfo'>
          <div className='location'>
            {data.weather ? <p>Location: {data.name}</p> : null}
          </div>
          <div className='temperature'>
            {data.main ? (
              <p>Temperature: {data.main.temp.toFixed()} degrees</p>
            ) : null}
          </div>
          <div className='description'>
            {data.weather ? <p>Currently: {data.weather[0].main}</p> : null}
          </div>
          <div className='wind'>
            {data.wind ? <p>Wind: {data.wind.speed.toFixed()} mph</p> : null}
          </div>
          <div className='humidity'>
            {data.main ? <p>Humidity: {data.main.humidity}%</p> : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
