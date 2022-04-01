import Button from 'react-bootstrap/Button'
import { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './LoginPanel.scss'
import { checkAuth,logout,registrationUser, } from './LoginSlice';
import {NavLink } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner'


const LoginPanel = () => {

  const [email,setEmail]=useState('')
  const [password, setPassword] = useState('')
  const dispatch=useDispatch()
  const {auth,user,spinner} = useSelector(store => store.login);


  useEffect(()=>{
    if(localStorage.getItem('token')){
      dispatch(checkAuth())
    }
  },[])

  const registration =  (email, password) => {
    const User = {
      email,
      password,
    }
    dispatch(registrationUser(User))
    setEmail('')
    setPassword('')
  }

  const Content=auth ? ` Пользователь ${user.email} авторизован `:<h3>Create your account</h3>;
  
  if (spinner){
    return(
      <Spinner animation="border" />
    )
  }

  if (auth){
    return(
      <>
          <h2>{user.isActivated ? 'Аккаунт активирован ':'Активируйте аккаунт'}</h2>
          {Content}
         <Button onClick={()=>{dispatch(logout())}} variant="outline-success">Log Out</Button>{' '}
      </>
    )
  }

  return (
    <div className='LoginPanel'>
    {Content}
      <div className="text-field">
        <label className="text-field__label">Email</label>
        <input onChange={(e) => setEmail(e.target.value)} className="text-field__input" type="email"  placeholder="Email" value={email}/>
      </div>
      
      <div className="text-field">
          <label className="text-field__label">Password</label>
          <input onChange={(e) => setPassword(e.target.value)} className="text-field__input" type="password"  placeholder="*****" value={password}/>
      </div>
    
     
      <Button onClick={() => registration(email, password)} variant="outline-success" type='submit'>Sign Up</Button>{' '}
      <h5>Already have an account ? <NavLink to='/'>Sign in</NavLink></h5>
      <NavLink  style={({isActive})=>({color:isActive?'#9f0013':'inherit'})} to="/Home"><Button variant="outline-success">HomePage</Button>{' '}</NavLink>
    </div>
  )
}
export default LoginPanel;