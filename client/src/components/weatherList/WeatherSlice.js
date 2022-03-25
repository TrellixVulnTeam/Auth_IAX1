import {createSlice,createAsyncThunk,current} from "@reduxjs/toolkit"
import useWeatherServices from '../../services/WeatherApi'

const initialState = {
  data:[],
  cityInfo:{},
  city:'',
  allCities:[],
  loading:false
}

export const searchCity=createAsyncThunk(
  'weather/searchCity',
  async(state)=>{
    const {getWeatherByCity}=useWeatherServices();
    const response= await getWeatherByCity(state)
    return response
  }
)

export const weatherInfo=createAsyncThunk(
  'weather/weatherInfo',
  async(state)=>{
    const { getWeatherByDays } = useWeatherServices();
    const response= await getWeatherByDays(state)
    return response
  }
)

const WeatherSlice=createSlice({
  name:'weather',
  initialState,
  reducers: {
      delCity: (state, action) => {
          state.data=current(state.data).filter((item,id)=>(id!==action.payload))
          state.allCities=current(state.allCities).filter((item,id)=>(id!==action.payload))
          localStorage.setItem('data',state.allCities)
      }
  },

  extraReducers: (builder) => {
    builder
        .addCase(searchCity.pending,(state,action)=>{
          state.loading=true;
        })
        .addCase(searchCity.fulfilled,(state,action)=>{
          state.data.push(action.payload)
          state.allCities.push(action.payload.name)
          localStorage.setItem('data',current(state.allCities))
          state.loading=false;         
        })
        .addCase(searchCity.rejected,(state,action)=>{
          console.log('error')
        })

        .addCase(weatherInfo.fulfilled,(state,action)=>{
          state.cityInfo=action.payload
        })
        .addCase(weatherInfo.rejected,(state,action)=>{
          console.log('error')
        })

        .addDefaultCase(() => {})
}
})

const {actions, reducer} = WeatherSlice;

export default reducer;

export const {
  delCity
} = actions;