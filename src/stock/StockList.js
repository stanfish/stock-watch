import React, { Component } from 'react';
import { Button, Divider, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import moment from 'moment';
import firebase from '../firebase.js';
import './StockList.css';
import DateRangePicker from './DateRangePicker';
import 'react-day-picker/lib/style.css';
class StockList extends Component {

  removeItem = itemId => {
    const itemRef = firebase.database().ref(`/items/${itemId}`);
    itemRef.remove();
  }
  
  render() {

    console.log(moment().format('YYYYMMDD'));

    return (
      <section className='stock-display-item'>
        <div className="stock-wrapper">

        <DateRangePicker onApply={(from, to) => {
           console.log('Apply date', moment(from).format('YYYYMMDD'), moment(to).format('YYYYMMDD'));
        }} />

          <ul>
            {this.props.stocks && this.props.stocks.map((item) => {
              return (
                <li key={item.id}>
                  <h3>{item.stock}</h3>
                    <span>
                      Current price: $
                      <span>
                        <Loader inline active={!this.props.stockMap[item.stock] || !this.props.stockMap[item.stock].currentPrice} />
                        {this.props.stockMap[item.stock] && this.props.stockMap[item.stock].currentPrice}
                      </span>
                      <Divider section />
                      <Button secondary onClick={() => this.removeItem(item.id)}>Remove</Button> 
                    </span>  
                </li>
              )
            })}
          </ul>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return { 
    stocks: state.stocks,
    stockMap: state.stockMap,
  };
};

export default connect(
  mapStateToProps,
)(StockList);
