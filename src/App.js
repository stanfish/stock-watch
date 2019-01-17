import React, { Component } from 'react';
import './App.css';
import Party from './Party.js';
import Login from './login/Login.js';
class App extends Component {

  state = {
    user: null
  };

  handleUserChange = (user) => {
    this.setState({user});
  }
  
  render() {
    return (
      <div>
        <div className="app-header">
          <div className="app-wrapper">
            <span className="app-header-title">Fun Food Friends</span> 
            <Login onUserChange={this.handleUserChange}/>
          </div>
        </div>

        {this.state.user ? 
          <div>
            {this.state.user.displayName}
            <Party user={this.state.user} />
          </div>
          :
          <div className='app-wrapper'>
            <p>You must be logged in to see the potluck list and submit to it.</p>
          </div>
        } 
         
      </div>
    );
  }
}

export default App;
