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
import SearchPage from './containers/HomePage/SearchPage/SearchPage';
import HistoryDetailPage from './components/HistoryPage/HistoryDetailPage';
import Followers from './components/AccountPage/Followers';
import Following from './components/AccountPage/Following';
import EditUser from './components/AccountPage/EditUser';

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
            <PrivateRoute path="/account" component={AccountPage} />
            <PrivateRoute path="/exchange" component={ExchangePage} />
            <PrivateRoute path="/createaccount" component={CreateAccountPage} />
            <PrivateRoute path="/history" component={HistoryPage} />
            <PrivateRoute path="/search" component={SearchPage} />
            <PrivateRoute path="/hash/:hashid" component={HistoryDetailPage} />
            <PrivateRoute path="/followers" component={Followers} />
            <PrivateRoute path="/following" component={Following} />
            <PrivateRoute path="/edit" component={EditUser} />
            <Route component={ErrorPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;