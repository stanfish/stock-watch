import React, { Component } from 'react';
import './App.css';
import { auth, googleProvider, facebookProvider } from './firebase.js';
import Party from './Party.js';
class App extends Component {

  state = {
    user: null, 
    loginProvider: null,
    email: '', 
    password: '',
    errorMessage: ''
  };

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


  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(this.state.email, this.state.password).catch(error => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      this.setState({errorMessage});
      console.log(errorCode, " Login error ", errorMessage);
    });

  }

  signUp = _ => {
    auth.createUserWithEmailAndPassword(this.state.email, this.state.password).catch(error => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      this.setState({errorMessage});
      console.log(errorCode, " Sign up error ", errorMessage);
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
              <span className="header-title">Fun Food Friends</span> 
              {this.state.user ?
                <button className="login-section" onClick={this.logout}>Log Out</button>                
                :
                <span className="login-section" style={{width:"250px"}}>
                  <form className="email-login" onSubmit={this.handleSubmit}>
                    <input type="text" name="email" placeholder="What's your email?" onChange={this.handleChange} value={this.state.email} />
                    <input type="password" name="password" onChange={this.handleChange} value={this.state.password} />
                    <button style={{display:"none"}}></button>
                  </form>
                  <span style={{display:"table"}}>
                    <span style={{display:"table-cell"}}><button onClick={this.handleSubmit}>Login</button></span>&nbsp; 
                    <span style={{display:"table-cell"}}><button onClick={this.signUp}>Sign up</button></span>
                  </span>
                  {this.state.errorMessage}
                   <br />
                  <button id="googleLogin" onClick={this.login}>Google Log In</button>&nbsp;         
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
