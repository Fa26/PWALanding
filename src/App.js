import React, {useState} from 'react'
import Axios from 'axios'
import {fetchPhrase } from './api/fetchfrase'

import './App.css'


const App = () => { 


   	const [phrase , setPhrase]= useState("Everything is going to be okey")
   	const [num, setRandom] =useState(0)

   	const [backImage , setImage] = useState("./img/m3.gif")
   	const image= `/img/${backImage}.jpg`

   	//weather

	const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});


	const getPhrase=()=>{
		Axios.get("https://type.fit/api/quotes").then(
			(response) => {
				var Rand = Math.floor(Math.random()*30);
				console.log("dentro ")
				console.log(response)
				console.log(Rand)
				setRandom(Rand)
				setPhrase(response.data[Rand].text + '-' + response.data[Rand].author)
			}
		)
		

		
	}

	const changeBack = () =>{
			let today = new Date()
			let hour= today.getHours()
			if(hour < 12){
				setImage("./img/m1.gif")
			}else if( hour < 18){
				setImage("./img/non3.gif")
			}else{
				setImage("./img/nube.gif")
		}


	}
	

    const search = async (e) => {
        if(e.key === 'Enter') {
            const data = await fetchPhrase (query);
            setWeather(data);
            setQuery('');
            console.log(data)

        }
    }

	return(
	
		<div className="main-container">
		<img className="imageBack" src={backImage} />
		<button className="change" onClick={getPhrase}>Change Quote</button>
		<button className="changeBack" onClick={changeBack}>Change Back</button>
		<p className="phrase">{phrase}</p>
			<input type="text"className="search"placeholder="Search weather City"value={query}onChange={(e) => setQuery(e.target.value)}onKeyPress={search}/>
			  {weather.main && (
                <div className="city">
                    <h2 className="city-name">
                        <span>{weather.name}</span>
                        <sup>{weather.sys.country}</sup>
                    </h2>
                    <div className="city-temp">
                        {Math.round(weather.main.temp)}
                        <sup>&deg;C</sup>
                    </div>
                    <div className="info">
                        <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                        <p>{weather.weather[0].description}</p>
                    </div>
                </div>
            )}
		
			
		
		</div>

	)
}

export default App