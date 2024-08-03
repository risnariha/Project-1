import React, { useEffect } from 'react';
import { AiOutlineStock, AiOutlineUser } from 'react-icons/ai';
import { BsCartFill, BsTruck } from 'react-icons/bs';
import Card from './Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import Barchart from './Barchart';
import Piechart from './Piechart';
import { useOutletContext } from 'react-router-dom';



 const Dash = () => {
    const { sidebarToggle, setSidebarToggle } = useOutletContext();

//     const fetchorders = async () =>{
//         try {
//             const response = await fetch('http://localhost:8080/backend/count.php');
//             const jsonData = await response.json();
//         } catch (error) {
            
//         }
//     };
    
    //useEffect(()=>{
        //fetchorders();
   // },[]);


    return (

        <div className='w-90p m-auto justify-content-center d-flex flex-column'>
            {/* <AdminSidebar
                sidebarToggle={sidebarToggle}
                setSidebarToggle={setSidebarToggle}
            /> */}
            <div className={`row d-flex `} >
                <div className='col-md-3 col-sm-6 col-auto mt-4  '>
                    <Card title="Company" icon={AiOutlineStock} count={10} />
                </div>
                <div className='col-md-3 col-sm-6 col-auto mt-4 '>
                    <Card title="Customers" icon={AiOutlineUser} count={30} />
                </div>
                <div className='col-md-3 col-sm-6 col-auto mt-4 '>
                    <Card title="Orders" icon={BsCartFill} count={10} />
                </div>
                <div className='col-md-3 col-sm-6 col-auto mt-4 '>
                    <Card title="Sales" icon={BsTruck} count={10000} />
                </div>
            </div>
            <div className='row justify-content-center ' >
                <div className='col-lg-5 col-sm-9 col-md-9 m-5 shadow p-5 rounded bg-light' >
                    <Barchart />
                </div>
                <div className='col-lg-4 col-sm-10 col-md-10 m-5 shadow p-5 rounded bg-light'>
                    <Piechart />
                </div>
            </div>

        </div>

    );
};

export default Dash;
