import React, { Component } from 'react'

import UserInfo from '../../components/Layout/UserInfo';
import FollowBox from '../../components/Layout/FollowBox';
import PostBox from '../../components/Post/PostBox';
import PostList from '../../components/Post/PostList';

import BlockchainRequest from '../../services/request.service';

class HomePage extends Component {
    componentDidMount = async () => {
        await BlockchainRequest.getLatestSequence();

        BlockchainRequest.makeFollowing('GC26I5WNQ5HYNYDIPPAOSX5W7FSJRYRLEFQF56V7MX4TFDHHEZDK7KZW');
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
        )
    }
}

export default HomePage