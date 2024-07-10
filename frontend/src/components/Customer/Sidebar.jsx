import React, { useState } from 'react'
import { FaHome, FaCartPlus, FaShoppingCart, FaShoppingBag, FaCog, FaWindowClose, FaUser } from 'react-icons/fa';
import { Dashboard } from './Dashboard';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export const Sidebar = ({ sidebarToggle, setSidebarToggle }) => {

    const [scrolled, setScrolled] = useState(false);
    const [scrollDirection, setScrollDirection] = useState(null);
    const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);

    if (sidebarToggle) {
        window.scrollTo(0,0);
    }

    const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;

        // Determine scroll direction
        if (prevScrollPos < currentScrollPos) {
            setScrollDirection('up');
            setScrolled(false);
            setSidebarToggle(false);
        } else if (prevScrollPos > currentScrollPos) {
            setScrollDirection('down');
            setScrolled(true);
        } else {
            setScrolled(false);
        }

        setPrevScrollPos(currentScrollPos);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollPos]);
    return (
        <div className={`${scrolled ? "sticky-top" : " "} d-flex`}>
            <Dashboard
                sidebarToggle={sidebarToggle}
                setSidebarToggle={setSidebarToggle}
            />
            <div className={`${sidebarToggle ? "xs-w-50 md-w-25 sm-w-25" : "d-none"} z-3 fixed d-felx bg-primary h-full`}>
                <div className='mx-2 d-flex fs-5 fw-bold h-12 text-white align-items-center justify-content-between'>
                    <span>Customer Dashboard</span>
                    <FaWindowClose className='fabar w-6 h-6' onClick={() => setSidebarToggle(!sidebarToggle)} />
                </div>
                <hr className='text-white m-0'></hr>
                {/* <ul className='nav-list'>
      <li className='nav-item'>
        <Link to="/" className='nav-link'>
          <FaHome className='nav-icon' />Home
        </Link>
      </li>
      <li className='nav-item'>
        <Link to="/productDetail" className='nav-link'>
          <FaShoppingCart className='nav-icon' />Cart
        </Link>
      </li>
      <li className='nav-item'>
        <Link to="" className='nav-link'>
          <FaShoppingBag className='nav-icon' />Shop
        </Link>
      </li>
      <li className='nav-item'>
        <Link to="" className='nav-link'>
          <FaCog className='nav-icon' />Setting
        </Link>
      </li>
      <li className='nav-item'>
        <Link to="/profile" className='nav-link'>
          <FaUser className='nav-icon' />Logout
        </Link>
      </li>
    </ul> */}
                <ul className='mt-3  text-white list-unstyled fw-bold  '>
                    <li className='mb-2 hover-bg-blue-500 py-1 rounded align-items-center'>
                        <Link to={"/"} className='text-decoration-none text-white fs-5 px-2'>
                            <FaHome className='w-6 h-6 mx-3 pb-1' />Home
                        </Link>
                    </li>
                    <li className='mb-2 hover-bg-blue-500 py-1 rounded align-items-center'>
                        <Link to={"/productDetail"} className='text-decoration-none text-white fs-5 px-2'>
                            <FaShoppingCart className='w-6 h-6 mx-3 pb-1' />Card
                        </Link>
                    </li>
                    <li className='mb-2 hover-bg-blue-500 py-1 rounded align-items-center'>
                        <Link to="" className='text-decoration-none text-white fs-5 px-2'>
                            <FaShoppingBag className='w-6 h-6 mx-3 pb-1' />Shop
                        </Link>
                    </li>
                    <li className='mb-2 hover-bg-blue-500 py-1 rounded align-items-center'>
                        <Link to="" className='text-decoration-none text-white fs-5 px-2'>
                            <FaCog className='w-6 h-6 mx-3 pb-1' />Setting
                        </Link>
                    </li>
                    <li className='mb-2 hover-bg-blue-500 py-1 rounded align-items-center'>
                        <Link to="/profile" className='text-decoration-none text-white fs-5 px-2'>
                            <FaUser className='w-6 h-6 mx-3 pb-1' />Logout
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}
