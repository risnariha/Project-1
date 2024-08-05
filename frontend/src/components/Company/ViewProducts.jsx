
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaEdit } from 'react-icons/fa';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';

const ViewProducts = () => {
  const { user } = useOutletContext(); // assuming user context contains companyOwnerID
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if(user){
        const response = await axios.post('http://localhost:8080/backend/api/Company/view_product.php', {
          companyOwnerID: user.companyOwnerID,
        });
        console.log("user-- ",user);
      
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
  }, [user.companyOwnerID]);

  const handleDelete = async (productID) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await axios.get(`http://localhost:8080/backend/api/Company/delete_product.php?delete=${productID}`);

        if (response.data.success) {
          setProducts(products.filter(product => product.productID !== productID));
        } else {
          console.error('Error deleting product:', response.data.error);
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="maincontainer">
      <div className="table_heading">
        <h3>Product details</h3>
      </div>
      <section className="display_product">
        {products.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>S No</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Netweight</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.productID}>
                  <td>{index + 1}</td>
                  <td className='col-2'><img src={product.productImage} alt={product.productName} className='w-100'/></td>
                  <td>{product.productName}</td>
                  <td>{product.productPrice}</td>
                  <td>{product.productQuantity}</td>
                  <td>{product.productNetweight}</td>
                  <td>
                    <button className="delete_product_btn" onClick={() => handleDelete(product.productID)}><FaTrash /></button>
                    <Link className="update_product_btn" to={`/company/update/${product.productID}`}><FaEdit /></Link>
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

export default ViewProducts;
