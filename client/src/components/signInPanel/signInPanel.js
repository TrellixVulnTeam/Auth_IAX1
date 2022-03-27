import Button from 'react-bootstrap/Button'
import { useEffect,useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import './signInPanel.css'
import { loginUser } from '../loginPanel/LoginSlice';
import {NavLink } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner'

const SignInPanel=()=>{
const [email,setEmail]=useState('')
const [password,setPassword]=useState('')
const dispatch=useDispatch()
const {auth}=useSelector((state)=>state.login)

const  login=(email,password)=>{
  const User = {
    email,
    password,
  }
  console.log(`auth=${auth}`)
  dispatch(loginUser(User))
  console.log(`auth=${auth}`)
  
  setEmail('')
  setPassword('')
}
if (auth) window.location.assign('http://localhost:3000/weatherList')
  return(
    <>
    <h3>Log in to your account</h3>
     <div className="text-field">
        <label className="text-field__label">Email</label>
        <input onChange={(e) => setEmail(e.target.value)} className="text-field__input" type="email"  placeholder="Email" value={email}/>
      </div>
      
      <div className="text-field">
          <label className="text-field__label">Password</label>
          <input onChange={(e) => setPassword(e.target.value)} className="text-field__input" type="password"  placeholder="*****" value={password}/>
      </div>
    
     
      <Button onClick={() => login(email, password)} variant="outline-success" type='submit'>Sign In</Button>{' '}
      <h5>Don't have an account ? <NavLink to='/registration'>Sign up</NavLink></h5>
      <NavLink  style={({isActive})=>({color:isActive?'#9f0013':'inherit'})} to="/Home"><Button variant="outline-success">HomePage</Button>{' '}</NavLink>
    </>
  )
}
export default SignInPanel;