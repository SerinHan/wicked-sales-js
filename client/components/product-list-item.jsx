import React from 'react';

export default function ProductListItem() {
  return (
    <div className='card'>
      <img className='card-img-top' src='/images/favicon.png' alt='...' />
      <div className='card-body'>
        <h5 className='card-title'>Product Name</h5>
        <p>$0.00</p>
        <p className='card-text'>Some card text.</p>
      </div>
    </div>
  );
}
