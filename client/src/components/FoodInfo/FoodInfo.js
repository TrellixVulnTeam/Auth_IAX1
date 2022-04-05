import './FoodInfo.scss'
import Grid from '@mui/material/Grid';
import {useSelector} from 'react-redux';
import { Carousel } from 'react-carousel-minimal';
import Chip from '@mui/material/Chip';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

const FoodInfo=()=>{
 
  const {FoodInfo}=useSelector(store=>store.food)
  const data=FoodInfo.ingredients;
  let arr=[];
  for(let i=0;i<data.length;i++){
    arr.push({
      image:`${data[i].image}`,
      caption:`${data[i].food}`})
  }

  const healthLabels=FoodInfo.healthLabels.map((item,index)=>{
    return(
      <Chip key={index} className='Food__Info__Health' icon={<HealthAndSafetyIcon/>} key={index} label={item} size="small" color="success"  /> 
    )
  })
  const ingredients=FoodInfo.ingredients.map((item,index)=>{
    return(
      <p key={index}>{index+1}){item.text}, Quantity - {item.quantity}, Weight - {Math.trunc(item.weight)} grams</p>
    )
  })
  const captionStyle = {
    fontSize: '2em',
    fontWeight: 'bold',
  }
  const slideNumberStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
  }
  return(
    <Grid justifyContent='center' container spacing={2}>
    <Grid  item xs={6}>
      <div className='Food__Info__Block'>
      <h2>{FoodInfo.label}</h2>
      <p>{Math.trunc(FoodInfo.totalWeight)} grams</p>
     <div className='Food__Info__Carousel'>
            <Carousel
            data={arr}
            time={5000}
            width="550px"
            height="280px"
            captionStyle={captionStyle}
            radius="20px"
            slideNumber={true}
            slideNumberStyle={slideNumberStyle}
            captionPosition="bottom"
            automatic={true}
            dots={true}
            pauseIconColor="black"
            pauseIconSize="60px"
            slideBackgroundColor="black"
            slideImageFit="cover"
            style={{
              textAlign: "center",
              maxWidth: "850px",
              maxHeight: "500px",
              margin: "40px auto",
            }}
          />
          </div>
          {ingredients}
          <p className='Food__Info__HealthLabels'>Health Labels: {healthLabels}</p>
               </div> 
            </Grid>
      </Grid>
      
  )
}

export default FoodInfo;
