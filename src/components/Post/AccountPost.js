import React, { Component } from 'react'
import { connect } from 'react-redux'
import Axios from 'axios'
import BlockchainAPI from '../../configs/BlockchainAPI'
import { postTweet } from '../../actions/tweetActions'
import { encode, sign, decode } from '../../lib/tx'
import vstruct from 'varstruct';
import PostList from '../../components/Post/PostList'



class AccountPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
        }
    }


    onHandleChange = (e) => {
        this.setState({
            content: e.target.value
        })
    }
    onHandleSubmit = (e) => {
        e.preventDefault();
        let tweet = {
            content: this.state.content
        }
        let time = new Date();
        tweet.time = time.getDate().toString() + '/' + time.getMonth().toString();
        if (this.state.content) {
            // let time = new Date();
            // let tweet = {
            //     content: this.state.content
            // }
            // tweet.time = time.getDate().toString() + '/' + time.getMonth().toString();
            const PlainTextContent = vstruct([
                { name: 'type', type: vstruct.UInt8 },
                { name: 'text', type: vstruct.VarString(vstruct.UInt16BE) },
            ]);
            const _PlainTextContent = PlainTextContent.encode({ type: 1, text: this.state.content });
            if (this.state.content) {
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
                    }).then(res => {
                        console.log(res);
                    })
            }

        }
        this.props.postTweet(tweet);
        this.setState({ content: '' })
        this.refs.postbox.value = ""
        return
    }
    render() {
        return (
            <div className="">
                <textarea name="accountPost"
                    className="form-control"
                    onChange={this.onHandleChange}
                    placeholder="Write your post here"
                    row={5}
                    ref='postbox' />
                <button className="btn btn-primary tweet right-side" onClick={this.onHandleSubmit}>Post</button>
                <PostList></PostList>
            </div>
        )
    }
}

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
export default connect(mapStateToProps, mapDispatchToProps)(AccountPost);