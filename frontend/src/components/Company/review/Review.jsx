import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import { useOutletContext } from 'react-router-dom';

const Review = () => {
  const { user } = useOutletContext(); // assuming user context contains companyOwnerID
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
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
            setFilteredProducts(response.data); 
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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === '') {
      setFilteredProducts(products); // Show all products if search is empty
    } else {
      const filtered = products.filter((product) =>
        product.productName.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="maincontainer">
       <div className="table_heading">
        <h3>Review details</h3>
         {/* Search bar and icon */}
         <div className="search_container">
          <input
            type="text"
            placeholder="Search by product name"
            value={searchTerm}
            onChange={handleSearch}
            className="search_input"
          />
          <FaSearch className="search_icon" />
        </div>
      </div>
      <section className="display_details">
      {filteredProducts.length > 0 ? (
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
            {filteredProducts.map((product, index) => (
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
            <tfoot>
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', fontWeight: 'bold' }}>
                  Total Products: {filteredProducts.length}
                </td>
              </tr>
            </tfoot>
          </table>
        ) : (
          <div className="empty_text">No Reveiws Available</div>
        )}
      </section>
    </div>
  );
};

export default Review;
