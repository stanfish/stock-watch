import React, { Component } from 'react';
import { Button, Divider, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import moment from 'moment';
import firebase from '../firebase.js';
import './StockList.css';

class StockList extends Component {

  removeItem = itemId => {
    const itemRef = firebase.database().ref(`/items/${itemId}`);
    itemRef.remove();
  }
  
  render() {

    let fromDate, toDate;
    if (this.props.dateRange && this.props.dateRange.fromDate) {
      fromDate = moment(this.props.dateRange.fromDate).format('MM/DD/YYYY');
    }

    if (this.props.dateRange && this.props.dateRange.toDate) {
      toDate = moment(this.props.dateRange.toDate).format('MM/DD/YYYY');
    }    

    return (
      <section className='stock-display-item'>
        <div className="stock-wrapper">
          <ul>
            {this.props.stocks && this.props.stocks.map((item) => {
              return (
                <li key={item.id}>
                  <h3>{item.stock}</h3>
                    <div>
                      Current price: $
                      <span>
                        <Loader inline active={!this.props.stockMap[item.stock] || !this.props.stockMap[item.stock].currentPrice} />
                        {this.props.stockMap[item.stock] && this.props.stockMap[item.stock].currentPrice}
                      </span>
                    </div>  

                    { fromDate &&
                      <div>
                        Price at ({fromDate}): $ 
                        <span>
                          <Loader inline active={!this.props.stockMap[item.stock] || !this.props.stockMap[item.stock].fromPrice} />
                          {this.props.stockMap[item.stock] && this.props.stockMap[item.stock].fromPrice}
                        </span>
                      </div>  
                    }

                    { toDate &&
                      <div>
                        Price at ({toDate}): $ 
                        <span>
                          <Loader inline active={!this.props.stockMap[item.stock] || !this.props.stockMap[item.stock].toPrice} />
                          {this.props.stockMap[item.stock] && this.props.stockMap[item.stock].toDate}
                        </span>
                      </div>  
                    } 

                      <Divider section />
                      <Button secondary onClick={() => this.removeItem(item.id)}>Remove</Button> 
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
    dateRange: state.dateRange,
  };
};

export default connect(
  mapStateToProps,
)(StockList);
