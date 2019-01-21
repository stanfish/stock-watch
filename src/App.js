import React, { Component } from 'react';
import './App.css';
import Party from './Party.js';
import Login from './login/Login.js';
import { connect } from 'react-redux';

class App extends Component {
  
  render() {
    return (
      <div>
        <div className="app-header">
          <div className="app-wrapper">
            <span className="app-header-title">Fun Food Friends</span> 
            <Login />
          </div>
        </div>

        {this.props.user ? 
          <div>
            {this.props.user.displayName}
            <Party />
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

export default connect(
  mapStateToProps
)(App);
