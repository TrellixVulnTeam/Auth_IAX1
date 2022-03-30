import {createSlice,createAsyncThunk,current} from "@reduxjs/toolkit"
import useConversionServices from '../../services/ConversionApi'
import useMarvelServices from "../../services/MarvelServices"

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
        
      },
      onUpdateLocal:(state,action)=>{
        state.currency=action.payload;
        state.result=false;
      }
  },

  extraReducers: (builder) => {
    builder
      .addCase(changeValue.pending,(state,action)=>{
        state.spinner=true
      })
      .addCase(changeValue.fulfilled,(state,action)=>{
        console.log(state.convertVal)
        state.convertCurrency=action.payload.data[state.convertVal].value*state.currency
        state.spinner=false
        state.result=true
        
      
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
  changeInputValue,
  onUpdateLocal
} = actions;