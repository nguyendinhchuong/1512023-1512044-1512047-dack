import React, { Component } from 'react';
import axios from 'axios';
import vstruct from 'varstruct';
import { decode } from '../../../lib/tx';

import UserInfo from '../../../components/Layout/UserInfo';
import { connect } from 'react-redux';
import queryString from 'querystring';
import FollowCard from '../../../components/FollowCard/FollowCar';
import BlockchainAPI from '../../../configs/BlockchainAPI';

const PostParams = vstruct([
  { name: 'content', type: vstruct.VarBuffer(vstruct.UInt16BE) },
  { name: 'keys', type: vstruct.VarArray(vstruct.UInt8, vstruct.Buffer(42)) },
]);

const PlainTextContent = vstruct([
  { name: 'type', type: vstruct.UInt8 },
  { name: 'text', type: vstruct.VarString(vstruct.UInt16BE) },
]);

class SearchPage extends Component {
    state = {
        user: null,
        posts: []
    }

    parseQueryString = query => {
        let temp = query.substring(1);
        return { [temp.split('=')[0]]: temp.split('=')[1] };
    }

    search = async value => {
        const { data: { result: { total_count } } } = await axios.get(`${BlockchainAPI.baseRoute}/tx_search?query="account=%27${value}%27"`);
        if (total_count > 0) {
            this.setState({ user: value });
        }

        let posts = [];
        for (let publicKey of BlockchainAPI.users) {
            const { data: { result } } = await axios.get(`${BlockchainAPI.baseRoute}/tx_search?query="account=%27${publicKey}%27"`);
            for (let i = result.txs.length - 1; i >= 0; i--) {
                let decResult = decode(Buffer.from(result.txs[i].tx, 'base64'));
                if (decResult.operation === 'post') {
                    console.log(decResult);
                    try {
                        let temp = PlainTextContent.decode(decResult.params.content);
                        if (temp.text.toLowerCase().indexOf(value.toLowerCase()) !== -1) posts.push({
                            user: publicKey,
                            content: temp.text
                        });
                    } catch (e) {
                        console.log(e);
                    }
                }
            }
        }
        this.setState({ posts });
    }

    componentDidMount = () => {
        this.search(this.parseQueryString(this.props.location.search).query);
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (this.props.location.search !== prevProps.location.search) {
            this.search(this.parseQueryString(this.props.location.search).query);
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
                        <div className="col-sm-9">
                            <div className="panel panel-default panel-custom trends">
                                <div className="panel-heading">
                                    <h3 className="panel-title">
                                        User result:
                                    </h3>
                                </div>
                                <div className="panel-body">
                                    {this.state.user ? (<FollowCard
                                        key={this.state.user}
                                        publicKey={this.state.user}
                                        addFollowing={this.props.addFollowing}
                                        removeFollowing={this.props.removeFollowing}
                                        isFollowed={this.props.followings.indexOf(this.state.user) !== -1}
                                        peopleFollowing={this.props.followings} />) : "No results :'("}
                                  
                                </div>
                                <div className="panel-heading">
                                    <h3 className="panel-title">
                                        Post result:
                                    </h3>
                                </div>
                                <div className="panel-body">
                                    {this.state.posts.map((post, index) => (
                                        <div style={{ padding: '10px' }} key={index}>
                                            <h5 style={{overflow: 'hidden'}}>{post.user}</h5>
                                            <p>{post.content}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        follow: state.followReducer.followings,
        followings: state.followReducer.followings
    }
}

const mapDispatchToProps = dispatch => ({
    addFollowing: publicKey => dispatch({ type: 'ADD_FOLLOWING', payload: publicKey }),
    removeFollowing: publicKey => dispatch({ type: 'REMOVE_FOLLOWING', payload: publicKey })
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);