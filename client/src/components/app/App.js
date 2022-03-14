import './App.css';
import LoginPanel from '../loginPanel/LoginPanel';
import {useEffect,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import store from '../../store';
import {checkAuth} from '../loginPanel/LoginSlice'

function App() {

  const {auth,user} = useSelector(state => state.login);
  const dispatch=useDispatch()

  useEffect(() => {
    if (localStorage.getItem('token')){
      dispatch(checkAuth())
    }
  },[])

  const content=auth? ` Пользователь авторизован ${user.email}`:`АВТОРИЗУЙТЕСЬ`
  return (
    <div className='App'>
      <h1>{content} </h1>
      <LoginPanel/>
    </div>
  );
}

export default App;
