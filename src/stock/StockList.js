import React, { Component } from 'react';
import { Button, Divider, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import firebase from '../firebase.js';
import './StockList.css';

class StockList extends Component {

  removeItem = itemId => {
    const itemRef = firebase.database().ref(`/items/${itemId}`);
    itemRef.remove();
  }
  
  render() {
    return (
      <section className='stock-display-item'>
        <div className="stock-wrapper">
          <ul>
            {this.props.stocks && this.props.stocks.map((item) => {
              return (
                <li key={item.id}>
                  <h3>{item.stock}</h3>
                      <span>
                        <Loader inline active={false} />
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
  };
};

export default connect(
  mapStateToProps,
)(StockList);
