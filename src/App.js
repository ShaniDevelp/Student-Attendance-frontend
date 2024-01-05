import logo from './logo.svg';
// import './App.css';
import Login from './components/Authentication/Login';
import CreateContextApp from './components/Context/Contaxtapi'
import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import Signup from './components/Authentication/Signup';
import AdminDashbord from './components/Admincomponents/AdminDashbord';
import UserDashboard from './components/Usercomponents/UserDashboard';
import Mainpage from './components/Mainpage';


function App() {
  return (
    <div className="App">
      
    <BrowserRouter>
      <CreateContextApp>
        <Routes>

          <Route path='/' element={<Mainpage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/adminpanel' element={<AdminDashbord />} />
          <Route path='/userpanel' element={<UserDashboard />} />
          
        </Routes>
      </CreateContextApp>
    </BrowserRouter>
    </div>
  );
}

export default App;
