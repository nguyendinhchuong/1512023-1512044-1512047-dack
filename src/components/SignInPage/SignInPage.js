import React, { Component } from 'react'
import { Keypair } from 'stellar-base';
import { Redirect } from 'react-router-dom';

import AuthenticationService from '../../services/auth.service';

export default class SignInPage extends Component {
  constructor(props) {
    super(props);
    this.authenticationService = new AuthenticationService();
  }

  state = {
    shouldRedirectToHomePage: false,
    secretKey: '',
    publicKey: ''
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleLogin = (e) => {
    e.preventDefault();

    try {
    const key = Keypair.fromSecret(this.state.secretKey);
    localStorage.setItem('secretKey', this.state.secretKey);
    let pKey = key.publicKey();
    this.setState({
      publicKey: pKey
    }, () => {
      this.authenticationService.login({
        publicKey: this.state.publicKey
      }, (noError) => {
        if (!noError) {
          alert('Account does not exist!');
        } else {
          this.setState({
            shouldRedirectToHomePage: true
          });
        }
      });
    })
    } catch (e) {
      alert('Invalid secret key');
    }

  }

  render() {
    const { shouldRedirectToHomePage } = this.state;
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    if (shouldRedirectToHomePage) {
      return <Redirect to={from} />
    }
    return (
      <div className="signin">
        <form className="input-group" onSubmit={this.handleLogin}>
          <label htmlFor="signin">Please enter your secret key to sign in</label>
          <input type="text" className="form-control" aria-describedby="basic-addon2" name="secretKey" onChange={this.handleChange} />
          <button className="form-control" type="submit">Sign In</button>
        </form>
      </div>
    )
  }
}
