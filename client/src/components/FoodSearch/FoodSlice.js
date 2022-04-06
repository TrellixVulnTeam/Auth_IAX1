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
      localStorage.setItem('favoriteData',current(state.favoriteData));
    },
    delFavorite:(state,action)=>{
      state.favoriteData=current(state.favoriteData).recipe.filter((item)=>(item.calories!==action.payload.recipe.calories))
      localStorage.setItem('favoriteData',current(state.favoriteData));
    },
    getInfoFood:(state,action)=>{
      state.FoodInfo=action.payload;
    },
    changeVariables:(state,action)=>{
      state.favorite=true;
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