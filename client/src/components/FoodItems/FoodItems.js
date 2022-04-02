import './FoodItems.scss';
import {useSelector} from 'react-redux';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


const FoodList=()=>{

const {data,loading}=useSelector(store=>store.food)
const content =loading?<div>Загрузка</div>:  <FoodItems  data={data} />;
  return (
    <div >
      {content}    
    </div>
  )

}

const FoodItems=({data})=>{

  const elements = data.map((item,index) => {
    return(
      <FoodItem
        key={index}
        {...item}
      />
    )
      
  })
  return(
    
  <Box className='Food__Block' sx={{ flexGrow: 1 }}>
    <Grid container spacing={2}>
        {elements}
    </Grid>
  </Box>
  )
}



const FoodItem=(props)=>{
  console.log(props)
  return(
  
   <Grid item xs={4} >
      <div className='Food__Item'>
          <h4 >{props.recipe.label}</h4>
          <img  src={props.recipe.images.REGULAR.url} alt="abyss"/>
          {/* <img  src={'https://countryflagsapi.com/png/brazil'} alt="abyss"/> */}
          <p>Total Weight {props.recipe.totalWeight}</p>
      </div>   
     
   </Grid>
    
  )
}
export default FoodList;