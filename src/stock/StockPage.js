import React, { Component } from 'react';
import { Button, Divider, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import firebase from '../firebase.js';
import './StockPage.css';
import { setStocks } from '../actions';
import AddStock from './AddStock';

class StockPage extends Component {

  removeItem = itemId => {
    const itemRef = firebase.database().ref(`/items/${itemId}`);
    itemRef.remove();
  }

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
      }
      this.props.setStocks(newItem);
    });
  }
  
  render() {
    return (
        <div className='stock-container'>
          <AddStock />
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
  setStocks
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StockPage);
