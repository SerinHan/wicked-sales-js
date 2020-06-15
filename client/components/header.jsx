import React from 'react';

export default function Header(props) {
  return (
    <header className='d-flex justify-content-between align-items-center'>
      <h4 className='m-2'>$Wicked Sales</h4>
      <div className='m-2'>
        <span>{props.count}</span>
        <i className='fas fa-shopping-cart ml-2'></i>
      </div>
    </header>
  );
}
