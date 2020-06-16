import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      creditCard: null,
      shippingAddress: null
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.currentTarget.id]: e.currentTarget.value });
  }

  render() {
    return (
      <div className='container d-flex flex-column'>
        <h1>My Cart</h1>
        <p>Order Total: ${this.props.total}</p>
        <label htmlFor='name'>
          <p>Name</p>
          <input id='name' className='w-100' type='text' onChange={this.handleChange} />
        </label>

        <label htmlFor='creditCard'>
          <p>Credit Card</p>
          <input id='creditCard' className='w-100' type='number' onChange={this.handleChange} />
        </label>

        <label htmlFor='shippingAddress'>
          <p>Shipping Address</p>
          <textarea id='shippingAddress' className='w-100' rows='3' onChange={this.handleChange} />
        </label>

        <div className='d-flex justify-content-between align-items-center'>
          <p className='mt-2 text-muted cursor-pointer' onClick={() => this.props.setView('catalog', {})}>&lt; Continue shopping</p>
          <button className='btn btn-primary' type="button" onClick={() => this.props.placeOrder({ name: this.state.name, creditCard: this.state.creditCard, shippingAddress: this.state.shippingAddress })}>Place Order</button>
        </div>
      </div>
    );
  }
}
