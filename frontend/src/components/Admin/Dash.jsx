import React from 'react';
import { AiOutlineStock, AiOutlineUser } from 'react-icons/ai';
import { BsCartFill, BsTruck } from 'react-icons/bs';
import Card from './Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import Barchart from './Barchart';
import Piechart from './Piechart';
import { useOutletContext } from 'react-router-dom';


const Dash = () => {
    const { sidebarToggle, setSidebarToggle } = useOutletContext();
    return (

        <div className={` `}>
            {/* <AdminSidebar
                sidebarToggle={sidebarToggle}
                setSidebarToggle={setSidebarToggle}
            /> */}
            <div className={` row justify-content-center`} >
                <div className='col-11 col-sm-5 col-lg-2 m-4 '>
                    <Card title="Company" icon={AiOutlineStock} count={10} />
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
            <div className=' justify-content-center d-flex w-full sm-flex-column xs-flex-column'>
                <div className='md-w-75 sm-w-100 justify-content-center'>
                    <Barchart />
                </div>
                <div className='md-w-25 sm-w-100'>
                    <Piechart />
                </div>
            </div>

        </div>

    );
};

export default Dash;
