import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {useEffect, useState } from 'react';
import { FaCloud,FaCloudRain,FaCloudSun} from "react-icons/fa";
import { LuSun } from "react-icons/lu";


function App() {

  var dateObj = new Date();

  var[city, setcity] = useState('Istanbul, Turkey');
  var[WeatherState, setWeatherState] = useState('Sunny');
  var[temperature, setTemperature] = useState('');
  var[date, setDate] = useState(dateObj.toDateString());
  var[time, setTime] = useState(dateObj.toLocaleTimeString());  
  var[IsNight,setIsNight]=useState(false);

  var[Location,setLocation] = useState({latitude: 0, longitude: 0});


  useEffect(()=>{

    if(time>=6 && time<18){

      setIsNight(false);
    }
  
    else{
  
      setIsNight(true);
    }



  },[]);

  

  //Getting the user's location
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(function(position) {
      setLocation({latitude: position.coords.latitude, longitude: position.coords.longitude});
    });
  },[]);
  
  
  

  //Getting the country and city name from the user's location
  useEffect(()=>{
    if(Location.latitude !== 0 && Location.longitude !== 0){
      fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${Location.latitude}&lon=${Location.longitude}&limit=5&appid=6f132db865af77ef49832ddd01e5570d`)
      .then(response => response.json())
      .then(data => {

        setcity(data[0].name + ', ' + data[0].country);

      });
    }
  },[Location]);


  //Getting the weather data from the user's location
  useEffect(()=>{

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${Location.latitude}&lon=${Location.longitude}&appid=6f132db865af77ef49832ddd01e5570d`)
    .then(response => response.json())
    .then(data => {
    
      //Getting the temperature and converting it to celcius
      setTemperature(Math.round(data.main.temp - 273.15));  

      //Getting the weather state
      setWeatherState(data.weather[0].main);

    });
  },[temperature]);



  return (
    
    <div className="App">

      <div id="main-body" style={{backgroundColor: IsNight ? "#1a2632 " : '#A020F0'}} className="container-fluid d-flex justify-content-center align-items-center">

        <div style={{backgroundColor: IsNight ? "#1a2632 " : '#A020F0'}} id="inner-body" className="container w-25">

        <div id='weather-icon' className='container d-flex justify-content-center align-items-center'>

          {WeatherState == 'Clouds' ? <FaCloud color='white' size="11rem" /> : null}

          {WeatherState == 'Sunny' ? <LuSun color='yellow' size="11rem" /> : null}

          {WeatherState=="Rain" ? <FaCloudRain color='white' size="11rem"/> : null}

          {WeatherState=="Broken Clouds" ? <FaCloudSun color='white' size="11rem"/> : null}

          {
          //TODO:Add snow
          }
        </div>

          
          <div id='main-display-div' className='container w-100 d-flex justify-content-around align-items-center'>

          
            <div id='temprature' className='container w-100 d-flex justify-content-center align-items-center'>
              <p>{temperature}°</p>
            </div>
          </div>

          
          <div id='weather-state' className='container-fluid d-flex justify-content-center align-items-center'>
              <p>{WeatherState}</p>
          </div>


          <div style={{backgroundColor: IsNight ? '#131C26' : '#961FE0'}} id='date-time' className='container-fluid d-flex justify-content-center align-items-center flex-column pt-2'>
            <p>{date}</p>
            <p>{time}</p>
          </div>


          <div id="location-text" className='container-fluid pt-3 d-flex justify-content-center align-items-center'>
            <p>{city}</p>
          </div>
        </div>

      </div>

    </div>
  );
}

export default App;
