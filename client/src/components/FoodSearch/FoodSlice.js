import useEdamamServices from "../../services/Edamam";
import {createSlice,createAsyncThunk,current} from "@reduxjs/toolkit"

const initialState = {
  data:[],
  loading:false,
  favoriteData:[],
  FoodInfo:{},
  favorite:false,
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
    addFavorite: (state, action) => {
      state.favoriteData.push(action.payload)
      
    },
    delFavorite:(state,action)=>{
    
      const arr=[];
      for(let i=0;i<current(state.favoriteData).length;i++){
        if ((current(state.favoriteData[i]).recipe.calories)!==(action.payload.calories)){
          arr.push(current(state.favoriteData[i]))
        }
      }
      
      state.favoriteData=arr;
      // state.favoriteData=current(state.favoriteData).filter((current(item))=>(current(item.recipe.calories)!==action.payload.calories))
          
    },
    getInfoFood:(state,action)=>{
      state.FoodInfo=action.payload;
    },
    changeVariables:(state,action)=>{
      state.favorite=!state.favorite;
      
    }
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
  addFavorite,
  delFavorite,
  getInfoFood,
  changeVariables
} = actions;