import React, { Component } from 'react';
import { Input, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import moment from 'moment';
import firebase from '../firebase.js';
import './AddStock.scss';
import { setStocks, fetchDatePrice } from '../actions';

class AddStock extends Component {
  state = {
    inputStock: '',
    error: '',
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      error: '',
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.inputStock) {
      return;
    }
    let objFound = this.props.stocks.find(stock => stock.stock === this.state.inputStock);
    if (objFound) {
      this.setState({error: 'Duplicate stock'});
      return;
    }

    const item = {
      stock: this.state.inputStock,
      user: this.props.user.uid
    }

// For Realtime Firebase Database
    // const itemsRef = firebase.database().ref('items');
    // itemsRef.push(item);

    
  // For Cloud Firebase
    firebase.firestore().collection("stocks").add(
      item
    );

    this.setState({
      inputStock: ''
    });

    const {fromDate, toDate} = this.props.dateRange || {};
    if (fromDate && toDate) {
      this.props.fetchDatePrice(this.state.inputStock, moment(fromDate).format('YYYYMMDD'), true);
      this.props.fetchDatePrice(this.state.inputStock, moment(toDate).format('YYYYMMDD'), false);
    }
  }
  
  render() {
    return (
      <section className='stock-add-item'>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="inputStock">New Stock : </label>
          <Input style={{width: '85px'}} type="text" id="inputStock" name="inputStock" placeholder="Symbol" onChange={this.handleChange} value={this.state.inputStock} />
          <span className="stock-error-message">{this.state.error}</span>
          <br />
          <Button primary>Add Stock</Button>
        </form>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return { 
    user: state.user,
    dateRange: state.dateRange,
    stocks: state.stocks,
  };
};

const mapDispatchToProps = {
  setStocks,
  fetchDatePrice,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddStock);
