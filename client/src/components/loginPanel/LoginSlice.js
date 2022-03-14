import AuthService from '../../services/AuthService'
import axios from 'axios'
import {createSlice} from "@reduxjs/toolkit"

const initialState = {
  email:'',
  password:'',
  auth:false,
  user:{}
}

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
    
  checkAuth: async (state) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/refresh`, { withCredentials: true })//авторизован ли пользователь 
      localStorage.setItem('token', response.data.accessToken);
      state.auth=true;
      state.user=response.data.user
    }
    catch (e) {
      console.log(e.response?.data?.message)
    }
  }

  }

})

const {actions, reducer} = LoginSlice;

export default reducer;
export const {
   loginUser,
   registrationUser,
   logout,
   checkAuth
} = actions;