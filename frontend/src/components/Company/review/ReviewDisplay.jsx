
import React from 'react';

const ReviewDisplay = ({ reviews }) => {
    return (
        <div id="display_review">
            {reviews.map((review, index) => (
                <div className='row mt-2' key={index}>
                    <div className='col-1'>
                        <h1><div className='bg-danger rounded-circle text-center text-white text-uppercase pt-2 pb-2'>{review.name.charAt(0)}</div></h1>
                    </div>
                    <div className='col-11'>
                        <div className='card'>
                            <div className='card-header'>
                                {review.name}
                            </div>
                            <div className='card-body'>
                                {[...Array(5)].map((star, index) => (
                                    <i key={index} className={`fa fa-star mr-1 ${index < review.rating ? 'text-warning' : 'star-light'}`}></i>
                                ))}
                                <br />{review.message}
                            </div>
                            <div className='card-footer'>
                                {review.datetime}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ReviewDisplay;
