import './App.css';
import LoginPanel from '../loginPanel/LoginPanel';
import {useEffect,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import {checkAuth} from '../loginPanel/LoginSlice'

function App() {

  const {auth,user} = useSelector(store => store.login);
  const dispatch=useDispatch()

  useEffect(()=>{
    if(localStorage.getItem('token')){
      dispatch(checkAuth())
    }
  },[])
  
  const content=auth ? ` Пользователь ${user.email} авторизован `:`АВТОРИЗУЙТЕСЬ`;
  return (
    <div className='App'>
      <h1>{content} </h1>
      <LoginPanel/>
    </div>
  );
}

export default App;
