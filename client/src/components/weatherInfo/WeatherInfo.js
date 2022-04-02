import './WeatherInfo.css'
import Spinner from 'react-bootstrap/Spinner'
import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import {weatherInfo} from '../weatherList/WeatherSlice';
import { useDispatch, useSelector,getState } from 'react-redux';


const WeatherInfo =()=>{

  const {city}=useParams()
  const dispatch=useDispatch()
  const {cityInfo,infoLoading} = useSelector(store => store.weather);
  
  useEffect(()=>{
    dispatch(weatherInfo(city))
  },[city])
  
  const content=infoLoading?<div className="Spinner"><Spinner  animation="border" /></div>:<View data={cityInfo}/>;

  
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
    <div className="weatherBlock Block">
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