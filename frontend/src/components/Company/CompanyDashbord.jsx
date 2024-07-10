import React from 'react';
import { AiOutlineStock, AiOutlineUser } from 'react-icons/ai';
import { BsCartFill, BsTruck } from 'react-icons/bs'; // Assuming you're using BsTruck for Delivery icon
import HomeCard from './HomeCard';
import BarChart from './BarChart';
import Order from './Order';
import PieChart from './PieChart.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

export const CompanyDashboard = () => {
  return (
    <div>
      <div className='container mt-5'>
        <div className='row gy-4'>
          <div className='col-12 col-md-6 col-lg-3'>
            <HomeCard title="Products" icon={AiOutlineStock} count={300} />
          </div>
          <div className='col-12 col-md-6 col-lg-3'>
            <HomeCard title="Customers" icon={AiOutlineUser} count={100} />
          </div>
          <div className='col-12 col-md-6 col-lg-3'>
            <HomeCard title="Orders" icon={BsCartFill} count={35} />
          </div>
          <div className='col-12 col-md-6 col-lg-3'>
            <HomeCard title="Delivery" icon={BsTruck} count={15} />
          </div>
        </div>
      </div>
      <div className='container mt-4'>
        <div className='row'>
          <div className='col-12 col-lg-6'>
            <BarChart />
          </div>
          <div className='col-12 col-lg-6'>
            <PieChart />
          </div>
        </div>
      </div>
      <div className='container mt-4'>
        <div className='row justify-content-center'>
          <div className='col-12'>
            <Order />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
