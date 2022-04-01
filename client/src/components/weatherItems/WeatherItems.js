import './WeatherItems.scss'
import { useDispatch, useSelector,getState } from 'react-redux';
import {delCity} from '../weatherList/WeatherSlice';
import { useEffect } from 'react';
import CloseButton from 'react-bootstrap/CloseButton'
import {Link} from 'react-router-dom';

const WeatherItems=()=>{
  const dispatch=useDispatch()
  const {data}= useSelector(store => store.weather);
  
  const cityDelete=(index)=>{
    dispatch(delCity(index))
  }
      
  return(
    <ItemsList data={data} cityDelete={cityDelete}/>
  )

}

const ItemsList=({data,cityDelete})=>{
  const Elements=data.map((item,id)=>{
    return(
      <ListItem
      key={id}
      name={item.name}
      country={item.country}
      localTime={item.localTime}
      img={item.condImg}
      tempC={item.tempC}
      tempF={item.tempF}
      cityDelete={()=>cityDelete(id)}
      />
    )
  })
  return(
    <>
    {Elements}
    </>
  )
}
const ListItem=({name,country,localTime,img,tempC,tempF,cityDelete})=>{
  return(
    
    <div className='weatherItem'>
        
      <div className='cityInformation'>
        <div>City-{name}</div>
         <div>Country - {country}</div>
         <div>Local Time - {localTime}</div>
      </div>
        
                                                                                                                                                                                                                                                                                                                                                                                                  
      <div className='Temp'>
        <div className='delButton'>
            <CloseButton onClick={cityDelete} />
            <Link style={{'text-decoration':'none'}}  to={`/${name}`}>
                  <button className='info'> ↗</button>
            </Link> 
        </div>
         <img src={img} alt='weather img'></img>
        <div>
            <span>{tempC}C° </span>
            <span>{tempF}F° </span>
        </div>
       
      </div>
     
    </div>
   
  
  )
}
export default WeatherItems