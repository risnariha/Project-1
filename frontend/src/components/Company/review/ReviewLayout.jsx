
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './reviewStyle.css';
import ReviewDisplay from './ReviewDisplay';

const ReviewLayout = () => {
    const { product_id } = useParams();
    const [product, setProduct] = useState(null);
    const [avgRating, setAvgRating] = useState(0);
    const [totalReview, setTotalReview] = useState(0);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        // Fetch product details
        axios.get(`http://localhost/Project-1/backend/api/Company/view_product.php?product_id=${product_id}`)
            .then((response) => {
                if (response.data.length > 0) {
                    setProduct(response.data[0]);
                } else {
                    console.error('Product not found');
                }
            })
            .catch((error) => console.error('Error fetching product:', error));

        // Fetch reviews for the product
        loadData(product_id);
    }, [product_id]);

    const loadData = (productId) => {
        axios.post('http://localhost/Project-1/backend/api/Company/review/reviewdata.php', { action: 'load_data', productId })
            .then(response => {
                console.log("Backend Response:", response.data);
                const data = response.data;
                setAvgRating(data.avgUserRatings);
                setTotalReview(data.totalReviews);
                setReviews(data.ratingsList);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    return (
        <div>
            <div className="jumbotron text-center">
                {product && (
                    <form action="">
                        <img src={`http://localhost/Project-1/images/${product.product_image}`} alt={product.product_name} />
                        <input type="hidden" name="update_product_id" value={product.product_id} />
                        <input type="hidden" name="current_product_image" value={product.product_image} />
                    </form>
                )}
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-sm-4 text-center m-auto">
                        <h1><span id="avg_rating">{avgRating}</span>/5.0</h1>
                        <div>
                            {[...Array(5)].map((star, index) => (
                                <i key={index} className={`fa fa-star star-light main_star mr-1 ${index < Math.ceil(avgRating) ? 'text-warning' : ''}`}></i>
                            ))}
                        </div>
                        <span id="total_review">{totalReview}</span> Reviews
                    </div>
                    <div className="col-sm-4 progressSection">
                        {[5, 4, 3, 2, 1].map((rating, index) => (
                            <div className='holder' key={index}>
                                <div>
                                    <div className="progress-label-left">
                                        <b>{rating}</b> <i className="fa fa-star mr-1 text-warning"></i>
                                    </div>
                                    <div className="progress-label-right">
                                        <span id={`total_${rating}_star_review`}>{reviews.filter(review => review.rating === rating).length}</span> Reviews
                                    </div>
                                </div>
                                <div className="progress">
                                    <div className="progress-bar bg-warning" id={`${rating}_star_progress`} style={{ width: `${(reviews.filter(review => review.rating === rating).length / totalReview) * 100}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <ReviewDisplay reviews={reviews} />
            </div>
        </div>
    );
};

export default ReviewLayout;
