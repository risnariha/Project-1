
import React,{useState, useEffect} from 'react';
import { AiOutlineStock, AiOutlineUser } from 'react-icons/ai';
import { BsCartFill, BsTruck } from 'react-icons/bs'; // Assuming you're using BsTruck for Delivery icon
import HomeCard from './HomeCard';
import BarChart from './BarChart';
import Order from './Order';
import PieChart from './PieChart.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export const CompanyDashboard = () => {

  const [counts, setCounts] = useState({
    products: 0,
    customers: 0,
    orders: 0,
    delivery: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/backend/api/Company/counts.php');
        setCounts(response.data);
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchCounts();
  }, []);


  return (
    <div>
      <div className="container mt-5">
        <div className="row gy-4">
          <div className="col-12 col-md-6 col-lg-3">
            <HomeCard
              title="Products"
              icon={AiOutlineStock}
              count={counts.products}
              className="bg-primary text-white"
            />
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <HomeCard
              title="Customers"
              icon={AiOutlineUser}
              count={counts.customers}
              className="bg-success text-white"
            />
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <HomeCard
              title="Orders"
              icon={BsCartFill}
              count={counts.orders}
              className="bg-warning text-dark"
            />
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <HomeCard
              title="Delivery"
              icon={BsTruck}
              count={counts.delivery}
              className="bg-danger text-white"
            />
          </div>
        </div>
      </div>
      
        <div className="row justify-content-center m-5">
          <div className="col-12 col-lg-7 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <BarChart />
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-4 mb-4 ms-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <PieChart />
              </div>
            </div>
          </div>
        </div>
      
      <div className="container mt-4 mb-3">
        <div className="row justify-content-center">
          <div className="w-full">
            <Order />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;




  
