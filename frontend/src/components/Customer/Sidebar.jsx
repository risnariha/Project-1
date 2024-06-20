import React from 'react'
import {FaHome,FaCartPlus,FaShoppingCart,FaShoppingBag,FaCog, FaWindowClose,FaUser} from 'react-icons/fa';
import { Dashboard } from './Dashboard';

export const Sidebar = ({sidebarToggle,setSidebarToggle}) => {
  return (
    <div className=' d-flex'>
    <Dashboard
    sidebarToggle={sidebarToggle}
    setSidebarToggle={setSidebarToggle}
    />
    <div className={`${sidebarToggle?"":"d-none"} w-64 d-felx fixed bg-primary h-full`}>
        <div className='mx-2 d-flex fs-5 fw-bold h-12 text-white align-items-center justify-content-between'>
            <span>Customer Dashboard</span>
            <FaWindowClose className='fabar w-6 h-6'onClick={()=> setSidebarToggle(!sidebarToggle)}/>
        </div>
        <hr className='text-white m-0'></hr>
        <ul className='mt-3  text-white list-unstyled fw-bold  '> 
                <li className='mb-2 hover-bg-blue-500 py-1 rounded align-items-center'>
                    <a href="" className='text-decoration-none text-white fs-5 px-2'>
                    <FaHome className='w-6 h-6 mx-3 pb-1'/>Home
                    </a>
                </li>
                <li className='mb-2 hover-bg-blue-500 py-1 rounded align-items-center'>
                    <a href="" className='text-decoration-none text-white fs-5 px-2'>
                    <FaShoppingCart className='w-6 h-6 mx-3 pb-1'/>Card
                    </a>
                </li>
                <li className='mb-2 hover-bg-blue-500 py-1 rounded align-items-center'>
                    <a href="" className='text-decoration-none text-white fs-5 px-2'>
                    <FaShoppingBag className='w-6 h-6 mx-3 pb-1'/>Shop
                    </a>
                </li>
                <li className='mb-2 hover-bg-blue-500 py-1 rounded align-items-center'>
                    <a href="" className='text-decoration-none text-white fs-5 px-2'>
                    <FaCog className='w-6 h-6 mx-3 pb-1'/>Setting
                    </a>
                </li>
                <li className='mb-2 hover-bg-blue-500 py-1 rounded align-items-center'>
                    <a href="" className='text-decoration-none text-white fs-5 px-2'>
                    <FaUser className='w-6 h-6 mx-3 pb-1'/>Logout
                    </a>
                </li>
        </ul>
    </div>
</div>
  )
}
