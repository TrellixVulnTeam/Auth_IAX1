import {createSlice,createAsyncThunk,current} from "@reduxjs/toolkit"
import useConversionServices from '../../services/ConversionApi'

const initialState = {
  currency:'1',
  convertCurrency:'',
  inputVal:'USD',
  convertVal:'RUB',
  spinner:false,
  result:false
}
export const changeValue=createAsyncThunk(
  'value/changeValue',
  async(state)=>{
    const {getConvertValue}=useConversionServices();
    console.log(state)
    const response=getConvertValue(state)
    return response
  }

)
const ValueSlice=createSlice({
  name:'value',
  initialState,
  reducers: {
      changeInputValue:(state,action)=>{
        state.inputVal=action.payload
      },
      changeConvertValue:(state,action)=>{
        state.convertVal=action.payload;
      }
  },

  extraReducers: (builder) => {
    builder
      .addCase(changeValue.pending,(state,action)=>{
        state.spinner=true
      })
      .addCase(changeValue.fulfilled,(state,action)=>{
        state.convertCurrency=action.payload.data[state.convertVal].value
        state.spinner=false
        state.result=true
        console.log(state.convertCurrency)
      
      })
      .addCase(changeValue.rejected,(state,action)=>{
        console.log('error')
      })
       
}
})

const {actions, reducer} = ValueSlice;

export default reducer;

export const {
  changeConvertValue,
  changeInputValue
} = actions;