import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomeCard = ({ title, icon: Icon, count }) => {
  return (
    <div className='p-4 shadow bg-dark rounded'>{/* Each card */}
      <div className='d-flex align-items-center mb-2'>
        <Icon className='me-2 text-white' style={{ width: '24px', height: '24px' }} />
        <h3 className='h5 text-white mb-0'>{title}</h3>
      </div>
      <h2 className='h3 text-white fw-bold'>{count}</h2>
    </div>
  );
};

export default HomeCard;
