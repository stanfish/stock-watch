import React, { Component } from 'react';
import firebase from './firebase.js';
import './Party.css';

class Party extends Component {

  state = {
    inputItem: '',
    inputUser: this.props.user && this.props.user.displayName,
    items: [],
    user: this.props.user
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const itemsRef = firebase.database().ref('items');
    const item = {
      name: this.state.inputItem,
      user: this.state.inputUser,
      created_by: this.state.user.uid
    }
    itemsRef.push(item);
    this.setState({
      inputItem: '',
      inputUser: this.state.user.displayName
    });
  }

  removeItem = itemId => {
    const itemRef = firebase.database().ref(`/items/${itemId}`);
    itemRef.remove();
  }

  componentDidMount() {
    const itemsRef = firebase.database().ref('items');

    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newItem = [];
      for (let item in items) {
        newItem.push({
          id: item,
          name: items[item].name,
          user: items[item].user,
          created_by: items[item].created_by
        });
      }
      this.setState({
        items: newItem
      });
    });
  }
  
  render() {
    return (
        <div className='container'>
          <section className='add-item'>
                <form onSubmit={this.handleSubmit}>
                  <input type="text" name="inputUser" placeholder="What's your name?" onChange={this.handleChange} value={this.state.inputUser} />
                  <input type="text" name="inputItem" placeholder="What are you bringing?" onChange={this.handleChange} value={this.state.inputItem} />
                  <button>Add Item</button>
                </form>
          </section>
          <section className='display-item'>
              <div className="wrapper">
                <ul>
                  {this.state.items && this.state.items.map((item) => {
                    return (
                      <li key={item.id}>
                        <h3>{item.name}</h3>
                        <p>brought by: {item.user}
                          {item.created_by === this.state.user.uid?
                            <button onClick={() => this.removeItem(item.id)}>Remove</button> : null}
                        </p>
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

export default Party;