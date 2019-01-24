import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from '../firebase.js';
import moment from 'moment';
import './StockPage.css';
import { setStocks, fetchCurrentPrice, setDateRange } from '../actions';
import AddStock from './AddStock';
import StockList from './StockList';
import DateRangePicker from './DateRangePicker';
//import {saveLocalStorage, getLocalStorage} from '../util';
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

  applyDateRange = (from, to ) => {
    console.log('Apply date', moment(from).format('YYYYMMDD'), moment(to).format('YYYYMMDD'));
    this.props.setDateRange(from, to);
  }
  
  render() {
    return (
        <div className='stock-container'>
          <AddStock />
          <div style={{width: '100%'}}>
            <DateRangePicker onApply={this.applyDateRange} />
            <StockList />
          </div>
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
  fetchCurrentPrice,
  setDateRange,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StockPage);
