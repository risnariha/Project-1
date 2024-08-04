import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);

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

  return (
    <div>
      <div className="homeHeader">

        <div className="homeHeaderLinks" >
          <Link to="/" style={{ fontSize: '150%' }}>Home</Link>
          <Link to="/products" style={{ fontSize: '150%' }}>Products</Link>
          <Link to="/faqs" style={{ fontSize: '150%' }}>FAQs</Link>
          <Link to="/Login" style={{ fontSize: '150%' }}>Log in</Link>
        </div>
      </div>
      <div className='container mt-5'>
        <div className='row gy-4'>
          {products.map((product) => (
            <div key={product.productId} className='col-6 col-md-6 col-lg-4'>
              <div className='card'>
                <img src={product.productImage} className='card-img-top' alt={product.name} />
                <div className='card-body'>
                  <h5 className='card-title'>{product.productName}</h5>
                  <p className='card-title'>{product.productNetweight}</p>
                  <p className='card-text'>{product.productCategory}</p>
                  <p className='card-text'>Price: Rs.{product.productPrice}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;




