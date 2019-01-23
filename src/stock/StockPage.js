import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from '../firebase.js';
import './StockPage.css';
import { setStocks, fetchCurrentPrice } from '../actions';
import AddStock from './AddStock';
import StockList from './StockList';

class StockPage extends Component {

  componentDidMount() {
    const itemsRef = firebase.database().ref('items');

    itemsRef.orderByChild('user').equalTo(this.props.user.uid).on('value', (snapshot) => {
      let items = snapshot.val();
      let newItem = [];
      for (let item in items) {
        newItem.push({
          id: item,
          stock: items[item].stock,
          user: items[item].user
        });
        this.props.fetchCurrentPrice(items[item].stock);
      }
      this.props.setStocks(newItem);
      
    });
  }
  
  render() {
    return (
        <div className='stock-container'>
          <AddStock />
          <StockList />
        </div>
    );
  }
}

const mapStateToProps = state => {
  return { 
    user: state.user,
  };
};

const mapDispatchToProps = {
  setStocks,
  fetchCurrentPrice
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StockPage);
