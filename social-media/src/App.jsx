
import { useContext ,useEffect} from 'react'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Profile from './pages/profile/Profile'
import Register from './pages/register/Register'
import {Routes,Route,Navigate} from 'react-router-dom'
import { AuthContext } from './content/AuthContext'


function App() {
const {user} = useContext(AuthContext);
  return (
     <Routes>
      <Route path='/register' element={user ? <Navigate replace to={"/"} /> :<Register/>} />
      <Route path='/login' element={user ? <Navigate replace to={"/"} /> : <Login/>} />
      <Route path='/' element={user ? <Home /> : <Register/>} />
      <Route path='/profile/:username' element={<Profile/>} />
     </Routes>

  )
}

export default App
