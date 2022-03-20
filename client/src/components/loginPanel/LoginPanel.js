import Button from 'react-bootstrap/Button'
import { useEffect,useState } from 'react';
import { useDispatch, useSelector,getState } from 'react-redux';
import './LoginPanel.css'
import { checkAuth,logout,registrationUser } from './LoginSlice';
import {NavLink } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner'


const LoginPanel = () => {

  const [email,setEmail]=useState('')
  const [password, setPassword] = useState('')
  const [spin,setSpin]=useState(false)
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
    setSpin(spinner)
    console.log(`spinner=${spinner}`)
    setEmail('')
    setPassword('')
  }

  const content=auth ? ` Пользователь ${user.email} авторизован `:<h3>Create your account</h3>;
  const View=(spin&&!auth)? <Spinner animation="border" /> : content
  if (auth){
    return(
      <>
          {View}
         <Button onClick={()=>{dispatch(logout())}} variant="outline-success">Log Out</Button>{' '}
      </>
    )
  }
  return (
    <>
    {View}
      <div className="text-field">
        <label className="text-field__label">Email</label>
        <input onChange={(e) => setEmail(e.target.value)} className="text-field__input" type="email"  placeholder="Email" value={email}/>
      </div>
      
      <div className="text-field">
          <label className="text-field__label">Password</label>
          <input onChange={(e) => setPassword(e.target.value)} className="text-field__input" type="password"  placeholder="*****" value={password}/>
      </div>
    
     
      <Button onClick={() => registration(email, password)} variant="outline-success" type='submit'>Sign Up</Button>{' '}
      <h5>Already have an account ? <NavLink to='/SignIn'>Sign in</NavLink></h5>
      <NavLink  style={({isActive})=>({color:isActive?'#9f0013':'inherit'})} to="/"><Button variant="outline-success">HomePage</Button>{' '}</NavLink>
    </>
  )
}
export default LoginPanel;