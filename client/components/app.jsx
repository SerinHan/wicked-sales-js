import React from 'react';
import Header from './header.jsx';
import ProductList from './product-list.jsx';
import ProductDetails from './product-details.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: {
        name: 'catalog',
        params: {}
      },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  setView(name, params) {
    this.setState({ view: { name, params } });
  }

  getCartItems() {
    fetch('/api/cart')
      .then(res => res.json())
      .then(data => this.setState({ cart: data }))
      .catch(err => this.setState({ message: err.message }));
  }

  addToCart(product) {
    fetch('/api/cart', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productId: product.productId })
    })
      .then(res => res.json())
      .then(data => {
        const cart = Array.from(this.state.cart);
        cart.push(data);
        this.setState({ cart });
      })
      .catch(err => this.setState({ message: err.message }));
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));

    this.getCartItems();
  }

  render() {
    const view = this.state.view.name === 'catalog' ? <ProductList setView={this.setView} /> : <ProductDetails setView={this.setView} productId={this.state.view.params.productId} addToCart={this.addToCart} />;

    return (this.state.isLoading
      ? <h1>Testing connections...</h1>
      : (
        <div>
          <Header count={this.state.cart.length} />
          {view}
        </div>
      ));
  }
}
