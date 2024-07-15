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

        <div className={`${sidebarToggle ? "ml-25": "w-100" } `}>
            {/* <AdminSidebar
                sidebarToggle={sidebarToggle}
                setSidebarToggle={setSidebarToggle}
            /> */}
            <div className={` row justify-content-between`} >
                <div className='col-11 col-sm-5 col-lg-2 m-4 '>
                    <Card title="Company" icon={AiOutlineStock} count={10} />
                </div>
                <div className='col-12 col-sm-5 col-lg-2 m-4 '>
                    <Card title="Customers" icon={AiOutlineUser} count={30} />
                </div>
                <div className='col-12 col-sm-5 col-lg-2 m-4 '>
                    <Card title="Orders" icon={BsCartFill} count={15} />
                </div>
                <div className='col-12 col-sm-5 col-lg-2 m-4'>
                    <Card title="Sales" icon={BsTruck} count={10000} />
                </div>
            </div>
            <div className='container mt-4'>
                <div className='row'>
                    <div className='col-12 col-lg-6'>
                        <Barchart />
                    </div>
                    <div className='col-12 col-lg-6'>
                        <Piechart />
                    </div>
                </div>
            </div>

        </div>

    );
};

export default Dash;
