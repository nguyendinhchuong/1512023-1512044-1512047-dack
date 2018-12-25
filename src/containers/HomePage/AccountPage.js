import React from 'react';
import { Route, Switch } from "react-router-dom";

import UserInfo from '../../components/Layout/UserInfo';
//import Trends from '../../components/Layout/Trends';
import FollowBox from '../../components/Layout/FollowBox';
import EditUser from '../../components/AccountPage/EditUser';
import Followers from '../../components/AccountPage/Followers';
import Following from '../../components/AccountPage/Following';

import FollowingBox from '../../components/Layout/Following'
const AccountPage = () => {
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-sm-3">
                        <UserInfo />
                        <FollowingBox />
                    </div>
                    <div className="col-sm-6">
                        <div>
                            <Switch>
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
};

export default AccountPage;