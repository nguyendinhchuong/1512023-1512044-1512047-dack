import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import Navbar from './components/Layout/Navbar';


import HomePage from './containers/HomePage/HomePage';
import AccountPage from './containers/HomePage/AccountPage'
import ErrorPage from './containers/HomePage/ErrorPage';


class App extends Component {
  render() {
    return (

      <BrowserRouter>
        <div className="body">
          <Navbar />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/user" component={AccountPage} />
            <Route component={ErrorPage} />
          </Switch>
        </div>
      </BrowserRouter>

    );
  }
}

export default App;