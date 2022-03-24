// import useWeatherServices from "../components/services/WeatherApi";
import Spinner from 'react-bootstrap/Spinner'
import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import {weatherInfo} from '../weatherList/WeatherSlice';
import { useDispatch, useSelector,getState } from 'react-redux';
import './WeatherInfo.css'

const WeatherInfo =({})=>{

  const {city}=useParams()
  const dispatch=useDispatch()
  const {cityInfo} = useSelector(store => store.weather);
  // const { getWeatherByDays } = useWeatherServices();
  // const [spinner,setSpinner]=useState(true);
  // const [data,setData]=useState({});

  useEffect(()=>{
    console.log('city=',city)
    dispatch(weatherInfo(city))
  },[city])
  
  // const onRequest=(city)=>{
  //   getWeatherByDays(city).then(onWeatherLoad)
  // }

  // const onWeatherLoad=(res)=>{
  //   setData(res);
  //   setSpinner(false);
  // }

  // const content=spinner?<div className="Spinner"><Spinner  animation="border" /></div>:<View data={data}/>;

  const content=<View data={cityInfo}/>;
  return(
    <>
    <Helmet>
        <meta
          name="description"
          content={`${city} weather`}
        />
        <title>{city}</title>
    </Helmet>
    {content}
    </>
  )
}
const View=({data})=>{
  return(
    <div className="weatherBlock">
    <h3>{data.name} ({data.country})</h3>
   
    <h4>Date: {data.day}</h4>
    <div>Sunrise: {data.sunrise1}</div>
    <div>Sunset: { data.sunset1}</div>
    <div className="weatherByDays">
        <div className="weatherBlock">
          <h4>Date: {data.day1} </h4>
          <span>Max Temp {data.day1MaxTempC}C°</span>
          <span>Min Temp {data.day1MinTempC}C°</span>
        </div>
        <div className="weatherBlock">
          <h4>Date: {data.day2}</h4>
          <span>Max Temp {data.day2MaxTempC}C°</span>
          
          <span>Min Temp {data.day2MinTempC}C°</span>
        </div>
    </div>
  </div>
  )
}

export default WeatherInfo;