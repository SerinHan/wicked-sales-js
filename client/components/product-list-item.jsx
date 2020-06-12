import React from 'react';

export default function ProductListItem(props) {
  return (
    <a href='#' className='card col m-2 p-0 btn' onClick={ () => props.setView('details', { productId: props.productId })}>
      <img className='card-img-top' src={props.image} alt='...' />
      <div className='card-body'>
        <h5 className='card-title'>{props.name}</h5>
        <p className='text-muted'>${(props.price / 100).toFixed(2)}</p>
        <p className='card-text'>{props.description}</p>
      </div>
    </a>
  );
}
