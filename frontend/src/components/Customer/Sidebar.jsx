import React, { useState } from 'react'
import { FaHome, FaCartPlus, FaShoppingCart, FaShoppingBag, FaCog, FaWindowClose, FaUser } from 'react-icons/fa';
import { Dashboard } from './Dashboard';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

export const CustomerSidebar = ({ sidebarToggle, setSidebarToggle }) => {
    const [user , setUser] = useState(JSON.parse(sessionStorage.getItem('user')));
    const [error , setError] = useState(null);
    const [scrolled, setScrolled] = useState(false);
    const [scrollDirection, setScrollDirection] = useState(null);
    const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
    const navigate = useNavigate();

    // if (sidebarToggle) {
    //     window.scrollTo(0,0);
    // }

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

    useEffect(() =>{
        if(!user){
            handleLogout();
        }else{
            const getUserDetails = async ()=>{
                try{
                    const email = user['email'];
                    const userType = 'customers';
                    const response = await axios.post('http://localhost:8080/backend/api/Home/getUserDetails.php', { email,userType });
                    setUser(response.data);
                    console.log('data successfuly fetched' , response.data);
                    }catch (error){
                        setError(error);
                        console.error('Error fetching detail : ' ,error);
                    }
                };
                getUserDetails();
            }
        },[]);
    
    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/');
    };

    if(error){
        return <div> Error : {error.message} </div>;
    }
    return (
        <div className={`${scrolled ? "sticky-top" : " "} d-flex`}>
            <Dashboard
                sidebarToggle={sidebarToggle}
                setSidebarToggle={setSidebarToggle}
                user={user}
            />
            <div className={`${sidebarToggle ? "xs-w-50 md-w-25 sm-w-25" : "d-none"} ${scrolled?"position-absolute ":""} z-3 fixed d-felx bg-color h-full`}>
                <div className='mx-2 d-flex fs-5 fw-bold h-12 text-white align-items-center justify-content-between'>
                    <span>{user ? user.customerName:'loading....'} Dashboard</span>
                    <FaWindowClose className='fabar w-6 h-6' onClick={() => setSidebarToggle(!sidebarToggle)} />
                </div>
                <hr className='text-white m-0'></hr>
                
                <ul className='h-100vh pt-2 bg-color text-white list-unstyled fw-bold  '>
                    <li className='mb-2  hover-bg-blue-500 py-1 rounded align-items-center'>
                        <Link to={""} className='text-decoration-none text-white fs-5 px-2'>
                            <FaHome className='w-6 h-6 mx-3 pb-1' />Dashboard
                        </Link>
                    </li>
                    <li className='mb-2 hover-bg-blue-500 py-1 rounded align-items-center'>
                        <Link to={"/customer/productDetail"} className='text-decoration-none text-white fs-5 px-2'>
                            <FaShoppingCart className='w-6 h-6 mx-3 pb-1' />Card
                        </Link>
                    </li>
                    <li className='mb-2 hover-bg-blue-500 py-1 rounded align-items-center'>
                        <Link to="/customer/shop" className='text-decoration-none text-white fs-5 px-2'>
                            <FaShoppingBag className='w-6 h-6 mx-3 pb-1' />Shop
                        </Link>
                    </li>
                    <li className='mb-2 hover-bg-blue-500 py-1 rounded align-items-center'>
                        <Link to="/customer/setting" className='text-decoration-none text-white fs-5 px-2'>
                            <FaCog className='w-6 h-6 mx-3 pb-1' />Setting
                        </Link>
                    </li>
                    <li className='mb-2 hover-bg-blue-500 py-1 rounded align-items-center'>
                        <Link to="/customer/profile" className='text-decoration-none text-white fs-5 px-2'>
                            <FaUser className='w-6 h-6 mx-3 pb-1' />Logout
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}
