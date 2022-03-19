import AuthService from '../../services/AuthService'
import axios from 'axios'
import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"

const initialState = {
  email:'',
  password:'',
  auth:false,
  user:{},
  spinner:true
}


export const checkAuth = createAsyncThunk(
  'login/checkAuth',
  async () => {
      const response= await axios.get(`http://localhost:5000/api/refresh`, { withCredentials: true })
      return  response
  }
);
export const registrationUser=createAsyncThunk(
  'login/registrationUser',
  async(state)=>{
    const response = await AuthService.registration(state.email, state.password);
    return response
  }
)
export const loginUser=createAsyncThunk(
  'login/loginUser',
  async(state)=>{
    const response = await AuthService.login(state.email, state.password);
    return response;
  }
)
const LoginSlice=createSlice({
  name:'login',
  initialState,
  reducers:{
    // loginUser:async(state,action)=>{
    //   try {
    //     const response = await AuthService.login(action.payload.email, action.payload.password);
    //     localStorage.setItem('token', response.data.accessToken);
    //     state.auth=true;
    //     state.user=response.data.user
    //   }
    //   catch (e) {
    //     console.log(e.response?.data?.message);
    //   }
    // },
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
          localStorage.setItem('token', action.payload.data.accessToken);
          state.auth=true;
          state.user=action.payload.data.user 
        })
        .addCase(checkAuth.rejected, (state,action) => {
            console.log(action?.error?.message)
        })

        .addCase(registrationUser.fulfilled, (state,action)=>{
          localStorage.setItem('token',action.payload.data.accessToken );
          state.auth=true;
          state.spinner=false;
          state.user=action.payload.data.user 
        })
        .addCase(registrationUser.rejected,(state,action)=>{
          console.log(action?.error?.message)
        })

        .addCase(loginUser.fulfilled,(state,action)=>{
          localStorage.setItem('token', action.payload.data.accessToken);
          state.auth=true;
          state.user=action.payload.data.user
        })
        .addCase(loginUser.rejected,(state,action)=>{
          console.log(action?.error?.message)
        })

        .addDefaultCase(() => {})
}
})

const {actions, reducer} = LoginSlice;

export default reducer;

export const {
   logout,
} = actions;