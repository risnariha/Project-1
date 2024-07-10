import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Customer/Header'
import { Sidebar } from './components/Customer/Sidebar'
import CustomerProfile from './components/Customer/CustomerProfile';
import { CartDetails } from './components/Customer/CartDetails';
import ProuductList from './components/Customer/ProuductList';
import ProductDetail from './components/Customer/ProductDetail';


function App() {
  const [sidebarToggle, setSidebarToggle] = useState(false)

  
  return (
    <div className=''>
      
        <Router>
        <Header className='' />
        <Sidebar
            sidebarToggle={sidebarToggle}
            setSidebarToggle={setSidebarToggle} />
          <Routes>
            <Route path="/" element={<ProuductList sidebarToggle={sidebarToggle}
            setSidebarToggle={setSidebarToggle} />} />
            <Route path="/products" element={<ProuductList sidebarToggle={sidebarToggle}
            setSidebarToggle={setSidebarToggle} />} />
            <Route path="/cart" element={<CartDetails />} />
            <Route path="/profile"  element={<CustomerProfile/>}/>
            <Route path="/productDetail"  element={<ProductDetail sidebarToggle={sidebarToggle}/>}/>
           </Routes>
        </Router>
 
    </div>
  )
}

export default App
