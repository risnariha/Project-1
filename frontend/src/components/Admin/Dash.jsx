import React from 'react';
import { AiOutlineStock, AiOutlineUser } from 'react-icons/ai';
import { BsCartFill, BsTruck } from 'react-icons/bs';
import Card from './Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import Barchart from './Barchart';
import Piechart  from './Piechart';


const Dash = ({ sidebarToggle, setSidebarToggle }) => {
  return (
    <div>
        <div className='row  justify-content-center' style={{  marginLeft:"8%" }}>
            <div className='col-11 col-sm-5 col-lg-2 m-4 '>
            <Card title="Company"  icon={AiOutlineStock} count={10} />
            </div>
            <div className='col-12 col-sm-5 col-lg-2 m-4 '>
            <Card title="Customers" icon={AiOutlineUser} count={30} />
            </div>
            <div className='col-12 col-sm-5 col-lg-2 m-4 '>
            <Card title="Today Orders" icon={BsCartFill} count={15} />
            </div>
            <div className='col-12 col-sm-5 col-lg-2 m-4'>
            <Card title="Today Sales" icon={BsTruck} count={10000} />
            </div>
        </div>
        <div className='row justify-content-end p-5 ms-4 '> 
            <div className='col-11 col-sm-7 col-lg-6  ml-4'>
                <Barchart/>
            </div>
            <div className='col-11 col-sm-6 col-lg-4 mr-4'>
                <Piechart/>
            </div>
        </div>
        
    </div>
  );
};

export default Dash;
