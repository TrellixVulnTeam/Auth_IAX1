import useEdamamServices from "../../services/Edamam";
import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"

const initialState = {
  data:[],
  loading:false
}

export const searchFood=createAsyncThunk(
  'food/searchFood',
  async(state)=>{
    const {getFoodData}=useEdamamServices();
    const response=await getFoodData(state)
    return response
  }
)
const FoodSlice=createSlice({
  name:'food',
  initialState,
  reducers: {

  },
  extraReducers:(builder)=>{
    builder
      .addCase(searchFood.pending,(state,action)=>{
        state.loading=true;
      })
      .addCase(searchFood.fulfilled,(state,action)=>{
        console.log(action.payload.hits)
        state.data=action.payload.hits
        state.loading=false;
      })
      .addCase(searchFood.rejected,()=>{
        console.log('error')
      })
  }
})
const {actions, reducer} = FoodSlice;

export default reducer;

export const {
  
} = actions;