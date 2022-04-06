import LoginPanel from '../loginPanel/LoginPanel';
import SignInPanel from '../signInPanel/signInPanel';
import HomePanel from '../homePanel/homePanel'
import { BrowserRouter as Router,Route,Routes} from "react-router-dom";
import WeatherList from '../weatherList/WeatherList';
import WeatherInfo from '../weatherInfo/WeatherInfo';
import ExchangeValue from '../exchangeValue/ExchangeValue';
import AppHeader from '../appHeader/AppHeader'
import MarvelPage from '../pages/MarvelPage'
import FoodPage from '../pages/FoodPage';
import FoodInfo from '../FoodInfo/FoodInfo';
import FoodFavorites from '../FoodFavorites/FoodFavorites';
function App() {
 
  return (
    
    <Router>
      <AppHeader/>
      <div className='App'>
        
      <Routes>
        <Route path='/' element={<SignInPanel/>}/>
        <Route path='/registration' element={<LoginPanel/>}/>
        <Route path='/Home' element={<HomePanel/>}/>
        <Route path='/weatherList' element={<WeatherList/>}/>
        <Route path='/:city' element={<WeatherInfo/>}/>
        <Route path='/exchangeValue' element={<ExchangeValue/>}/>
        <Route path='/marvelPage' element={<MarvelPage/>}/>
        <Route path='/FoodList' element={<FoodPage/>}/>
        <Route path='/FoodList/:Food' element={<FoodInfo/>}/>
        <Route path='/FoodList/FavoriteFood' element={<FoodFavorites/>}/>
      </Routes>
      </div>
    </Router>
    
  );
}

export default App;
