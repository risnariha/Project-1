import React from 'react';
import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Dash from './components/Admin/Dash';
import Header from './components/Customer/Header'
import { Sidebar } from './components/Admin/Sidebar'
import Order from './components/Admin/Order';
import Customerdetails from './components/Admin/Customerdetails';
import Customerregister from './components/Admin/Customerregister';
import Contactus from './components/Admin/Contactus';
import Aboutus from './components/Admin/Aboutus';
import Companyregister from './components/Admin/Companyregister';

function App() {
  const [sidebarToggle,setSidebarToggle]=useState(false)
  return (
    <div className=''>
      {/*<Companyregister/>*/}
       <BrowserRouter>
            <Header/>
            <Sidebar 
            sidebarToggle={sidebarToggle}
            setSidebarToggle={setSidebarToggle}/>
            <Routes>
            {/*<Route path='/Contactus' element={<Contactus/>} />
            <Route path='/Aboutus' element={<Aboutus/>} />*/}
            <Route path='/' element={<Dash/>} />
            <Route path='/Customerdetails' element={<Customerdetails/>} />
            <Route path='/Order' element={<Order/>}  />
            
            </Routes>
          </BrowserRouter>
    </div>
  )
}

export default App
