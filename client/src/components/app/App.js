import './App.css';
import LoginPanel from '../loginPanel/LoginPanel';
import {useEffect,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import store from '../../store';
import axios from 'axios'
// import {checkAuth} from '../loginPanel/LoginSlice'

function App() {

  // const {auth,user} = useSelector(store => store.login);
  // const dispatch=useDispatch()
  const [auth,setAuth]=useState(false)

  // useEffect(() => {
  //   if (localStorage.getItem('token')){
  //     dispatch(checkAuth())
  //     console.log('auth=',auth)
  //   }
  // },[])
  const  checkAuth=async()=> {
    try {
        const response = await axios.get(`http://localhost:5000/api/refresh`, {withCredentials: true})
        console.log(response);
        localStorage.setItem('token', response.data.accessToken);
        setAuth(true)
       
    } catch (e) {
        console.log(e.response?.data?.message);
    } 
}
  useEffect(()=>{
    if(localStorage.getItem('token')){
      checkAuth()
    }
  },[])

  const content=auth? ` Пользователь авторизован `:`АВТОРИЗУЙТЕСЬ`
  return (
    <div className='App'>
      <h1>{content} </h1>
      <LoginPanel/>
    </div>
  );
}

export default App;
