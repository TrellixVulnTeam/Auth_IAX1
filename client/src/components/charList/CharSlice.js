import {createSlice,createAsyncThunk,current} from "@reduxjs/toolkit"
import useMarvelServices from "../../services/MarvelServices"

const initialState = {
  data:[],
  newItemLoading:false,
  offset:211,
  charEnded:false,
  selectedId:-1,
  firstUpd:true,
}

export const getData=createAsyncThunk(
  'char/getData',
  async(state)=>{
    
    const {getAllCharacters}=useMarvelServices();
    // const { getAllCharacters }=useMarvelServices();
    const response=await getAllCharacters(initialState.offset)
    return response;
  }
)

const CharSlice=createSlice({
  name:'char',
  initialState,
  reducers: {
      focusOnItem:(state,action)=>{
        state.selectedId=action.payload
      }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending,(state,action)=>{
        // console.log('Loading Character')
        state.newItemLoading=false
      })
      .addCase(getData.fulfilled,(state,action)=>{
        const ended=true
        if (action.payload<9){
          ended=false
        }
        state.data=[...state.data,...action.payload]
        state.newItemLoading=false
        state.offset=state.offset+9
        state.firstUpd=false;
        state.charEnded=ended
    
      })
      .addCase(getData.rejected,(state,action)=>{
        console.log(action?.error?.message)
      })
       
}
})

const {actions, reducer} = CharSlice;

export default reducer;

export const {
  
} = actions;