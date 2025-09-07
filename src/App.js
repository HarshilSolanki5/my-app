import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import './index.css';
import { WiHumidity } from "react-icons/wi";
import { FaThermometerEmpty } from "react-icons/fa";
import Dforecast from "./components/Dforecast";
import Forecast from "./components/Forecast";
import { DateTime } from "luxon";


function App() {
  const [data, setData] = useState({});
  const [foredaily, setForecastDaily] = useState();
  const [forehourly, setForecastHourly] = useState();
  const [lat, setLat] = useState(19.1828);
  const [long, setLong] = useState(72.8402);

  const formatToLocalTime = (
    secs,
    offset,
    format = "cccc, dd LL yyyy' | Local time: 'hh:mm a"
  ) => DateTime.fromSeconds(secs + offset, {zone: "utc"}).toFormat(format);

  const iconUrlFromCode = (icon) => `https://openweathermap.org/img/wn/${icon}@2x.png`


const searchlatlong = useCallback(async (useLat, useLong) => {
  if (!useLat || !useLong) return;

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${useLat}&lon=${useLong}&units=metric&appid=4634e3aa0816e6fd4c9eed2295994d92`;
  const urll = `https://api.openweathermap.org/data/2.5/forecast?lat=${useLat}&lon=${useLong}&units=metric&appid=4634e3aa0816e6fd4c9eed2295994d92`;

  function formatForecastWeather(secs, offset, data) {
    const hourly = data.filter(f => f.dt > secs).map(f => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, "hh:mm a"),
      icon: iconUrlFromCode(f.weather[0].icon),
      date: f.dt_txt,
    })).slice(0, 5);

    const daily = data.filter(f => f.dt_txt.slice(-8) === "00:00:00").map(f => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, "ccc"),
      icon: iconUrlFromCode(f.weather[0].icon),
      date: f.dt_txt,
    }));

    setForecastHourly(hourly);
    setForecastDaily(daily);
  }

  try {
    const response = await axios.get(url);
    setData(response.data);
    const { dt, timezone } = response.data;

    const forecastRes = await axios.get(urll);
    formatForecastWeather(dt, timezone, forecastRes.data.list);
  } catch (err) {
    console.error("Error fetching weather:", err.response?.data || err.message);
  }
}, []); // no lat/long dependency

    
    const weekkday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    const d = new Date();
    let day = weekkday[d.getDay()];
var objToday = new Date(),
	domEnder = function() { var a = objToday; if (/1/.test(parseInt((a + "").charAt(0)))) return "th"; a = parseInt((a + "").charAt(1)); return 1 === a ? "st" : 2 === a ? "nd" : 3 === a ? "rd" : "th" }(),
	dayOfMonth = ( objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder : objToday.getDate() + domEnder,
	months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	curMonth = months[objToday.getMonth()],
	curYear = objToday.getFullYear(),
	curHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : (objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours()),
	curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes(),
	curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";
var timee = curHour + ":" + curMinute + "" + curMeridiem;
var datee = " " + dayOfMonth +" " + curMonth + " " + curYear;

useEffect(()=>{
  searchlatlong(lat,long);
   // eslint-disable-next-line react-hooks/exhaustive-deps
},[]);

function formatBack(){
  if(data.main){
  if (data.main.temp.toFixed() <= 20) {
     return "from-violet-500 to-fuchsia-500";
  } else if(data.main.temp.toFixed()<=30) {
     return "from-sky-500 to-indigo-500";
  } else {
    return "from-yellow-600 to-orange-700";
  }
} else {
  return "from-cyan-500 to-blue-500";
}

}
  return (
  <div className={`app mx-auto max-w-screen-lg my-4 py-5 px-11 bg-gradient-to-br shadow-xl shadow-gray-400 ${formatBack()}`}>
    <div className="top">
      <div className="search flex items-center justify-around my-6 ">
        <input
          className="lat px-3 py-2 text-lg font-medium rounded-md shadow-xl capitalize focus:outline-none"
          placeholder="Enter Latitude"
          value={lat}
          onChange={event => setLat(event.target.value)}
          type="number"
        />
        <input
          className="long px-3 py-2 text-lg font-medium rounded-md shadow-xl capitalize focus:outline-none"
          placeholder="Enter Longitude"
          value={long}
          onChange={event => setLong(event.target.value)}
          type="number"
        />
        <button
          onClick={()=> searchlatlong(lat, long)}
          className="hover:bg-gray-700/20 px-3 py-2 text-lg font-medium rounded-md transition ease-in text-white"
        >
        Search
        </button>
      </div>
    </div>
    <div className="timeloc flex items-center justify-center my-12"><div className="font-extralight text-lg text-white">{day},{datee} | Local Time {timee}</div></div>
    <div className="mid flex items-center justify-center mt-12">
      <div className="temp text-5xl font-medium text-white">{data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}</div>
    </div>
    <div className="flex items-center justify-center mt-4">
      <div className="location text-lg font-light text-white uppercase"><h1>{data.name}</h1></div>
    </div>
    <div className="bottom items-center flex justify-around my-12">
      <div className="humidity font-medium text-white items-center">{data.main ? <h2><WiHumidity size={22}/>{data.main.humidity}%</h2> : null}</div>
      <div className="main text-lg font-medium text-white">{data.weather ? <h2>{data.weather[0].main}</h2> : null}</div>
      <div className="feellike font-medium text-white items-center">{data.main ? <h2><FaThermometerEmpty size={18}/>{data.main.feels_like.toFixed()}°</h2> : null}</div>
    </div>
    <Forecast title="3 hour step Forecast" data = {forehourly}/>
    <Dforecast title="Daily Forecast" data = {foredaily}/>
  </div>
  );
}

export default App;
