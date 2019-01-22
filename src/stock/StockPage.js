import React, { Component } from 'react';
import { Input, Button, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import firebase from '../firebase.js';
import './StockPage.css';

class StockPage extends Component {

  state = {
    inputStock: '',
    items: [],
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
      this.setState({
        items: newItem
      });
    });
  }
  
  render() {
    return (
        <div className='stock-container'>
          <section className='stock-add-item'>
                <form onSubmit={this.handleSubmit}>
                  <Input type="text" name="inputStock" placeholder="Stock Symbol" onChange={this.handleChange} value={this.state.inputStock} />
                  <Button primary>Add Stock</Button>
                </form>
          </section>
          <section className='stock-display-item'>
              <div className="stock-wrapper">
                <ul>
                  {this.state.items && this.state.items.map((item) => {
                    return (
                      <li key={item.id}>
                        <h3>{item.stock}</h3>
                          {item.user === this.props.user.uid?
                            <span>
                              <Divider section />
                              <Button secondary onClick={() => this.removeItem(item.id)}>Remove</Button> 
                            </span>  
                            : null
                          }
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
  };
};

export default connect(
  mapStateToProps
)(StockPage);
