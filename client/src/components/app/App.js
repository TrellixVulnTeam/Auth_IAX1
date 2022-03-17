import './App.css';
import LoginPanel from '../loginPanel/LoginPanel';
import HomePanel from '../homePanel/homePanel'
import { BrowserRouter as Router,Route,Routes} from "react-router-dom";
function App() {

  
  return (
    
    <Router>
      <div className='App'>
      <Routes>
        <Route path='/' element={<HomePanel/>}/>
        <Route path='/registration' element={<LoginPanel/>}/>
      </Routes>
      </div>
    </Router>
    

  );
}

export default App;
