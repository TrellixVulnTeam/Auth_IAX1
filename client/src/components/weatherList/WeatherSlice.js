import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import useWeatherServices from '../../services/WeatherApi'

const initialState = {
  data:[],
  city:''
}


export const searchCity=createAsyncThunk(
  'weather/searchCity',
  async(state)=>{
    const {getWeatherByCity}=useWeatherServices();
    const response= await getWeatherByCity(state)
    return response
  }
)

const WeatherSlice=createSlice({
  name:'weather',
  initialState,
  reducers:{
  delCity:(state,action)=>{
    state.data.filter((item,id)=>(id!==action.payload))
    console.log('data=',state.data)
  }
  },
  extraReducers: (builder) => {
    builder
        .addCase(searchCity.pending,(state,action)=>{
          console.log('Download date city')
        })
        .addCase(searchCity.fulfilled,(state,action)=>{
          state.data.push(action.payload)
          console.log('action=',action)
        })
        .addCase(searchCity.rejected,(state,action)=>{
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