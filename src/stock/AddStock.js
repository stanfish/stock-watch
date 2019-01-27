import React, { Component } from 'react';
import { Input, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import moment from 'moment';
import firebase from '../firebase.js';
import './AddStock.css';
import { setStocks, fetchDatePrice } from '../actions';

class AddStock extends Component {
  state = {
    inputStock: ''
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.inputStock) {
      return;
    }

    const itemsRef = firebase.database().ref('items');
    const item = {
      stock: this.state.inputStock,
      user: this.props.user.uid
    }
    itemsRef.push(item);
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
          <Input type="text" id="inputStock" name="inputStock" placeholder="Stock Symbol" onChange={this.handleChange} value={this.state.inputStock} />
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
