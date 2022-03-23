import './WeatherList.css'
import { useEffect ,useState} from "react";
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector,getState } from 'react-redux';
import {searchCity} from './WeatherSlice';
import WeatherItems from '../weatherItems/WeatherItems';

const WeatherList=()=>{

const [weatherCity,setWeatherCity]=useState('')
const {data} = useSelector(store => store.weather);
const dispatch=useDispatch()

const onUpdateCity=(e)=>{
  setWeatherCity(e.target.value)
}

const addCity=()=>{
  dispatch(searchCity(weatherCity))
  setWeatherCity('')
}

return(
  <div className="search-panel">

     <h3>Добавление...</h3>
      <input type="text"
             className="search-input"
             placeholder="Add..."
             value={weatherCity}
             onChange={onUpdateCity}
            />

      <Button onClick={addCity} variant="outline-success">Добавить</Button>{' '}
      <WeatherItems/>
  </div>
)
  

}
export default WeatherList;