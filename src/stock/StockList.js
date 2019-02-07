import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import moment from 'moment';
import {get} from 'lodash';
import ReactTable from "react-table";
import 'react-table/react-table.css'
import firebase from '../firebase.js';
import './StockList.scss';

const maxPageSize = 20;
class StockList extends Component {

  removeItem = itemId => {

// For Realtime Firebase Database
    // const itemRef = firebase.database().ref(`/items/${itemId}`);
    // itemRef.remove();

// For Cloud Firebase
    firebase.firestore().collection("stocks").doc(itemId).delete().then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
      console.error("Error removing document: ", error);
    });

  }
  
  render() {
    let fromDate='', toDate='';
    if (this.props.dateRange && this.props.dateRange.fromDate) {
      fromDate = moment(this.props.dateRange.fromDate).format('MM/DD/YYYY');
    }

    if (this.props.dateRange && this.props.dateRange.toDate) {
      toDate = moment(this.props.dateRange.toDate).format('MM/DD/YYYY');
    }    

    let data = [];
    this.props.stocks.forEach((item) => {
      data.push({
        id: item.id,
        stock: item.stock,
        company: get(this.props, 'stockMap['+item.stock+'].company', ''),
        price: get(this.props, 'stockMap['+item.stock+'].currentPrice', ''),
        fromPrice: get(this.props, 'stockMap['+item.stock+'].fromPrice', ''),
        toPrice: get(this.props, 'stockMap['+item.stock+'].toPrice', ''),
        percent: get(this.props, 'stockMap['+item.stock+'].percent', ''),
      });
    });

    const pageSize = Math.min(maxPageSize, this.props.stocks.length);
  
    const columns = [{
      Header: 'Stock',
      accessor: 'stock',
      width: 50 
    }, {
      Header: 'Company',
      accessor: 'company' 
    }, {      
      Header: 'Price',
      accessor: 'price',
      width: 75,
    }, {
      Header: 'Price From ' + fromDate,
      accessor: 'fromPrice'
    }, {
      Header: 'Price To ' + toDate,
      accessor: 'toPrice'      
    }, {
      Header: 'Change',
      accessor: 'percent',
      width: 80,
      Cell: row => {
        let percentClass = 'stock-display-percent';
        const stock = row.original.stock;
        if (this.props.stockMap[stock] && this.props.stockMap[stock].percent !== undefined) {
          if (this.props.stockMap[stock].percent >= 0) {
            percentClass = 'stock-display-percent-up';
          } else {
            percentClass = 'stock-display-percent-down';
          }
        }
        return (
          <span className={percentClass}> 
            {get(this.props, 'stockMap['+stock+'].percent', '') + '%'}
          </span>
        );
      }
    }, {
      Header: 'Action',
      Cell: row => (
        <Button size='mini' compact negative onClick={() => this.removeItem(row.original.id)}>Remove</Button> 
      ),
      width: 100,
    }];

    return (
      <ul>
        <ReactTable
          data={data}
          columns={columns}
          pageSize={pageSize}
          className="-striped -highlight"
          getTrProps={ _ => {
            return {
              style: {
                height: '35px'
              }
            };
          }}
        />
      </ul>
    );
  }
}

const mapStateToProps = state => {
  return { 
    stocks: state.stocks,
    stockMap: state.stockMap,
    dateRange: state.dateRange,
  };
};

export default connect(
  mapStateToProps,
)(StockList);
