import React, { Component } from 'react'
import { connect } from 'react-redux';

import UserInfo from '../../components/Layout/UserInfo';
import FollowBox from '../../components/Layout/FollowBox';
import PostBox from '../../components/Post/PostBox';
import PostList from '../../components/Post/PostList';

import Blockchain from '../../services/request.service';

class HomePage extends Component {
    componentDidMount = async () => {
        await Blockchain.getLatestSequence();

        // Blockchain.makeFollowing('a');
        this.props.setFollowingList(Blockchain.fetchFollowings());
        this.props.setFollowerList(Blockchain.fetchFollowers());
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

const mapDispatchToProps = dispatch => ({
    setFollowingList: list => dispatch({ type: 'FETCH_FOLLOWING_LIST', payload: list }),
    setFollowerList: list => dispatch({ type: 'FETCH_FOLLOWER_LIST', payload: list })
});

export default connect(null, mapDispatchToProps)(HomePage);