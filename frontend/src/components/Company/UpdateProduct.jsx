import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { BiImageAdd } from "react-icons/bi";

const UpdateProduct = () => {
  const { productID } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    productName: "",
    productPrice: "",
    productQuantity: "",
    productImage: "",
  });
  const [image, setImage] = useState(null);
  const [imagepath, setImagePath] = useState("");
  const [message, setMessage] = useState("");
  const hiddenFileInput = useRef(null);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/backend/api/Company/view_product.php?product_id=${productID}`
      )
      .then((response) => {
        if (response.data) {
          setProduct({
            productName: response.data.productName || "",
            productPrice: response.data.productPrice || "",
            productQuantity: response.data.productQuantity || "",
            productImage: response.data.productImage || "",
          });
          setImagePath(response.data.productImage || "");
        } else {
          console.error("Product not found");
        }
      })
      .catch((error) => console.error("Error fetching product:", error));
  }, [productID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImagePath(URL.createObjectURL(file));
    setImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("update_product_id", productID);
    formData.append("update_product_name", product.productName);
    formData.append("update_product_price", product.productPrice);
    formData.append("update_product_quantity", product.productQuantity);
    formData.append("image", image);
    formData.append("imagePath", imagePath);

    axios
      .post(
        "http://localhost:8080/backend/api/Company/update_product.php",
        formData
      )
      .then((response) => {
        console.log("update : ", response.data);
        setMessage(response.data.message);
        setTimeout(() => {
          navigate("/Company/display-product");
        }, 2000);
      })
      .catch((error) => {
        setMessage("Error updating product.");
        console.error("Error updating product:", error);
      });
  };

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  return (
    <div>
      {message && <div className="display_message">{message}</div>}
      {productID && (
        <div className="edit_container">
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="update_product product_container_box"
          >
            <div className="justify-content-center d-flex w-30  align-items-center ms-5">
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="upload image"
                  className="w-75 rounded-circle align-items-center justify-content-center"
                />
              ) : product.productImage ? (
                <img
                  src={product.productImage}
                  alt=" image"
                  className="w-100 rounded-circle align-items-start d-flex "
                />
              ) : (
                <BiImageAdd className="w-100 h-100 ps-2 rounded bg-white" />
              )}
            </div>
            <input type="hidden" name="update_product_id" value={productID} />
            <input
              type="hidden"
              name="current_product_image"
              value={product.productImage}
            />
            <input
              type="text"
              className="input_fields fields"
              name="productName"
              value={product.productName}
              onChange={handleChange}
              required
            />
            <div className="input_fields fields price_container">
              <span className="currency_label"> Rs.</span>
              <input
                type="number"
                name="productPrice"
                value={product.productPrice}
                onChange={handleChange}
                required
              />
            </div>
            <input
              type="number"
              className="input_fields fields"
              name="productQuantity"
              value={product.productQuantity}
              onChange={handleChange}
              required
            />
            <input
              type="file"
              className="input_fields form-control"
              ref={hiddenFileInput}
              onChange={handleFileChange}
            />
            <div className="btns">
              <input
                type="submit"
                className="edit_btn"
                value="Update Product"
                name="update_product"
              />
              <Link className="cancel_btn" to={"/company/display-product"}>
                Cancel
              </Link>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateProduct;
