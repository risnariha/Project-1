
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateProduct = () => {
  const { product_id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    product_name: '',
    product_price: '',
    product_quantity: '',
    product_image: '',
  });
  const [newImage, setNewImage] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost/Project-1/backend/api/Company/view_product.php?product_id=${product_id}`)
      .then((response) => {
        if (response.data.length > 0) {
          setProduct(response.data[0]);
        } else {
          console.error('Product not found');
        }
      })
      .catch((error) => console.error('Error fetching product:', error));
  }, [product_id]);

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
    formData.append('update_product_id', product_id);
    formData.append('update_product_name', product.product_name);
    formData.append('update_product_price', product.product_price);
    formData.append('update_product_quantity', product.product_quantity);
    if (newImage) {
      formData.append('update_product_image', newImage);
    } else {
      formData.append('current_product_image', product.product_image);
    }

    axios
      .post('http://localhost/Project-1/backend/api/Company/update_product.php', formData)
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
            src={`http://localhost/Project-1/images/${product.product_image}`}
            alt={product.product_name}
          />
          <input type="hidden" name="update_product_id" value={product.product_id} />
          <input type="hidden" name="current_product_image" value={product.product_image} />
          <input
            type="text"
            className="input_fields fields"
            name="product_name"
            value={product.product_name}
            onChange={handleChange}
            required
          />
          <div className="input_fields fields price_container">
            <span className="currency_label">  Rs.</span>
            <input
              type="number"
              name="product_price"
              value={product.product_price}
              onChange={handleChange}
              required
            />
          </div>
          <input
            type="number"
            className="input_fields fields"
            name="product_quantity"
            value={product.product_quantity}
            onChange={handleChange}
            required
          />
          <input
            type="file"
            className="input_fields fields"
            name="product_image"
            onChange={handleFileChange}
            accept="image/*"
          />
          <div className="btns">
            <input type="submit" className="edit_btn" value="Update Product" name="update_product" />
            <input type="reset" id="close-edit" className="cancel_btn" value="Cancel" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
