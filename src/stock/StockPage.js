import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from '../firebase.js';
import moment from 'moment';
import './StockPage.scss';
import { setStocks, fetchCurrentPrice, fetchCompany, setDateRange, fetchDatePrice } from '../actions';
import AddStock from './AddStock';
import StockList from './StockList';
import DateRangePicker from './DateRangePicker';
//import {saveLocalStorage, getLocalStorage} from '../util';

class StockPage extends Component {

  componentDidMount() {
    // For Realtime Firebase Database
    // const itemsRef = firebase.database().ref('items');
    // itemsRef.orderByChild('user').equalTo(this.props.user.uid).on('value', (snapshot) => {
    //   let items = snapshot.val();
    //   let newItem = [];
    //   for (let item in items) {
    //     newItem.push({
    //       id: item,
    //       stock: items[item].stock,
    //       user: items[item].user
    //     });
    //     this.props.fetchCurrentPrice(items[item].stock);
    //     this.props.fetchCompany(items[item].stock);
    //   }
    //   this.props.setStocks(newItem);
    // });

    // For Cloud Firebase
    this.unSubscribeFirebaseOnSnapshot = firebase.firestore().collection('stocks').where('user','==',this.props.user.uid).onSnapshot(snapshot => {
      let newItem = [];
      for (var i=0; i<snapshot.docs.length; i++) {
        let doc = snapshot.docs[i];
        if (doc.data) {
          let data = doc.data();
          newItem.push({
            id: doc.id,
            stock: data.stock,
            user: data.user
          });
          this.props.fetchCurrentPrice(data.stock);
          this.props.fetchCompany(data.stock);
        }
      }
      this.props.setStocks(newItem);
    });
  }

  componentWillUnmount() {
    this.unSubscribeFirebaseOnSnapshot();
  }

  applyDateRange = (from, to ) => {
    //console.log('Apply date', moment(from).format('YYYYMMDD'), moment(to).format('YYYYMMDD'));
    this.props.setDateRange(from, to);
    this.props.stocks.forEach(stock => {
      this.props.fetchDatePrice(stock.stock, moment(from).format('YYYYMMDD'), true);
      this.props.fetchDatePrice(stock.stock, moment(to).format('YYYYMMDD'), false);
    });
  }
  
  render() {
    return (
        <div className='stock-container'>
          <AddStock />
          <div style={{width: '100%', gridArea: 'stock-list'}}>
            <DateRangePicker onApply={this.applyDateRange} />
            <br />
            <StockList />
          </div>
        </div>
    );
  }
}

const mapStateToProps = state => {
  return { 
    user: state.user,
    stocks: state.stocks,
  };
};

const mapDispatchToProps = {
  setStocks,
  fetchCurrentPrice,
  fetchCompany,
  setDateRange,
  fetchDatePrice,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StockPage);
