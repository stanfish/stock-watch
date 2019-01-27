import React, { Component } from 'react';
import './App.css';
import StockPage from './stock/StockPage.js';
import Login from './login/Login.js';
import { connect } from 'react-redux';
import { setUser } from './actions';

class App extends Component {
  
  handleUserChange = (user) => {
    this.props.setUser(user);
  }

  render() {
    return (
      <div>
        <div className="app-header">
          <div className="app-wrapper">
            <span className="app-header-title">Stock Check</span> 
            <Login onUserChange={this.handleUserChange}/>
          </div>
        </div>

        {this.props.user ? 
          <div>
            <StockPage />
          </div>
          :
          <div className='app-wrapper'>
            <p>You must be logged in to see the stock list.</p>
          </div>
        } 
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { 
    user: state.user,
  };
};

const mapDispatchToProps = {
  setUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
