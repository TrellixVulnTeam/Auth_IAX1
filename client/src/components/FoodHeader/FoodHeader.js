import './FoodHeader.scss'
import {Link,NavLink } from "react-router-dom";
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {changeVariables} from '../FoodSearch/FoodSlice'
import { useDispatch, useSelector} from 'react-redux';
const FoodHeader=()=>{
const dispatch=useDispatch()
  return(
    
  <div className='NavBar'>
    <Grid  justifyContent="center" container spacing={2} >
    <NavLink end style={({isActive})=>({color:isActive?'#9f0013':'inherit'})}  to={`/FoodList`}>
      <SearchIcon/>
    </NavLink> 
        
    <NavLink  style={({isActive})=>({color:isActive?'#9f0013':'inherit'})} to={`/FoodList/FavoriteFood`}>
       <button onClick={()=>{dispatch(changeVariables())}}><FavoriteBorderIcon/></button>
    </NavLink>
        
    </Grid>
  </div>
  )
}
export default FoodHeader;