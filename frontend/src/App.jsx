import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Dashboard } from './components/Dashboard'
import Header from './components/Customer/Header'
import { Sidebar } from './components/Customer/Sidebar'

function App() {
  const [sidebarToggle,setSidebarToggle]=useState(false)
  return (
    <div className=''>
     <Header/>
     <Sidebar 
     sidebarToggle={sidebarToggle}
     setSidebarToggle={setSidebarToggle}/>
     {/* <Dashboard/> */}
    </div>
  )
}

export default App
