
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateProduct = () => {
  const { productID} = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    productName: '',
    productPrice: '',
    productQuantity: '',
    productImage: '',
  });
  const [newImage, setNewImage] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8080/backend/api/Company/view_product.php?product_id=${productID}`)
      .then((response) => {
        if (response.data.length > 0) {
          setProduct(response.data[0]);
        } else {
          console.error('Product not found');
        }
      })
      .catch((error) => console.error('Error fetching product:', error));
  }, [productID]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('update_product_id', productID);
    formData.append('update_product_name', product.productName);
    formData.append('update_product_price', product.productPrice);
    formData.append('update_product_quantity', product.productQuantity);
    if (newImage) {
      formData.append('update_product_image', newImage);
    } else {
      formData.append('current_product_image', product.productImage);
    }

    axios
      .post('http://localhost:8080/backend/api/Company/update_product.php', formData)
      .then((response) => {
        if (response.data.success) {
          setMessage(response.data.success);
          setTimeout(() => {
            navigate('/display-product');
          }, 2000);
        } else {
          setMessage(response.data.error);
        }
      })
      .catch((error) => {
        setMessage('Error updating product.');
        console.error('Error updating product:', error);
      });
  };

  return (
    <div>
      {message && <div className="display_message">{message}</div>}
      <div className="edit_container">
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="update_product product_container_box">
          <img
            src={product.productImage}
            alt={product.productName}
          />
          <input type="hidden" name="update_product_id" value={product.productID} />
          <input type="hidden" name="current_product_image" value={product.productImage} />
          <input
            type="text"
            className="input_fields fields"
            name="product_name"
            value={product.productName}
            onChange={handleChange}
            required
          />
          <div className="input_fields fields price_container">
            <span className="currency_label">  Rs.</span>
            <input
              type="number"
              name="product_price"
              value={product.productPrice}
              onChange={handleChange}
              required
            />
          </div>
          <input
            type="number"
            className="input_fields fields"
            name="product_quantity"
            value={product.productQuantity}
            onChange={handleChange}
            required
          />
          <input
            type="file"
            className="input_fields fields"
            name="productImage"
            onChange={handleFileChange}
            accept="image/*"
          />
          <div className="btns">
            <input type="submit" className="edit_btn " value="Update Product" name="update_product" />
            <input type="reset" id="close-edit" className="cancel_btn " value="Cancel" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
