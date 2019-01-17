import React, { Component } from 'react';
import './App.css';
import { auth, googleProvider, facebookProvider } from './firebase.js';
import Party from './Party.js';
import { Input, Button, Icon } from 'semantic-ui-react';
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
      <div>
        <div className="app-header">
          <div className="app-wrapper">
            <span className="app-header-title">Fun Food Friends</span> 
            {this.state.user ?
              <Button className="app-login-section" onClick={this.logout}>Log Out</Button>                
              :
              <span className="app-login-section" style={{width:"250px"}}>
                <form className="app-email-login" onSubmit={this.handleSubmit}>
                  <Input type="text" name="email" placeholder="What's your email?" onChange={this.handleChange} value={this.state.email} />
                  <Input type="password" name="password" onChange={this.handleChange} value={this.state.password} />
                  <Button style={{display:"none"}}></Button>
                </form>
                <span style={{display:"table"}}>
                  <span style={{display:"table-cell"}}><Button primary onClick={this.handleSubmit}>Log in</Button></span>&nbsp; 
                  <span style={{display:"table-cell"}}><Button secondary onClick={this.signUp}>Sign up</Button></span>
                </span>
                {this.state.errorMessage}
                  <br />
                <Button color="google plus" id="googleLogin" onClick={this.login}><Icon name='google' />Log in with Google</Button>&nbsp;         
                <Button color="facebook" id="facebookLogin" onClick={this.login}><Icon name='facebook' />Log in with Facebook</Button>              
              </span>
            }
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
