import React from 'react'
import logo from '../../public/Elitez.png'
import { FaUser ,FaInfoCircle, FaUserCircle} from "react-icons/fa";
export default function Header() {
  return (
    <div className='w-full h-20 bg-gray-300 flex justify-between items-center'>
          <div className='flex '>
            <div className='px-2 py-2'>
                <img src={logo} alt="" className='h-16 w-20 '/>
            </div>
            <div className='items-center flex font-bold text-3xl px-3'>EliteZ</div>
          </div>
          <div className='flex justify-between '>
            <div className='flex px-3 '>
              <a href="" className='flex items-center'> About 
                <FaInfoCircle className='flex mx-2'/>
              </a>
            </div>
            <div className='flex px-3 '>
              <a href="" className='flex items-center'> Contact 
                <FaUser className='flex mx-2'/>
              </a>
            </div>
            
          </div>
    </div>
  )
}
