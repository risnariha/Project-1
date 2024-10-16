import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';

const Review = () => {
  const { user } = useOutletContext(); // assuming user context contains companyOwnerID
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (user) {
          const response = await axios.post('http://localhost:8080/backend/api/Company/view_product.php', {
            companyOwnerID: user.companyOwnerID,
          });
          console.log("user-- ", user);

          if (Array.isArray(response.data)) {
            setProducts(response.data);
          } else {
            setError('Invalid response format');
            console.error('Invalid response format:', response.data);
          }
        }
      } catch (error) {
        setError('Error fetching products');
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [user]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="maincontainer">
       <div className="table_heading">
        <h3>Review details</h3>
      </div>
      <section className="display_details">
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
                <tr key={product.productID}>
                  <td>{index + 1}</td>
                  <td className='col-1'><img src={product.productImage} alt={product.productName} className='w-100' /></td>
                  <td>{product.productName}</td>
                  <td>
                    <Link className="btn btn-primary m-2" to={`/company/reviewlayout/${product.productID}`}>Check</Link>
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
