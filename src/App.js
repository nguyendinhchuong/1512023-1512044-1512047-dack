import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Layout/Navbar';
import HomePage from './components/Page/HomePage';
import { BrowserRouter as Router, Route } from "react-router-dom";
import AccountPage from './components/Page/AccountPage';
class App extends Component {
  render() {
    return (
      <div className="body">
        <Router>
          <div>
            <Navbar />
            <Route exact path="/" component={HomePage} />
            <Route path="/user" component={AccountPage} />
          </div>
        </Router>

      </div>
    );
  }
}

export default App;