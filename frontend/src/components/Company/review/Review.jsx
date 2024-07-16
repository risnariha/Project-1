

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaEdit } from 'react-icons/fa';
import axios from 'axios';

const Review = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost/Project-1/backend/api/Company/view_product.php')
      .then(response => {
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          setError('Invalid response format');
          console.error('Invalid response format:', response.data);
        }
      })
      .catch(error => {
        setError('Error fetching products');
        console.error('Error fetching products:', error);
      });
  }, []);

//   const handleDelete = (product_id) => {
//     if (window.confirm('Are you sure you want to delete this product?')) {
//       axios.get(`http://localhost/Project-1/backend/api/Company/delete_product.php?delete=${product_id}`)
//         .then(response => {
//           if (response.data.success) {
//             setProducts(products.filter(product => product.product_id !== product_id));
//           } else {
//             console.error('Error deleting product:', response.data.error);
//           }
//         })
//         .catch(error => console.error('Error deleting product:', error));
//     }
//   };

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="maincontainer">
      <section className="display_product">
        {products.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>S No</th>
                <th>Image</th>
                <th>Name</th>
                <th>Review</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.product_id}>
                  <td>{index + 1}</td>
                  <td><img src={`http://localhost/Project-1/images/${product.product_image}`} alt={product.product_name} /></td>
                  <td>{product.product_name}</td>
                  
                  <td>
                    
                    <Link className="btn btn-primary m-2" to={`/reviewlayout/${product.product_id}`}>Check</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty_text">No Products Available</div>
        )}
      </section>
    </div>
  );
};

export default Review;
