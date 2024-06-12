import { useState } from 'react'
import './App.css'
import { Dashboard } from './components/Dashboard'
import Header from './components/Header'
import { Sidebar } from './components/Sidebar'

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
