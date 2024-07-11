import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css'
import { Home } from './components/Home'
import { AdminLogin } from './components/AdminLogin'
import { Faqs } from './components/Faqs'
import { AdminDashboard } from './components/AdminDashboard'
import { AdminLogout } from './components/AdminLogout'

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path='/' element ={<Home />} />
        <Route path='/adminLogin' element ={<AdminLogin />} />
        <Route path='/faqs' element ={<Faqs />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path='/adminLogout' element={<AdminLogout />} />
      </Routes>
    </Router>


  )
}

export default App
