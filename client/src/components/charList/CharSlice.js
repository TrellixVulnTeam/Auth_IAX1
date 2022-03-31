import {createSlice,createAsyncThunk,current} from "@reduxjs/toolkit"
import useMarvelServices from "../../services/MarvelServices"

const initialState = {
  data:[],
  newItemLoading:false,
  charEnded:false,
  selectedId:0,
  firstUpd:true,
  rndChar:{},
  infoChar:{},
  loading:false,
  error:false
}

export const getData=createAsyncThunk(
  'char/getData',
  async(state)=>{
    const {getAllCharacters}=useMarvelServices();
    const response=await getAllCharacters(state)
    return response;
  }
)
export const getCharacter=createAsyncThunk(
  'char/getCharacter',
  async(state)=>{
    const {getCharacter}=useMarvelServices();
    const response=await getCharacter(state)
    return response;
  }
)
export const getInfoCharacter=createAsyncThunk(
  'char/getInfoCharacter',
  async(state)=>{
    const {getCharacter}=useMarvelServices();
    const response=await getCharacter(state)
    return response;
  }
)
const CharSlice=createSlice({
  name:'char',
  initialState,
  reducers: {
      focusOnItem:(state,action)=>{
        state.selectedId=action.payload
        console.log('FocusOnItem')
      }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending,(state,action)=>{     
        state.newItemLoading=false
      })
      .addCase(getData.fulfilled,(state,action)=>{
        const ended=true
        if (action.payload<9){
          ended=false
        }
        state.data=[...state.data,...action.payload]
        state.newItemLoading=false
        state.firstUpd=false;
        state.charEnded=ended
    
      })
      .addCase(getData.rejected,(state,action)=>{
        console.log(action?.error?.message)
      })
      

      .addCase(getCharacter.fulfilled,(state,action)=>{
        state.rndChar=action.payload;
      })

      .addCase(getInfoCharacter.pending,(state,action)=>{
        state.loading=true;
      })
      .addCase(getInfoCharacter.fulfilled,(state,action)=>{
        state.infoChar=action.payload
        state.loading=false
        state.error=false
        console.log(state.infoChar)
      })
      .addCase(getInfoCharacter.rejected,(state,action)=>{
        state.error=true;
      })
}
})

const {actions, reducer} = CharSlice;

export default reducer;

export const {
  focusOnItem
} = actions;