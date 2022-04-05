import './FoodItems.scss';
import {useDispatch,useSelector} from 'react-redux';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { grey,green } from '@mui/material/colors';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {getInfoFood,addFavorite,delFavorite} from '../FoodSearch/FoodSlice' 
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';
import {Link} from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner'
import FastfoodSharpIcon from '@mui/icons-material/FastfoodSharp';

const FoodList=()=>{

const {data,loading}=useSelector(store=>store.food)
const content =loading?<Spinner className='Spinner' animation="border" />:  <FoodItems  data={data} />;

  return (
    <div className='Food__List'>
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
  let label=props.recipe.label;

  const [like,setLike]=useState(false)

  const but=!like?<FavoriteBorderIcon  />:<FavoriteIcon sx={{ color: grey[900] }}/>;
  const dispatch=useDispatch();
  if (label.length>47) label=props.recipe.label.slice(0,47)+ '...'

  const mealType=props.recipe.mealType[0].split('/')
  const meals=mealType.map((item,index)=>{
    return(
        <Chip sx={{ color: grey[900] }} key={index} label={item} color="success" variant="outlined" /> 
    )
  })
  const changeLike=()=>{
    if (!like)dispatch(addFavorite(props.recipe))
    else dispatch(delFavorite(props.recipe)) 
    setLike(!like)
  }
  return(
  
   <Grid container justifyContent='center' alignItems="center" item xs={4} >
     <Card sx={{  width:360}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: grey[900] }}  aria-label="recipe">
            <FastfoodSharpIcon/>
          </Avatar>
        }
        action={
          
            <Link style={{'text-decoration':'none'}}  to={`/FoodList/${props.recipe.label}`}>
                  <button className='Food__Button' onClick={()=>{dispatch(getInfoFood(props.recipe))}}>More</button>
            </Link>
          
        }
        title={label}
        subheader={`Number of Calories - ${Math.trunc(props.recipe.calories)}`}
        
      />
      <CardMedia
        className='Food__Image'
        component="img"
        height="200"
        image={props.recipe.images.REGULAR.url}
        alt="Paella dish"
      />
      <CardContent>
         <div>Total Weight - {Math.trunc(props.recipe.totalWeight) } grams</div>
         <div>Cuisine Type - {props.recipe.cuisineType}</div>
         <Stack direction="row" spacing={1}>
              {meals}
          </Stack>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton  onClick={()=>{changeLike()}} aria-label="add to favorites">
          {but}
        </IconButton> 
      </CardActions>
      
    </Card>
   </Grid>
    
  )
}
export default FoodList;