import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './Sidebar';

const AdminLayout = () => {
    const [barToggle, setbarToggle] = useState(false);

    return (
        <div className='d-flex flex-column'>
            <AdminSidebar sidebarToggle={barToggle} setSidebarToggle={setbarToggle} />
            <div className=''>
                <Outlet  context={{ sidebarToggle: barToggle, setSidebarToggle: setbarToggle }} />
            </div>
        </div>
    );
};

export default AdminLayout;
