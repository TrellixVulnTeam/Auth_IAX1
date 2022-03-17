import './homePanel.css'
import {NavLink } from "react-router-dom";
import Button from 'react-bootstrap/Button'

const HomePanel=()=>{


  return(
    <>
      <h1>Главная страница</h1>
      
      <Button variant="outline-success"><NavLink  style={({isActive})=>({color:isActive?'#9f0013':'inherit'})} to="/registration">Registration</NavLink></Button>{' '}
    </>
  )
}
export default HomePanel;