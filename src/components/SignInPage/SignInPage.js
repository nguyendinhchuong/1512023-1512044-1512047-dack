import React, { Component } from 'react'

export default class SignInPage extends Component {
  render() {
    return (
      <div className="signin">
        <form className="input-group">
          <label htmlFor="signin">Please enter your secret key to sign in</label>
          <input type="text" className="form-control" aria-describedby="basic-addon2" />
          <button className="form-control" type="submit">Sign In</button>
        </form>
      </div>
    )
  }
}
