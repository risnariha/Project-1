import React from 'react';
// import { Link } from 'react-router-dom'; // Import Link component from react-router-dom
import { FaWindowClose,FaUser} from 'react-icons/fa';
import { IoBagAdd } from "react-icons/io5";
import { RiLogoutCircleLine,RiMessage2Fill } from "react-icons/ri";
import { AiFillDashboard,AiFillProduct  } from "react-icons/ai";
import { MdViewComfyAlt } from "react-icons/md";
import { CompanyDashboard } from './CompanyDashbord';
import { CompanyNavbar } from './CompanyNavbar';

 const CompanySidebar = ({sidebarToggle,setSidebarToggle}) => {
  return (
    <div className=' d-flex'>
    {/* <CompanyDashboard
    sidebarToggle={sidebarToggle}
    setSidebarToggle={setSidebarToggle}
    /> */}
    <CompanyNavbar
        sidebarToggle={sidebarToggle}
        setSidebarToggle={setSidebarToggle}
        />

    <div className={`${sidebarToggle?"":"d-none"} w-64 d-felx fixed  bg-color h-full`}>
        <div className='mx-2 d-flex fs-5 fw-bold h-12 text-white align-items-center justify-content-between'>
            <span>Company Dashboard</span>
            <FaWindowClose className='fabar w-6 h-6'onClick={()=> setSidebarToggle(!sidebarToggle)}/>
        </div>
        <hr className='text-white m-0'></hr>
        <ul className='mt-5  text-white list-unstyled fw-bold  '> 
                <li className='mb-4 hover-bg-blue-500 py-1 rounded align-items-center'>
                    <a href="/" className='text-decoration-none text-white fs-5 px-2'>
                    <AiFillDashboard  className='w-6 h-6 mx-3 pb-1'/>Dashboard
                    </a>
                </li>
                <li className='mb-4 hover-bg-blue-500 py-1 rounded align-items-center'>
                    <a href="/add-product" className='text-decoration-none text-white fs-5 px-2'>
                    <IoBagAdd className='w-6 h-6 mx-3 pb-1'/>Add Product
                    </a>
                </li>
                <li className='mb-4 hover-bg-blue-500 py-1 rounded align-items-center'>
                    <a href="/display-product" className='text-decoration-none text-white fs-5 px-2'>
                    <AiFillProduct  className='w-6 h-6 mx-3 pb-1'/>View Product
                    </a>
                </li>
                <li className='mb-4 hover-bg-blue-500 py-1 rounded align-items-center'>
                    <a href="/order" className='text-decoration-none text-white fs-5 px-2'>
                    <MdViewComfyAlt className='w-6 h-6 mx-3 pb-1'/>Order Details
                    </a>
                </li>
                <li className='mb-4 hover-bg-blue-500 py-1 rounded align-items-center'>
                    <a href="/customer" className='text-decoration-none text-white fs-5 px-2'>
                    <FaUser className='w-6 h-6 mx-3 pb-1'/>Customer Details
                    </a>
                </li>
                <li className='mb-4 hover-bg-blue-500 py-1 rounded align-items-center'>
                    <a href="/review" className='text-decoration-none text-white fs-5 px-2'>
                    <RiMessage2Fill className='w-6 h-6 mx-3 pb-1'/>Review
                    </a>
                </li>
                <li className='mb-4 hover-bg-blue-500 py-1 rounded align-items-center'>
                    <a href="" className='text-decoration-none text-white fs-5 px-2'>
                    <RiLogoutCircleLine className='w-6 h-6 mx-3 pb-1'/>Logout
                    </a>
                </li>
        </ul>
    </div>
</div>
  )
};

export default CompanySidebar;
