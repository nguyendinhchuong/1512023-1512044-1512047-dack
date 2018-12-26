import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import {connect} from 'react-redux'

import UserInfo from '../../components/Layout/UserInfo';
import Trends from '../../components/Layout/Trends';
import FollowBox from '../../components/Layout/FollowBox';
import EditUser from '../../components/AccountPage/EditUser';
import Followers from '../../components/AccountPage/Followers';
import Following from '../../components/AccountPage/Following';
import FollowingBox from '../../components/Layout/Following';
import AccountPost from '../../components/Post/AccountPost';


import {postTweet } from '../../actions/userActions'
class AccountPage extends Component {
    
    handleTweet = (Tweet) => {
        this.props.postTweet(Tweet);
    }
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
                                <AccountPost Tweet={this.props.handleTweet}></AccountPost>
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
    }

};

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        postTweet: (data) => {
            dispatch(postTweet(data))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);