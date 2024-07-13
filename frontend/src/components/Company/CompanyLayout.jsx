import React, { useState } from 'react'
import CompanySidebar from './CompanySidebar'
import { Outlet } from 'react-router-dom'

const CompanyLayout = () => {
    const [sidebarToggle, setSidebarToggle] = useState(false);
  return (
    <div className='d-flex flex-column'>
        <CompanySidebar sidebarToggle={sidebarToggle}
        setSidebarToggle={setSidebarToggle}
        />
        <div className={`${sidebarToggle?"ml-25 w-75":" w-100"} `}>
                <Outlet  context={{ sidebarToggle: sidebarToggle, setSidebarToggle: setSidebarToggle }} />
        </div>
    </div>
  )
}

export default CompanyLayout