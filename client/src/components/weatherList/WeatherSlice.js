import {createSlice,createAsyncThunk,current} from "@reduxjs/toolkit"
import useWeatherServices from '../../services/WeatherApi'

const initialState = {
  data:[],
  cityInfo:{},
  city:'',
  allCities:[]
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

// export const FirstLoadingCities=createAsyncThunk(
//   'weather/FirstLoadingCities',
//   async(state)=>{
//     const {getWeatherByCity}=useWeatherServices();
//     for(let i=0;i<state.allCities.length;i++){
//       const response= await getWeatherByDays(state.)
//       return response
//     }
//   }
// )
const WeatherSlice=createSlice({
  name:'weather',
  initialState,
  reducers: {
      delCity: (state, action) => {
          state.data=current(state.data).filter((item,id)=>(id!==action.payload))
          state.allCities=current(state.allCities).filter((item,id)=>(id!==action.payload))
          console.log(state.allCities)
          localStorage.setItem('data',state.allCities)
      }
  },

  extraReducers: (builder) => {
    builder
        .addCase(searchCity.pending,(state,action)=>{
          console.log('Download date city')
        })
        .addCase(searchCity.fulfilled,(state,action)=>{
          state.data.push(action.payload)
          state.allCities.push(action.payload.name)
          localStorage.setItem('data',current(state.allCities))         
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