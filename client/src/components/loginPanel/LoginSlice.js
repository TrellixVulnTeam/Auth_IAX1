import AuthService from '../../services/AuthService'
import axios from 'axios'
import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"

const initialState = {
  email:'',
  password:'',
  auth:false,
  user:{}
}


export const checkAuth = createAsyncThunk(
  'heroes/checkAuth',
  async () => {
      const response= await axios.get(`http://localhost:5000/api/refresh`, { withCredentials: true })
      return  response
  }
);
const LoginSlice=createSlice({
  name:'login',
  initialState,
  reducers:{
    loginUser:async(state,action)=>{
      try {
        const response = await AuthService.login(action.payload.email, action.payload.password);
        localStorage.setItem('token', response.data.accessToken);
        console.log('зашли')
        state.auth=true;
        state.user=response.data.user
      }
      catch (e) {
        console.log(e.response?.data?.message);
      }
    },
    registrationUser:async(state,action)=>{
    try {
      const response = await AuthService.registration(action.payload.email, action.payload.password);
      localStorage.setItem('token', response.data.accessToken);
      state.auth=true;
      state.user=response.data.user
    }
    catch (e) {
      console.log(e.response?.data?.message);
    }
  },
  logout:async(state)=>{
    try {
      const response = await AuthService.logout();
      localStorage.removeItem('token');
      state.auth=false;
      state.user={};
    }
    catch (e) {
      console.log(e.response?.data?.message);
    }
  },
  },
  extraReducers: (builder) => {
    builder
        .addCase(checkAuth.fulfilled, (state, action) => {
          // console.log(action)
          localStorage.setItem('token', action.payload.data.accessToken);
          console.log(`action.data.accessToken=${action.payload.data.accessToken}`)
          state.auth=true;
          state.user=action.payload.data.user 
        })
        .addCase(checkAuth.rejected, (state,action) => {
            console.log('error')
        })
        .addDefaultCase(() => {})
}
})

const {actions, reducer} = LoginSlice;

export default reducer;

export const {
   loginUser,
   registrationUser,
   logout,
} = actions;