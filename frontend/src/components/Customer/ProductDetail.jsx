import React from 'react';
import { useLocation } from 'react-router-dom';

function ProductDetail({sidebarToggle}) {
  const location = useLocation();
  const { product } = location.state;

  return (
    <div className='container d-flex justify-content-center'>
        <div 
        className={`${ sidebarToggle ? "ml-25" : "" } w-full card-body d-flex flex-row mt-5`}
         
        >
          <div className="card m-3" >
            <div className="row g-0 justify-content-center align-items-center d-flex p-4">
              <div className="col-md-4 col-sm-5 col-6">
                <img src={product.Image} className="img-fluid rounded-start" alt="..."/>
              </div>
              <div className="col-md-8">
                <div className="card-body d-flex flex-column">
                  <h4 className="card-title ">{product.Name}</h4>
                  <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  <h6 className='card-title rounded fw-bold'>Rs. {product.Price}.00</h6> 
                  <div className='justify-content-center align-items-center d-flex flex-column'>
                  <button className='btn btn-danger rounded-pill md-w-50 sm-w-75 xs-w-100 mb-2'>Add to Cart</button>
                  <button className='btn btn-danger bg-white text-danger rounded-pill md-w-50 sm-w-75 xs-w-100'>Buy Now</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className='card w-50 d-flex'>
            <h2 className='card-title d-flex'>{product.Name}</h2>
            <img src={product.Image} alt="" className='card-img p-5 d-flex' />
          </div>
          <div className='w-100 d-flex flex-column p-5'>
            <h2 className='card-title bg-dark text-white p-3 rounded'>Rs. {product.Price}.00</h2>
            <h3 className='card-title'>{product.Name}</h3>
            <h4 className='card-title'>{product.Mobile}</h4>
            <h5 className='card-title'>{product.Email}</h5>
            <h2 className='card-title'>{product.Name}</h2>
            
          </div> */}
        </div>
    </div>
  );
}

export default ProductDetail;
