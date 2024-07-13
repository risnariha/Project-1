import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaRegTimesCircle } from "react-icons/fa";

function AddProduct() {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [quantity, setQuantity] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [netWeight, setNetWeight] = useState('');
    const [productNameError, setProductNameError] = useState('');
    const [productPriceError, setProductPriceError] = useState('');
    const [productImageError, setProductImageError] = useState('');
    const [quantityError, setQuantityError] = useState('');
    const [productCategoryError, setProductCategoryError] = useState('');
    const [netWeightError, setNetWeightError] = useState('');
    const [message, setMessage] = useState('');
    const [isMessageVisible, setIsMessageVisible] = useState(false);
    const fileInputRef = useRef(null);

    // const companyName = localStorage.getItem('companyName'); // Retrieve company name from local storage

    useEffect(() => {
        if (productName.trim()) {
            setProductNameError('');
        }
    }, [productName]);

    useEffect(() => {
        if (productPrice.trim()) {
            setProductPriceError('');
        }
    }, [productPrice]);

    useEffect(() => {
        if (productImage) {
            setProductImageError('');
        }
    }, [productImage]);

    useEffect(() => {
        if (quantity.trim()) {
            setQuantityError('');
        }
    }, [quantity]);

    useEffect(() => {
        if (productCategory.trim()) {
            setProductCategoryError('');
        }
    }, [productCategory]);

    useEffect(() => {
        if (netWeight.trim()) {
            setNetWeightError('');
        }
    }, [netWeight]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setProductNameError('');
        setProductPriceError('');
        setProductImageError('');
        setQuantityError('');
        setProductCategoryError('');
        setNetWeightError('');

        let formValid = true;

        if (!productName.trim()) {
            setProductNameError('Product name is required');
            formValid = false;
        } else if (!productPrice.trim()) {
            setProductPriceError('Product price is required');
            formValid = false;
        } else if (!productImage) {
            setProductImageError('Product image is required');
            formValid = false;
        } else if (!quantity.trim()) {
            setQuantityError('Product quantity is required');
            formValid = false;
        } else if (!productCategory.trim()) {
            setProductCategoryError('Product category is required');
            formValid = false;
        } else if (!netWeight.trim()) {
            setNetWeightError('Product net weight is required');
            formValid = false;
        }

        if (!formValid) {
            setMessage('Invalid input. Please check.');
            setIsMessageVisible(true);
            setTimeout(() => {
                setIsMessageVisible(false);
            }, 5000);
            return;
        }

        const formData = new FormData();
        // formData.append('company_name', companyName); // Add company name to form data
        formData.append('product_name', productName);
        formData.append('product_price', productPrice);
        formData.append('product_image', productImage);
        formData.append('quantity', quantity);
        formData.append('product_category', productCategory);
        formData.append('net_weight', netWeight);

        try {
            const response = await axios.post('http://localhost/Project-1/backend/api/Company/add_product.php', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setMessage(response.data.message);
            setIsMessageVisible(true);
            setProductName('');
            setProductPrice('');
            setProductImage(null);
            setQuantity('');
            setProductCategory('');
            setNetWeight('');
            fileInputRef.current.value = '';

            setTimeout(() => {
                setIsMessageVisible(false);
            }, 5000);
        } catch (error) {
            console.error('Error:', error);
            setMessage('Failed to add product. Please try again later.');
            setIsMessageVisible(true);

            setTimeout(() => {
                setIsMessageVisible(false);
            }, 5000);
        }
    };

    const handleCloseMessage = () => {
        setIsMessageVisible(false);
    };

    return (
        <div className="maincontainer rounded mt-5 w-75 " >
            {isMessageVisible && message && (
                <div className="display_message">
                    {message}
                    <FaRegTimesCircle onClick={handleCloseMessage} />
                </div>
            )}
            <h3 className="heading">Add Products</h3>
            <form onSubmit={handleSubmit} className="add_product justify-content-center">
                <div className="form-group">
                    <input
                        type="text"
                        className="input_fields form-control"
                        placeholder="Enter product name"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                    />
                    {productNameError && <div className="error_message">{productNameError}</div>}
                </div>
                <div className="form-group">
                    
                    <input
                        type="number"
                        className="input_fields form-control"
                        
                        placeholder="Enter product price"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                    />
                    {productPriceError && <div className="error_message">{productPriceError}</div>}
                </div>
                
                <div className="form-group">
                    <input
                        type="number"
                        className="input_fields form-control"
                        placeholder="Enter product quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                    {quantityError && <div className="error_message">{quantityError}</div>}
                </div>
                <div className="form-group">
                    <select
                        className="input_fields form-control"
                        value={productCategory}
                        onChange={(e) => setProductCategory(e.target.value)}
                    >
                        <option value="">Select Product Category</option>
                        <option value="Soap & Washing powders">Soap & Washing powders</option>
                        <option value="Milk powder & Tea Powder">Milk powder & Tea Powder</option>
                        <option value="Soft Drinks">Soft Drinks</option>
                        <option value="Flour">Flour</option>
                        <option value="Chocolates">Chocolates</option>
                        <option value="Biscuits">Biscuits</option>
                        <option value="Rice and Grains">Rice and Grains</option>
                        <option value="Oil">Oil</option>
                        <option value="Stationary items">Stationary items</option>
                        <option value="Cosmetic Items">Cosmetic Items</option>
                        <option value="Baby products">Baby products</option>
                        <option value="Noodles">Noodles</option>
                    </select>
                    {productCategoryError && <div className="error_message">{productCategoryError}</div>}
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="input_fields form-control"
                        placeholder="Enter product net weight"
                        value={netWeight}
                        onChange={(e) => setNetWeight(e.target.value)}
                    />
                    {netWeightError && <div className="error_message">{netWeightError}</div>}
                </div>
                <div className="form-group">
                    <input
                        type="file"
                        className="input_fields form-control"
                        ref={fileInputRef}
                        onChange={(e) => setProductImage(e.target.files[0])}
                    />
                    {productImageError && <div className="error_message">{productImageError}</div>}
                </div>

                <button type="submit" className="submit_btn">Add Product</button>
            </form>
        </div>
    );
}

export default AddProduct;


