import React from 'react';
import CartSummaryItem from './cart-summary-item.jsx';

export default function CartSummary(props) {
  let totalPrice = 0;

  if (props.cart.length < 1) {
    return (
      <div className='container'>
        <p className='mt-2 text-muted cursor-pointer' onClick={() => props.setView('catalog', {})}>&lt; Back to catalog</p>
        <h2>No items in cart</h2>
      </div>
    );
  }

  const items = props.cart.map(item => {
    totalPrice += item.price;
    return (
      <CartSummaryItem key={item.cartItemId} item={item} />
    );
  });

  return (
    <div className='container'>
      <p className='mt-2 text-muted cursor-pointer' onClick={() => props.setView('catalog', {})}>&lt; Back to catalog</p>
      <h1>Cart</h1>
      {items}
      <div>
        <h2>Item Total: ${(totalPrice / 100).toFixed(2)}</h2>
      </div>
    </div>
  );
}
