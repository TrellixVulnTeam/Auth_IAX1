import './WeatherList.css'
import { useEffect ,useState} from "react";
// import useWeatherServices from "../services/WeatherApi";
import CloseButton from 'react-bootstrap/CloseButton'
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector,getState } from 'react-redux';
import {searchCity} from './WeatherSlice';

const WeatherList=()=>{

const [weatherCity,setWeatherCity]=useState('')

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
      
  </div>
)
  
//   const [data,setData]=useState([]);
//   const {getWeatherByCity}=useWeatherServices();

//   const onCityLoaded=(city)=>{
//     setData([...data,city]);
//   }
//   const cityDelete=(index)=>{
//     setData(data.filter((item,id)=>(id!==index)))
//   }
//   useEffect(()=>{
//     getWeatherByCity(city).then(onCityLoaded)
//   },[city])
    
  
//   return(
//     <ItemsList data={data} cityDelete={cityDelete}/>
//   )

// }

// const ItemsList=({data,cityDelete})=>{
//   console.log(data)
//   const Elements=data.map((item,id)=>{
//     return(
//       <ListItem
//       key={id}
//       name={item.name}
//       country={item.country}
//       localTime={item.localTime}
//       img={item.condImg}
//       tempC={item.tempC}
//       tempF={item.tempF}
//       cityDelete={()=>cityDelete(id)}
//       />
//     )
//   })
//   return(
//     <>
//     {Elements}
//     </>
//   )
// }
// const ListItem=({name,country,localTime,img,tempC,tempF,cityDelete})=>{
//   return(
    
//     <div className='weatherItem'>
        
//       <div className='cityInformation'>
//         <div>City-{name}</div>
//          <div>Country - {country}</div>
//          <div>Local Time - {localTime}</div>
//       </div>
        
                                                                                                                                                                                                                                                                                                                                                                                                  
//       <div className='Temp'>
//         <div className='delButton'>
//             <CloseButton onClick={cityDelete} />
//             <Link style={{'text-decoration':'none'}}  to={`/${name}`}>
//                   <button className='info'> ↗</button>
//             </Link> 
//         </div>
//          <img src={img} alt='weather img'></img>
//         <div>
//             <span>{tempC}C° </span>
//             <span>{tempF}F° </span>
//         </div>
       
//       </div>
     
//     </div>
   
  
//   )
}
export default WeatherList;