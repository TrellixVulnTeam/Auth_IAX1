import './WeatherList.scss'
import { useEffect ,useState} from "react";
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector,getState } from 'react-redux';
import {searchCity,localCity, addUserCity,closeModal} from './WeatherSlice';
import WeatherItems from '../weatherItems/WeatherItems';
import useWeatherServices from '../../services/WeatherApi';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Spinner from 'react-bootstrap/Spinner';
import Modal from '../Modal/Modal'

const WeatherList=()=>{

const [weatherCity,setWeatherCity]=useState('')
const {userCity,loading,modalActive,firstUpd} = useSelector(store => store.weather);
const dispatch=useDispatch()
const { getAutoCompleteCityName } = useWeatherServices();
const [variables,setVariables]=useState([])


const onUpdateCity=(e)=>{
  setWeatherCity(e.target.value)
}

useEffect(()=>{
  if(localStorage.getItem('data') && firstUpd){
  const data=localStorage.getItem('data').split(',')
  for(let i=0;i<data.length;i++){
    if(data[i]) dispatch(searchCity(data[i]))
  } 
}
dispatch(localCity())
},[])

useEffect(async()=>{
  if(weatherCity.length>3) {
    const response= await getAutoCompleteCityName(weatherCity)
    setVariables(response)
  }
},[weatherCity])

const addCity=()=>{
  dispatch(searchCity(weatherCity))
  setWeatherCity('')
}


const content=loading ? <Spinner animation="border" />:<WeatherItems/>
return(
  <>
  <Modal active={modalActive} >
    <h2 className='modal__header'>Is your city {userCity} ?</h2>
    <Button onClick={()=>{dispatch(addUserCity(userCity))}}  className='modal__btn' variant="success">Yes</Button>
    <Button onClick={()=>{dispatch(closeModal())}} className='modal__btn' variant="danger">No</Button>
  </Modal>

  <div className="search-panel">
     <h3>Add...</h3>   
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={variables.map((option) => option.name)}
        renderInput={(params) => <TextField {...params} 
                                            value={weatherCity}
                                            onChange={onUpdateCity} 
                                            label="Add..." />}
      />
     
    </Stack>
    
    <Button onClick={addCity} variant="outline-success">Add</Button>{' '}

  </div>
  
  {content}

  </>
)
  

}
export default WeatherList;