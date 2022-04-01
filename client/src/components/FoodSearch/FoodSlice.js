import useEdamamServices from "../../services/Edamam";
import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"

const initialState = {
  data:[]
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
      .addCase(searchFood.fulfilled,(state,action)=>{
        console.log(action.payload)
      })
  }
})
const {actions, reducer} = FoodSlice;

export default reducer;

export const {
  
} = actions;