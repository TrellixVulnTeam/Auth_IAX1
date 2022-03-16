import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './LoginPanel.css'
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
      <div class="text-field">
        <label class="text-field__label">Email</label>
        <input onChange={(e) => setEmail(e.target.value)} class="text-field__input" type="email"  placeholder="Email" value={email}/>
      </div>
      
      <div class="text-field">
          <label class="text-field__label">Пароль</label>
          <input onChange={(e) => setPassword(e.target.value)} class="text-field__input" type="password"  placeholder="*****" value={email}/>
      </div>
    
      <Button onClick={() => login(email, password)} variant="outline-success">Login</Button>{' '}
      <Button onClick={() => registration(email, password)} variant="outline-success">Registration</Button>{' '}
    </>
  )
}
export default LoginPanel;