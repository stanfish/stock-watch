import React, { Component } from 'react';
import firebase from './firebase.js';
import './Party.css';
import { Input, Button, Divider } from 'semantic-ui-react';

class Party extends Component {

  state = {
    inputItem: '',
    inputUser: this.props.user && (this.props.user.displayName || this.props.user.email),
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
    if (!this.state.inputItem || !this.state.inputUser) {
      return;
    }

    const itemsRef = firebase.database().ref('items');
    const item = {
      name: this.state.inputItem,
      user: this.state.inputUser,
      created_by: this.state.user.uid
    }
    itemsRef.push(item);
    this.setState({
      inputItem: '',
      inputUser: this.state.user.displayName || this.props.user.email
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
        <div className='party-container'>
          <section className='party-add-item'>
                <form onSubmit={this.handleSubmit}>
                  <Input type="text" name="inputUser" placeholder="What's your name?" onChange={this.handleChange} value={this.state.inputUser} />
                  <Input type="text" name="inputItem" placeholder="What are you bringing?" onChange={this.handleChange} value={this.state.inputItem} />
                  <Button primary>Add Item</Button>
                </form>
          </section>
          <section className='party-display-item'>
              <div className="party-wrapper">
                <ul>
                  {this.state.items && this.state.items.map((item) => {
                    return (
                      <li key={item.id}>
                        <h3>{item.name}</h3>
                        <p>brought by: {item.user} 
                          {item.created_by === this.state.user.uid?
                            <span>
                              <Divider section />
                              <Button secondary onClick={() => this.removeItem(item.id)}>Remove</Button> 
                            </span>  
                            : null
                          }
                            
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