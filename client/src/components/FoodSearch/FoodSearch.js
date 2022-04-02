import './FoodSearch.scss'
import {useState,useEffect} from 'react'
import useEdamamServices from '../../services/Edamam'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector} from 'react-redux';
import {searchFood} from './FoodSlice' 
import FoodItems from '../FoodItems/FoodItems'

const FoodSearch=()=>{
  const [variables,setVariables]=useState([])
  const {getAutoComplete}=useEdamamServices()
  const [food,setFood]=useState('')
  const dispatch=useDispatch()
  
  useEffect(async()=>{
    if(food.length>2) {
      const response= await getAutoComplete(food)
      setVariables(response)
    }
  },[food])

  const onUpdateFood=(e)=>{
    setFood(e.target.value)
  }

  return(
    <div className='Food__Page'>
    <h2 className='Food__Page__Search'>Search Food</h2>
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={variables.map((option) => option)}
        renderInput={(params) => <TextField {...params} 
                                            value={food}
                                            onChange={onUpdateFood} 
                                            label="Add..." />}
      />
     
    </Stack>
    <button onClick={()=>{dispatch(searchFood(food))}}>Add...</button>

    <FoodItems/>
    </div>
  )
}
export default FoodSearch;