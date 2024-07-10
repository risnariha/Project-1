
import React, { useState } from 'react'
import "./components/Company/CompanyApp.css"; 
import "./components/Company/CompanyProduct.css"; 
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom'; // Ensure Router is imported
import 'bootstrap/dist/css/bootstrap.min.css';
import CompanyHeader from './components/Company/CompanyHeader';
import CompanySidebar from './components/Company/CompanySidebar';
import AddProduct from './components/Company/AddProduct';
import UpdateProduct from './components/Company/UpdateProduct';
import ViewProducts from './components/Company/ViewProducts';
// import { CompanyDashboard } from './components/Company/CompanyDashboard';
import Customer from './components/Company/Customer';
import Order from './components/Company/Order';
import { CompanyDashboard } from './components/Company/CompanyDashbord';
import './App.css';
import Review from './components/Company/review/Review';
import ReviewLayout from './components/Company/review/ReviewLayout';

function App() {
  const [sidebarToggle,setSidebarToggle]=useState(false)
  return (
    // <div className=''>
    //  {/* <Header/>
    //  <Sidebar 
    //  sidebarToggle={sidebarToggle}
    //  setSidebarToggle={setSidebarToggle}/>
    //  <Dashboard/> */}
    // </div>

<Router>
<div className="">
    <CompanyHeader />
    <CompanySidebar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
    <main className={`content ${sidebarToggle ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Routes>
           <Route exact path="/" element={<CompanyDashboard />} /> 
            <Route exact path="/add-product" element={<AddProduct />} />
            <Route exact path="/display-product" element={<ViewProducts />} />
            <Route exact path="/update/:product_id" element={<UpdateProduct />} />
            {/* <Route exact path="/dashboard" element={<CompanyDashboard/>}/> */}
            <Route exact path="/customer" element={<Customer/>}/>
            <Route exact path="/order" element={<Order/>}/>
            <Route exact path="/review" element={<Review />}/>
            <Route exact path="/reviewlayout/:product_id" element={<ReviewLayout />}/>

            
        </Routes>
    </main>
</div>


</Router>
  )
}

export default App
