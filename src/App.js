import React, { Component } from 'react';

import './App.css';
import Navbar from './components/HomePage/Navbar';
import HomePage from './components/Page/HomePage';

class App extends Component {
  render() {
    return (
      <div className="body">
        <Navbar />
        <HomePage />
      </div>
    );
  }
}

export default App;