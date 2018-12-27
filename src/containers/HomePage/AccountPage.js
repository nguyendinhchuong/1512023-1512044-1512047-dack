import React, { Component } from 'react';
import { Route, Switch, Link } from "react-router-dom";
import { connect } from 'react-redux'
import { encode, sign } from '../../lib/tx'
import vstruct from 'varstruct';

import UserInfo from '../../components/Layout/UserInfo';

import FollowBox from '../../components/Layout/FollowBox';
import EditUser from '../../components/AccountPage/EditUser';
import Followers from '../../components/AccountPage/Followers';
import Following from '../../components/AccountPage/Following';
import FollowingBox from '../../components/Layout/Following';
import AccountPost from '../../components/Post/AccountPost';
import PostList from '../../components/Post/PostList'


import { postTweet } from '../../actions/tweetActions'
import Axios from 'axios';
import BlockchainAPI from '../../configs/BlockchainAPI';
class AccountPage extends Component {


    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-3">
                            <UserInfo />
                        </div>
                        <div className="col-sm-6">
                            <div>
                                <Switch>
                                    <Route exact path="/account/:key" component={AccountPost} />
                                    <Route exact path="/user/followers" component={Followers} />
                                    <Route exact path="/user/following" component={Following} />
                                    <Route exact path="/user/info" component={EditUser} />
                                </Switch>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <FollowBox />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

};


export default AccountPage;