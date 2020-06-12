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
      }
    };
    this.setView = this.setView.bind(this);
  }

  setView(name, params) {
    this.setState({ view: { name, params } });
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const view = this.state.view.name === 'catalog' ? <ProductList setView={this.setView} /> : <ProductDetails />;

    return (this.state.isLoading
      ? <h1>Testing connections...</h1>
      : (
        <div>
          <Header />
          {view}
        </div>
      ));
  }
}
