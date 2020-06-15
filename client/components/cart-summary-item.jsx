import React from 'react';

export default function CartSummaryItem(props) {
  return (
    <div className='card'>
      <div className='card-body d-flex'>
        <img className='col-5' src={props.item.image} />
        <div className='col-7'>
          <h1>{props.item.name}</h1>
          <p className='text-muted'>${(props.item.price / 100).toFixed(2)}</p>
          <p>{props.item.shortDescription}</p>
        </div>
      </div>
    </div>
  );
}
