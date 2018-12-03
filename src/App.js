import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Layout/Navbar';
import HomePage from './components/Page/HomePage';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AccountPage from './components/Page/AccountPage';
import ErrorPage from './components/Page/ErrorPage';


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