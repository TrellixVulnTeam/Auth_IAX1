import Button from 'react-bootstrap/Button'
import { useEffect,useState } from 'react';
import { useDispatch, useSelector,getState } from 'react-redux';
import './LoginPanel.css'
import { checkAuth,loginUser,registrationUser } from './LoginSlice';
import {NavLink } from "react-router-dom";
import store from '../../store/index'
const LoginPanel = () => {

  const [email,setEmail]=useState('')
  const [password, setPassword] = useState('')
  const dispatch=useDispatch()
  const {auth} = useSelector(store => store.login);
  const [isAuth,setIsAuth]=useState(auth)
  const [user,setUser]=useState('')

  useEffect(()=>{
    if(localStorage.getItem('token')){
      dispatch(checkAuth())
    }
  },[])
  const StateUpdate=()=>{
    const obj=(store.getState().login)
    obj.then(val=>{
      console.log(val)
      setIsAuth(val.auth)
      setUser(val.user.email)
    })
  }
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
    StateUpdate()
    setEmail('')
    setPassword('')
  }

  const content=isAuth ? ` Пользователь ${user} авторизован `:`АВТОРИЗУЙТЕСЬ`;

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