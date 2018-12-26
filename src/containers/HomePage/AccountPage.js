import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import { connect } from 'react-redux'
import { encode, sign } from '../../lib/tx'
import vstruct  from 'varstruct';

import UserInfo from '../../components/Layout/UserInfo';
import Trends from '../../components/Layout/Trends';
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

    handleTweet = (Tweet) => {
        this.props.postTweet(Tweet);
        const PlainTextContent = vstruct([
            { name: 'type', type: vstruct.UInt8 },
            { name: 'text', type: vstruct.VarString(vstruct.UInt16BE) },
        ]);
        const _PlainTextContent = PlainTextContent.encode({ type: 1, text: Tweet.content })
                
        if (Tweet.content) {
            let crawTx = {
                "version": 1,
                "account": this.props.user.account,
                "sequence": this.props.user.sequence + 1,
                "memo": Buffer.alloc(0),
                "operation": 'post',
                "params": {
                    "content": _PlainTextContent,
                    "keys": []
                },
            }
            let secretKey = localStorage.getItem('secretKey');
            sign(crawTx, secretKey);
            let encodedTx = encode(crawTx).toString('base64');
            Axios.post(BlockchainAPI.baseRoute,
                {
                    "method": "broadcast_tx_sync",
                    "jsonrpc": "2.0",
                    "params": [`${encodedTx}`],
                    "id": "dontcare"
                }).then(res=>{
                    console.log(res);
                })
        }
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
                                <AccountPost onTweet={this.handleTweet} />
                                <Switch>
                                    <Route exact path="/user/followers" component={Followers} />
                                    <Route exact path="/user/following" component={Following} />
                                    <Route exact path="/user/info" component={EditUser} />
                                </Switch>
                                <PostList></PostList>
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
        user: state.userReducer
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