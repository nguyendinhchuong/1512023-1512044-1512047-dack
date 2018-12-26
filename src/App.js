import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import './App.css';
import Navbar from './components/Layout/Navbar';

import HomePage from './containers/HomePage/HomePage';
import AccountPage from './containers/HomePage/AccountPage'
import ErrorPage from './containers/HomePage/ErrorPage';
import ExchangePage from './components/ExchagePage/ExchangePage';
import CreateAccountPage from './components/CreateAccountPage/CreateAccountPage';
import SignInPage from './components/SignInPage/SignInPage';

import AuthenticationService from './services/auth.service';
import HistoryPage from './components/HistoryPage/HistoryPage';
import HistoryDetailPage from './components/HistoryPage/HistoryDetailPage';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={(props) => (
      new AuthenticationService().isAuthenticated ? <Fragment> <Navbar /> <Component {...props} /> </Fragment> : <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
    )} />
  );
};

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="body">
          <Switch>
            <Route path="/signin" component={SignInPage} />
            <PrivateRoute exact path="/" component={HomePage} />
            <PrivateRoute path="/user" component={AccountPage} />
            <PrivateRoute path="/exchange" component={ExchangePage} />
            <PrivateRoute path="/createaccount" component={CreateAccountPage} />
            <PrivateRoute path="/history" component={HistoryPage} />
            <PrivateRoute path="/hash/:hashid" component={HistoryDetailPage} />
            <Route component={ErrorPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;