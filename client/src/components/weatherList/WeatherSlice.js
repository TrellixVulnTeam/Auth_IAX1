import useWeatherServices from '../../services/WeatherApi'
import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"


const initialState = {
  data:[],
  city:''
}

export const searchCity=createAsyncThunk(
  'weather/searchCity',
  async(state,action)=>{
    console.log('Yes')
    const {getWeatherByCity}=useWeatherServices();
    console.log(action)
    const response= await getWeatherByCity('Erevan')
    console.log(response)
    return response
  }
)

const WeatherSlice=createSlice({
  name:'weather',
  initialState,
  reducers:{
    // searchCity:async(state)=>{
    //   try {
    //     // const response = await AuthService.logout();
    //     // localStorage.removeItem('token');
    //     // state.auth=false;
    //     // state.user={};
        
    //   }
    //   catch (e) {
    //     console.log(e.response?.data?.message);
    //   }
    // },
  },
  extraReducers:(builder)=>{
    builder
      .addCase(searchCity.fulfilled,(state,action)=>{
        console.log(action)
      })
      .addCase(searchCity.rejected,(state,action)=>{
        console.log('error')
      })
  }
})

const {actions, reducer} = WeatherSlice;

export default reducer;

export const {
  //  searchCity
} = actions;
