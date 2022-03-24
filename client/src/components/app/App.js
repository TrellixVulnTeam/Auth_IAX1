import './App.css';
import LoginPanel from '../loginPanel/LoginPanel';
import SignInPanel from '../signInPanel/signInPanel';
import HomePanel from '../homePanel/homePanel'
import { BrowserRouter as Router,Route,Routes} from "react-router-dom";
import WeatherList from '../weatherList/WeatherList';
import WeatherInfo from '../weatherInfo/WeatherInfo';

function App() {
 
  return (
    
    <Router>
      <div className='App'>
      <Routes>
        <Route path='/' element={<SignInPanel/>}/>
        <Route path='/registration' element={<LoginPanel/>}/>
        <Route path='/Home' element={<HomePanel/>}/>
        <Route path='/weather' element={<WeatherList/>}/>
        <Route path='/:city' element={<WeatherInfo/>}/>
      </Routes>
      </div>
    </Router>
    
  );
}

export default App;
