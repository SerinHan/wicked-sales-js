import React from 'react';
import ProductListItem from './product-list-item.jsx';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => this.setState({ products: data }))
      .catch(err => {
        // eslint-disable-next-line no-console
        console.err(err);
      });
  }

  createRows() {
    const productCards = this.state.products.map(product => {
      return (
        <ProductListItem className='col' key={product.productId} setView={this.props.setView} productId={product.productId} image={product.image} name={product.name} price={product.price} description={product.shortDescription}/>
      );
    });
    const chunks = [];
    for (let i = 0; i < productCards.length; i += 3) {
      chunks.push(productCards.slice(i, i + 3));
    }
    const rows = chunks.map((row, index) => {
      return (
        <div key={index} className='row'>
          {row}
        </div>
      );
    });
    return rows;
  }

  render() {
    if (this.state.products.length > 0) {
      const rows = this.createRows();
      return (
        <div className='container'>
          {rows}
        </div>
      );
    }
    return null;
  }
}
