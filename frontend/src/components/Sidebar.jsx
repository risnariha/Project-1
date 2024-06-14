import React from 'react'
import {FaHome,FaCartPlus,FaShoppingCart,FaShoppingBag,FaCog, FaWindowClose} from 'react-icons/fa';
import { Dashboard } from './Dashboard';

export const Sidebar = ({sidebarToggle,setSidebarToggle}) => {
  return (
    <div className='flex'>
      <Dashboard
        sidebarToggle={sidebarToggle}
        setSidebarToggle={setSidebarToggle}
      />
    <div className={`${sidebarToggle?"block" : "hidden"} w-64 bg-gray-900 fixed h-full px-4 py-2 `}>
        <div className='flex justify-between items-center'>
             <h1 className='my-3  text-2x text-white font-bold' >Customer Dashboard</h1>
             <FaWindowClose className='w-7 h-7 text-white' onClick={()=>setSidebarToggle(!sidebarToggle)}/>
        </div>
        <hr />
        <ul className='mt-3 text-white font-bold'>
            <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
                <a href=""  className='px-3'>
                    <FaHome className='inline-block w-6 h-6 -mt-2 mr-2'></FaHome>
                    Home
                </a>
            </li>
            <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
                <a href=""  className='px-3'>
                    <FaShoppingCart className='inline-block w-6 h-6 -mt-2 mr-2'></FaShoppingCart>
                    Card
                </a>
            </li>
            <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
                <a href=""  className='px-3'>
                    <FaShoppingBag className='inline-block w-6 h-6 -mt-2 mr-2'></FaShoppingBag>
                    Shop
                </a>
            </li>
            <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
                <a href=""  className='px-3'>
                    <FaCog className='inline-block w-6 h-6 -mt-2 mr-2'></FaCog>
                    Setting
                </a>
            </li>
        </ul> 
    </div>
    </div>
  )
}
