import React, { useEffect, useState } from 'react'
import axios from 'axios';
function ProuductList() {
  const [product,setProduct] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:5174/backend/api/connection.php')
    .then((res)=>{
      setProduct(res.data);
    });
  },[]);

  return (
    <div className='card w-full d-flex'>
        <div className='card-header align-items-center justify-content-center d-flex'>
            <div className="row align-items-center d-flex">
                <div className="d-flex"><b>Product list</b></div>
            </div>
        </div>
        <div className="card-body">
            <ul>
              {product.map((product,index)=>(
                <li key={index}>
                    <ol>
                      <li>{product.ID}</li>
                      <li>{product.Name}</li>
                      <li>{product.Email}</li>
                      <li>{product.Mobile}</li>
                    </ol>
                </li>
              ))}
            </ul>
        </div>
    </div>
  )
}

export default ProuductList