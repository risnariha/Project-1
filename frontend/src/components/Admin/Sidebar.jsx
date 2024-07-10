import React from 'react'
import {FaHome,FaShoppingCart,FaWindowClose} from 'react-icons/fa';
import { Dashboard } from './Dashboard';
import { BiLogOutCircle } from 'react-icons/bi';
import { AiFillDashboard, AiFillShopping } from 'react-icons/ai';
import { IoPerson } from 'react-icons/io5';
import {Link} from 'react-router-dom'

export const Sidebar = ({sidebarToggle,setSidebarToggle}) => {
  return (
    <div className=' d-flex'>
    <Dashboard
    sidebarToggle={sidebarToggle}
    setSidebarToggle={setSidebarToggle}
    />
    <div className={`${sidebarToggle?"":"d-none"} w-64 d-felx fixed sidebar h-full`}>
        <div className='mx-2 d-flex fs-5 fw-bold h-12 text-white align-items-center justify-content-between'>
            <span>Admin Dashboard</span>
            <FaWindowClose className='fabar w-6 h-6'onClick={()=> setSidebarToggle(!sidebarToggle)}/>
        </div>
        <hr className='text-white m-0'></hr>
        <ul className='mt-3  text-white list-unstyled fw-bold '> 
                <li className='mb-3 hover-bg-blue-500 py-1 rounded align-items-center active'>
                    <Link to="/" className='text-decoration-none text-white fs-5 px-2'>
                    <AiFillDashboard className='w-6 h-6 mx-3 pb-1'/>Dashboard
                    </Link>
                </li>
                {/*<li className='mb-3 hover-bg-blue-500 py-1 rounded align-items-center'>
                    <Link to="#" className='text-decoration-none text-white fs-5 px-2'>
                    <FaHome className='w-6 h-6 mx-3 pb-1'/>Home
                    </Link>
                </li>
                <li className='mb-3 hover-bg-blue-500 py-1 rounded align-items-center'>
                    <Link to="#" className='text-decoration-none text-white fs-5 px-2'>
                    <FaShoppingCart className='w-6 h-6 mx-3 pb-1'/>Products
                    </Link>
                </li>*/}
                <li className='mb-3 hover-bg-blue-500 py-1 rounded align-items-center'>
                    <Link to ="/Customerdetails" className='text-decoration-none text-white fs-5 px-2'>
                    <IoPerson className='w-6 h-6 mx-3 pb-1'/>Customers
                    </Link>
                </li>
                <li className='mb-3 hover-bg-blue-500 py-1 rounded align-items-center'>
                    <Link to ="/Order" className='text-decoration-none text-white fs-5 px-2'>
                    <AiFillShopping className='w-6 h-6 mx-3 pb-1'/>Orders
                    </Link>
                </li>
                <li className='mb-3 hover-bg-blue-500 py-1 rounded align-items-center'>
                    <Link to="#" className='text-decoration-none text-white fs-5 px-2'>
                    <BiLogOutCircle className='w-6 h-6 mx-3 pb-1'/>Logout
                    </Link>
                </li>
        </ul>
    </div>
</div>
  )
}
