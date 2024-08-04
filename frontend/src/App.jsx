import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./components/Company/CompanyApp.css";
import "./components/Company/CompanyProduct.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Ensure Router is imported
import Header from './components/Home/Header'
// import { Sidebar } from './components/Customer/Sidebar'
import CustomerProfile from './components/Customer/CustomerProfile';

import ProuductList from './components/Customer/ProuductList';
import ProductDetail from './components/Customer/ProductDetail';

// import { BrowserRouter as Router,Routes, Route} from 'react-router-dom'; // Ensure Router is imported
// import 'bootstrap/dist/css/bootstrap.min.css';
import AddProduct from './components/Company/AddProduct';
import UpdateProduct from './components/Company/UpdateProduct';
import ViewProducts from './components/Company/ViewProducts';
// import { CompanyDashboard } from './components/Company/CompanyDashboard';
import Customer from './components/Company/Customer';
import Order from './components/Company/Order';
import { CompanyDashboard } from './components/Company/CompanyDashbord';
import Review from './components/Company/review/Review';
import ReviewLayout from './components/Company/review/ReviewLayout';
import Dash from './components/Admin/Dash';
import AdminOrder from './components/Admin/Order';
import Customerdetails from './components/Admin/Customerdetails';
import Companydetails from './components/Admin/Companydetails';
import CompanyProfile from './components/Company/CompanyProfile';
import Contactus from './components/Admin/Contactus';
import Aboutus from './components/Admin/Aboutus';
import { Home } from './components/Home/Home';
import { Login } from './components/Home/Login';
import AdminLayout from './components/Admin/AdminLayout';
import CompanyLayout from './components/Company/CompanyLayout';
import CustomerLayout from './components/Customer/CustomerLayout';
import CartItems from './components/Customer/CartItems';
import PlaceOrder from './components/Customer/PlaceOrder';
import { Faqs } from './components/Home/Faqs';
import Register from './components/Home/Register';
import Footer from './components/Home/Footer';
import Products from './components/Home/Products'

function App() {

  return (

    <div className=''>

      <Router>
        <Header />
        <Routes>
          <Route path='/Aboutus' element={<Aboutus />} />
          <Route path="/Contactus" element={<Contactus />} />
          {/* home */}

          <Route path='/' element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path='/products' element={<Products />}/>
          {/* admin */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dash" element={<Dash />} />
            <Route path="Customerdetails" element={<Customerdetails />} />
            <Route path="Companydetails" element={<Companydetails />} />
            <Route path='Order' element={<AdminOrder />} />
          </Route>
          {/* customer */}
          <Route path="/customer" element={<CustomerLayout />}>
            <Route path="dash" element={<ProuductList />} />
            <Route path="CartItems" element={<CartItems />} />
            <Route path="PlaceOrder" element={<PlaceOrder />} />
            <Route path="profile" element={<CustomerProfile />} />
            <Route path="productDetail" element={<ProductDetail />} />


          </Route>
          {/* company */}
            <Route path="/company/*" element={<CompanyLayout />} >
              <Route exact path="dash" element={<CompanyDashboard />} />
              <Route exact path="add-product" element={<AddProduct />} />
              <Route exact path="display-product" element={<ViewProducts />} />
              <Route exact path="update/:productID" element={<UpdateProduct />} />
              <Route exact path="customer" element={<Customer />} />
              <Route exact path="order" element={<Order />} />
              <Route exact path="review" element={<Review />} />
              <Route exact path="reviewlayout/:productID" element={<ReviewLayout />} />
              <Route exact path="profile" element={<CompanyProfile/>}/>
            </Route>
        </Routes>
        <Footer />
      </Router>
      {/* <Sidebar
          sidebarToggle={sidebarToggle}
          setSidebarToggle={setSidebarToggle} /> */}
      {/* <CompanyHeader />
        <CompanySidebar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} /> */}

      {/* <Route path="/" element={<ProuductList sidebarToggle={sidebarToggle}
            setSidebarToggle={setSidebarToggle} />} /> */}



      {/* <main className={`content ${sidebarToggle ? 'sidebar-open' : 'sidebar-closed'}`}> */}
      {/* <Routes> */}
      {/* <Route exact path="/" element={<CompanyDashboard />} />  */}
      {/* // <div className=''> */}
      {/* <Router>
        <Header />
        <Sidebar
          sidebarToggle={sidebarToggle}
          setSidebarToggle={setSidebarToggle} />
        <Routes>
          <Route path='/' element={<Dash />} />
          <Route path='/Order' element={<AdminOrder />} />
        </Routes>
      </Router> */}


      {/* <CompanyHeader />
    <CompanySidebar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
    <main className={`content ${sidebarToggle ? 'sidebar-open' : 'sidebar-closed'}`}> */}
      {/* <Routes> */}
      {/* <Route exact path="/" element={<CompanyDashboard />} />  */}

      {/* </Routes> */}
      {/* </main> */}
    </div>

    /*<Companyregister/>*/
    //  <BrowserRouter>
    //       <Header/>
    //       <Sidebar 
    //       sidebarToggle={sidebarToggle}
    //       setSidebarToggle={setSidebarToggle}/>
    //       <Routes>
    //       {/*<Route path='/Contactus' element={<Contactus/>} />
    //       <Route path='/Aboutus' element={<Aboutus/>} />*/}
    //       <Route path='/' element={<Dash/>} />
    //       <Route path='/Customerdetails' element={<Customerdetails/>} />
    //       <Route path='/Order' element={<Order/>}  />

    //       </Routes>
    //     </BrowserRouter>


    // </Routes>
    // </main>
    // </div>


    // </Router>
  )
}

export default App
