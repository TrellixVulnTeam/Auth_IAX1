import './homePanel.css'
import {NavLink } from "react-router-dom";
import Button from 'react-bootstrap/Button'

const HomePanel=()=>{


  return(
    <>
      <h1>Главная страница</h1>
      
      
      <NavLink   to="/registration"><Button variant="outline-success">Registration</Button>{' '}</NavLink>
    </>
  )
}
export default HomePanel;