import React, { Component } from 'react';
import { Input, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import firebase from '../firebase.js';
import './AddStock.css';
import { setStocks } from '../actions';


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
  };
};


const mapDispatchToProps = {
  setStocks
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddStock);
