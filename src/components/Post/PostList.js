import React, { Component } from 'react';
import { connect } from 'react-redux'
import PostItem from './PostItem'
import { decode } from '../../lib/tx'


import { fetchTweets } from '../../actions/tweetActions'
import { getUserCreation } from '../../actions/userActions'
import Axios from 'axios';
import BlockchainAPI from '../../configs/BlockchainAPI';
class PostList extends Component {
    constructor() {
        super();
        this.state = {
            maxHeight: 1
        }
    }
    componentDidMount = () => {

        Axios.get(BlockchainAPI.baseRoute +
            "/block?height=" + this.state.maxHeight
        ).then(res => {
            if (res.data.error === undefined) {
                if (res.data.result.block.data.txs !== null) {
                    const raw = res.data.result.block.data.txs[0];
                    const buf = Buffer.from(raw, 'base64');
                    const post = decode(buf);
                    console.log(post)
                    if (post.operation === 'post') {
                        post.params.content = Buffer.from(post.params.content, 'utf-8').toString();
                        this.props.fetchTweets(post);
                    }

                }
            }
            this.setState({ maxHeight: this.state.maxHeight + 1 })
        })

    }

    render() {
        return (
            <div>
                <div className="panel-body">
                    {
                        this.props.tweets.reverse().map((tweet, index) => <PostItem user={this.props.user} tweet={tweet} key={index} />)
                    }
                </div>
            </div>
        );
    }

};

const mapStateToProps = (state) => {
    return {
        user: state.userReducer,
        tweets: state.tweetReducer.tweets
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchTweets: (data) => {
            dispatch(fetchTweets(data))
        }
    }
}
export default connect(mapStateToProps)(PostList);