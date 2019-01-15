import React, { Component } from 'react';
import './App.css';
import { auth, provider } from './firebase.js';
import Party from './Party.js';
class App extends Component {

  state = {user: null};

  logout = _ => {
    auth.signOut()
    .then(() => {
      this.setState({
        user: null
      });
    });
  }

  login = _ => {
    auth.signInWithPopup(provider) 
      .then((result) => {
        this.setState({
          user: result.user
        });
      });
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } 
    });
  }
  
  render() {
    return (
      <div className='app'>
        <header>
            <div className="wrapper">
              <h1>Fun Food Friends</h1> 
              {this.state.user ?
                <button onClick={this.logout}>Log Out</button>                
                :
                <button onClick={this.login}>Log In</button>              
              }
            </div>
        </header>

        {this.state.user ? 
          <div>
            {this.state.user.displayName}
            <Party user={this.state.user} />
          </div>
          :
          <div className='wrapper'>
            <p>You must be logged in to see the potluck list and submit to it.</p>
          </div>
        } 
         
      </div>
    );
  }
}

export default App;
