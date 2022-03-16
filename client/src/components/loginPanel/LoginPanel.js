import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loginUser,registrationUser } from './LoginSlice';

const LoginPanel = () => {
  const [email,setEmail]=useState('')
  const [password, setPassword] = useState('')
  const dispatch=useDispatch()
 
  const  login=(email,password)=>{
    const User = {
      email,
      password,
    }
    dispatch(loginUser(User))
    setEmail('')
    setPassword('')
  }

  const registration = async (email, password) => {
    const User = {
      email,
      password,
    }
    dispatch(registrationUser(User))
    setEmail('')
    setPassword('')
  }

  return (
    <>
    <input onChange={(e)=>setEmail(e.target.value)} value={email} type='email' placeholder='Email'  />
    <input onChange={(e) => setPassword(e.target.value)} value={password} type='password' placeholder='Password' />
      
    <button onClick={()=>login(email,password)}>Login</button>
    <button onClick={()=>registration(email,password)}>Registration</button>
    </>
  )
}
export default LoginPanel;