import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import ChangeProfilePage from './containers/HomePage/AccountProfile'
// eslint-disable-next-line


const App = () => (
  <Router>
    <div>
     <Route path="/" exact component={ChangeProfilePage} />
      <Route path="/account" component={ChangeProfilePage} />
    </div>
  </Router>
);

export default App;