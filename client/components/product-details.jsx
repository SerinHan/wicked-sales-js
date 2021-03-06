import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    fetch(`/api/products/${this.props.productId}`)
      .then(res => res.json())
      .then(data => this.setState({ product: data }))
      .catch(err => console.error(err));
  }

  render() {
    const product = this.state.product;
    if (this.state.product) {
      return (
        <div className='container card'>
          <div className='card-body'>
            <p className='row text-muted cursor-pointer' onClick={() => this.props.setView('catalog', {})}>&lt; Back to catalog</p>
            <div className='row'>
              <img className='col-5 pl-0' src={product.image} />
              <div className='col-7'>
                <h1>{product.name}</h1>
                <p className='text-muted'>${(product.price / 100).toFixed(2)}</p>
                <p>{product.shortDescription}</p>
                <button onClick={() => this.props.addToCart(this.state.product)} type="button" className='btn btn-primary'>Add to Cart</button>
              </div>
            </div>
            <p className='row'>{product.longDescription}</p>
          </div>
        </div>
      );
    }
    return null;
  }
}
