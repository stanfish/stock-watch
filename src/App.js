import React, { Component } from 'react';
import './App.css';
import { auth, googleProvider, facebookProvider } from './firebase.js';
import Party from './Party.js';
class App extends Component {

  state = {user: null, loginProvider: null};

  logout = _ => {
    auth.signOut()
    .then(() => {
      this.setState({
        user: null
      });
    });
  }

  login = e => {
    let loginProvider = (e.target.id === 'googleLogin' ? googleProvider : (e.target.id === 'facebookLogin' ? facebookProvider : ''));
    if (loginProvider) {
      auth.signInWithPopup(loginProvider) 
        .then((result) => {
          this.setState({
            user: result.user
          });
        });
    }
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
                <span>
                  <button id="googleLogin" onClick={this.login}>Google Log In</button>              
                  <button id="facebookLogin" onClick={this.login}>Facebook Log In</button>              
                </span>
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
