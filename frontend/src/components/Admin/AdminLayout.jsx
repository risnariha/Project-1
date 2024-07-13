import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './Sidebar';

const AdminLayout = () => {
    const [sidebarToggle, setSidebarToggle] = useState(false);

    return (
        <div className='d-flex flex-column'>
            <AdminSidebar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
            <div className=''>
                <Outlet  context={{ sidebarToggle: sidebarToggle, setSidebarToggle: setSidebarToggle }} />
            </div>
        </div>
    );
};

export default AdminLayout;
