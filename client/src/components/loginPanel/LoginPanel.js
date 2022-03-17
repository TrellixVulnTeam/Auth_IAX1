import Button from 'react-bootstrap/Button'
import { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './LoginPanel.css'
import { checkAuth,loginUser,registrationUser } from './LoginSlice';
import {NavLink } from "react-router-dom";

const LoginPanel = () => {

  const [email,setEmail]=useState('')
  const [password, setPassword] = useState('')
  const dispatch=useDispatch()
  const {auth,user} = useSelector(store => store.login);
  

  useEffect(()=>{
    if(localStorage.getItem('token')){
      dispatch(checkAuth())
    }
  },[])
  
  const  login=(email,password)=>{
    const User = {
      email,
      password,
    }
    dispatch(loginUser(User))
    setEmail('')
    setPassword('')
  }

  const registration =  (email, password) => {
    const User = {
      email,
      password,
    }
    dispatch(registrationUser(User))

    console.log(`auth=${auth}`)
    setEmail('')
    setPassword('')
  }

  const content=auth ? ` Пользователь ${user.email} авторизован `:`АВТОРИЗУЙТЕСЬ`;

  return (
    <>
    {content}
      <div className="text-field">
        <label className="text-field__label">Email</label>
        <input onChange={(e) => setEmail(e.target.value)} className="text-field__input" type="email"  placeholder="Email" value={email}/>
      </div>
      
      <div className="text-field">
          <label className="text-field__label">Password</label>
          <input onChange={(e) => setPassword(e.target.value)} className="text-field__input" type="password"  placeholder="*****" value={password}/>
      </div>
    
      {/* <Button onClick={() => login(email, password)} variant="outline-success" >Login</Button>{' '} */}
      <Button onClick={() => registration(email, password)} variant="outline-success" type='submit'>Registration</Button>{' '}
      <NavLink  style={({isActive})=>({color:isActive?'#9f0013':'inherit'})} to="/"><Button variant="outline-success">HomePage</Button>{' '}</NavLink>
    </>
  )
}
export default LoginPanel;