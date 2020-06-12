import React from 'react';

export default function ProductListItem(props) {
  return (
    <div className='card col m-2 p-0'>
      <img className='card-img-top' src={props.image} alt='...' />
      <div className='card-body'>
        <h5 className='card-title'>{props.name}</h5>
        <p>${(props.price / 100).toFixed(2)}</p>
        <p className='card-text'>{props.description}</p>
      </div>
    </div>
  );
}
