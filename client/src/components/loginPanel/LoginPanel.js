import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useState } from 'react';
import AuthService from '../../services/AuthService'
import axios from 'axios'

const LoginPanel = () => {
  const [email,setEmail]=useState('')
  const [password, setPassword] = useState('')
  const [auth, setAuth] = useState(false)
  const [user, setUser] = useState({})
  
  const  login=async(email,password)=>{
    try {
      const response = await AuthService.login(email, password);
      console.log(response)
      localStorage.setItem('token', response.data.accessToken);
      setAuth(true);
      setUser(response.data.user);
    }
    catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  const registration = async (email, password) => {
  
    try {
      console.log(email)
      const response = await AuthService.registration(email, password);
      console.log(response)
      localStorage.setItem('token', response.data.accessToken);
      setAuth(true);
      setUser(response.data.user);
    }
    catch (e) {
      console.log(e.response?.data?.message);
    }
  }
  
  const logout=async()=>{
    try {
      const response = await AuthService.logout();
      localStorage.removeItem('token')
      setAuth(false);
      setUser({})
    }
    catch (e) {
      console.log(e.response?.data?.message)
    }
  }
  const checkAuth = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/refresh`, { withCredentials: true })
      console.log(response)
      localStorage.setItem('token', response.data.accessToken);
      setAuth(true);
      setUser(response.data.user);
    }
    catch (e) {
      console.log(e.response?.data?.message)
    }
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
export default LoginPanel