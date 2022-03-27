import {NavLink } from "react-router-dom";
import './AppHeader.css'
import { useDispatch, useSelector,getState } from 'react-redux';
import { useEffect } from "react";
import { checkAuth,logout } from "../loginPanel/LoginSlice";
import Button from 'react-bootstrap/Button'

const AppHeader = () => {

  const {user} = useSelector(store => store.login);
  const dispatch=useDispatch()

  useEffect(()=>{
    if(localStorage.getItem('token')){
      dispatch(checkAuth())
    }
    console.log(user)
  },[])

  return (
    <header className="app__header">
      
      <nav className="app__menu">
        <ul>
          
        </ul>
        <ul>
            <li>{user?.isActivated ? `${user.email} `:<NavLink style={({isActive})=>({color:isActive?'#9f0013':'inherit'})}  to="/registration">Create an account</NavLink>}</li>/
            <li>{user?.isActivated? <Button onClick={()=>{dispatch(logout())}} variant="outline-success">Log Out</Button>:<NavLink style={({isActive})=>({color:isActive?'#9f0013':'inherit'})}  to="/">Sig In</NavLink>}</li>/
            <li><NavLink end style={({isActive})=>({color:isActive?'#9f0013':'inherit'})} to="/weatherList">Weather</NavLink></li>
            /
            <li><NavLink  style={({isActive})=>({color:isActive?'#9f0013':'inherit'})} to="/exchangeValue">Exchange Rates</NavLink></li>
        </ul>
      </nav>
    </header>
  )
}
export default AppHeader;