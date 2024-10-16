import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/backend/api/Home/getProducts.php');
        console.log('Fetched products:', response.data);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  const filteredItems = products.filter(product =>
    product.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div>
      <div className="homeHeader">

        <div className="homeHeaderLinks" >
          <Link to="/" style={{ fontSize: '150%' }}>Home</Link>
          <Link to="/products" style={{ fontSize: '150%' }}>Products</Link>
          <Link to="/faqs" style={{ fontSize: '150%' }}>FAQs</Link>
          <Link to="/Login" style={{ fontSize: '150%' }}>Log in</Link>
          
            {/* <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
            /> */}
        </div>
        <form className="d-flex " role="search" >
          <input className="form-control "  value={searchQuery} onChange={handleSearch} placeholder="Search Products...." aria-label="Search"/>
        </form>
      </div>
      <div className='container mt-5'>
        
          {filteredItems?(
            <div className='row gy-4'>
            
       
              {filteredItems.map((product) => (
                <div key={product.productId} className='col-6 col-md-6 col-lg-4'>
                <div className='card'>
                  <img src={product.productImage} className='card-img-top' alt={product.name} />
                  <div className='card-body'>
                    <h5 className='card-title'>{product.productName}</h5>
                    <p className='card-title fs-5'>{product.productNetweight}</p>
                    <p className='card-text fs-5'>{product.productCategory}</p>
                    <p className='card-text fs-4'>Price: Rs.{product.productPrice}</p>
                  </div>
                </div>
              </div>
              ))}
        
          </div>
          ):(
            <div className='row gy-4'>
            {products.map((product) => (
            <div key={product.productId} className='col-6 col-md-3 col-lg-4'>
              <div className='card'>
                <img src={product.productImage} className='card-img-top bg-dark' alt={product.name} />
                <div className='card-body bg-secondary text-white'>
                  <h5 className='card-title'>{product.productName}</h5>
                  <p className='card-title fs-5'>{product.productNetweight}</p>
                  <p className='card-text fs-5'>{product.productCategory}</p>
                  <p className='card-text fs-4'>Price: Rs.{product.productPrice}</p>
                </div>
              </div>
            </div>
          ))}
          </div>)

          }
         
        </div>
      </div>
  
  );
};

export default Products;




