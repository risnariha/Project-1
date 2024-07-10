import React from 'react'
import { Navbar } from './Navbar'
import ProuductList from './ProuductList'
import CustomerProfile from './CustomerProfile'

export const Dashboard = ({sidebarToggle,setSidebarToggle}) => {
  return (
    <div className={`${sidebarToggle? "ml-25 z-n1":""} w-full d-flex flex-column align-items-center`}>
        <Navbar
        sidebarToggle={sidebarToggle}
        setSidebarToggle={setSidebarToggle}
        />
        {/* <ProuductList/> */}
        {/* <CustomerProfile/> */}
    </div>
  )
}
