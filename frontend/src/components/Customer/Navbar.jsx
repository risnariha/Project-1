import React from 'react'
import {FaBars,FaUserCircle, FaSearch, FaBell} from 'react-icons/fa'
export const Navbar = ({sidebarToggle,setSidebarToggle}) => {
  return (
    <nav className='d-flex w-full justify-content-between px-4 align-itmes-center navbar text-white'>
    <div className='d-flex align-items-center my-1 fs-5'>
        <div className='d-flex text-white me-1'><FaBars className={`fabar ${sidebarToggle?"d-none":""}`} onClick={()=>setSidebarToggle(!sidebarToggle)}/></div>
        <div className='d-flex text-white'>Home Page</div>
    </div>
    <div className='d-flex align-items-center'>
        <div className='position-relative align-items-center'>
          <span className='sm-relative md-absolute  align-items-center '>
            <button className='btn btn-none d-flex align-items-center' ><FaSearch className='text-md-black text-sm-white'/></button></span>
          <input type='text' className=' rounded focus-outline-none w-full ps-5 px-4 d-none d-md-block'/>
        </div>
        <div className='d-flex ms-2 align-items-center cursor-pointer'><FaUserCircle style={{height:'20px',width:'20px'}}/><span className='px-1 d-none d-md-block d-flex' >Sign In</span></div>
    </div>
  </nav>
  )
}

{/* <div className='relative'>
    <button className='text-white group'>
        <FaUserCircle className='w-6 h-6 mt-1'/>
        <div className='z-10 hidden absolute rounded shadow w-32 group-focus:block top-full right-0 bg-white'>
          <ul className='py-2 text-gray-800 text-sm'>
            <li><a href="">Profile</a></li>
            <li><a href="">Profile</a></li>
            <li><a href="">Profile</a></li>
          </ul>
        </div>
    </button>
  </div> */}