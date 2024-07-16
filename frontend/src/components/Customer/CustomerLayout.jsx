import React, { useState } from 'react'
import { CustomerSidebar } from './Sidebar';
import { Outlet } from 'react-router-dom';

const CustomerLayout = () => {
    const [sidebarToggle, setSidebarToggle] = useState(false);
    return (
        <div className='d-flex flex-column'>
            <CustomerSidebar
                sidebarToggle={sidebarToggle}
                setSidebarToggle={setSidebarToggle}
            />
            <div className={`${sidebarToggle? "ml-25" : "w-full"}`}>
                <Outlet
                    context={{ sidebarToggle: sidebarToggle, setSidebarToggle: setSidebarToggle }}
                />
            </div>

        </div>
    )
}

export default CustomerLayout