import React from 'react'
import {FaBars} from 'react-icons/fa'
import { IoLogOut } from "react-icons/io5";
export const CompanyNavbar = ({sidebarToggle,setSidebarToggle}) => {

  
  return (
    <nav className='d-flex w-full justify-content-between px-4 align-itmes-center navbar text-white'>
    <div className='d-flex align-items-center my-1 fs-5'>
        <div className='d-flex text-white me-1'><FaBars className={`fabar ${sidebarToggle?"d-none":""}`} onClick={()=>setSidebarToggle(!sidebarToggle)}/></div>
        <div className='d-flex text-white align-items-center'>Company Name</div>
    </div>
    <div className='d-flex align-items-center'>
        
        <div className='d-flex ms-2 align-items-center cursor-pointer'><IoLogOut style={{height:'20px',width:'20px'}}/><span className='px-1 d-none d-md-block d-flex' >Log Out</span></div>
    </div>
  </nav>
  )
}

