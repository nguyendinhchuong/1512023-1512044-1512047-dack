import React from 'react';
import UserInfo from '../Layout/UserInfo';
import Trends from '../Layout/Trends';
import PostBox from '../HomePage/PostBox';
import PostList from '../HomePage/PostList';
import FollowBox from '../Layout/FollowBox';
const HomePage = () => {
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-sm-3">
                        <UserInfo />
                        <Trends />
                    </div>
                    <div className="col-sm-6">
                        <div className="panel panel-info">
                            <PostBox />
                            <PostList />
                        </div>
                        <br />
                        <br />
                        <br />
                    </div>
                    <div className="col-sm-3">
                        <FollowBox />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;