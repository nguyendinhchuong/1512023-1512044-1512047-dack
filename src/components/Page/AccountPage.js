import React from 'react';
import UserInfo from '../Layout/UserInfo';
import Trends from '../Layout/Trends';
import FollowBox from '../Layout/FollowBox';
import EditUser from '../AccountPage/EditUser';
import { Route, Switch } from "react-router-dom";
import Followers from '../AccountPage/Followers';
import Following from '../AccountPage/Following';
const AccountPage = () => {
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-sm-3">
                        <UserInfo />
                        <Trends />
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