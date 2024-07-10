import React from 'react'
import { Navbar } from './Navbar'


export const Dashboard = ({sidebarToggle,setSidebarToggle}) => {
  return (
    <div className={`${sidebarToggle? "ml-64":""} w-full d-flex flex-column align-items-center`}>
        <Navbar
        sidebarToggle={sidebarToggle}
        setSidebarToggle={setSidebarToggle}
        className='d-flex'/>
        
    </div>
  )
}
