import React from 'react'
import {FaBars,FaUserCircle, FaSearch, FaBell} from 'react-icons/fa'
export const Navbar = ({sidebarToggle,setSidebarToggle}) => {
  return (
    <nav className={`${sidebarToggle?"":""} bg-gray-800 flex justify-between items-center px-4 py-2 w-full`}>
      <div className='items-center flex text-xl my-2'>
          <div className={`${sidebarToggle?"block":"hidden"}`}><FaBars className='text-white me-4 cursor-pointer' onClick={()=>setSidebarToggle(!sidebarToggle)}/> </div>
          <span className='text-white font-semibold'>Customer</span>
      </div>
      <div className='flex item-center gap-x-5 '>
          <div className='relative md:w-65'>
              <span className='relative md:absolute inset-y-0 left-0 flex items-center pl-2'>
                <button className='p-1 focus:outline-none text-white md:text-black' ><FaSearch/></button></span>
              <input type='text'className='w-full px-4 py-1 pl-12 rounded shadow outline-none hidden md:block'/>
          </div>
          <div className="text-white "><FaBell className='w-6 h-6 mt-1 cursor-pointer' ></FaBell></div>
          <div className='relative'>
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
            </div>
      </div>
    </nav>
  )
}
