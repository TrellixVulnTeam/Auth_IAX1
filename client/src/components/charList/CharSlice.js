import {createSlice,createAsyncThunk,current} from "@reduxjs/toolkit"
import useConversionServices from '../../services/ConversionApi'

const initialState = {
  
}

const ValueSlice=createSlice({
  name:'char',
  initialState,
  reducers: {
      
  },

  extraReducers: (builder) => {
    builder
     
       
}
})

const {actions, reducer} = ValueSlice;

export default reducer;

export const {
  
} = actions;