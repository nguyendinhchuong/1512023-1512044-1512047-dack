import React, { Component } from 'react';
import { connect } from 'react-redux'
import PostItem from './PostItem'
import { decode } from '../../lib/tx'

import InfiniteScroll from 'react-infinite-scroller';
import { fetchTweets } from '../../actions/tweetActions'
import Axios from 'axios';
import BlockchainAPI from '../../configs/BlockchainAPI';
class PostList extends Component {
    constructor() {
        super();
        this.state = {
            timeLine: [],
            hasMoreItems: true,
            maxPages: 2,
            minPages: -1
        }
    }
    loadItems = () => {
        let publicKey = localStorage.getItem('publicKey')
        let tweets = []
        let { timeLine, minPages, maxPages } = this.state
        Axios.get(BlockchainAPI.baseRoute + '/tx_search?query=%22account=%27' + publicKey + '%27%22')
            .then(res => {
                let txs = res.data.result.txs
                txs.map((block, index) => {
                    let txDec = Buffer.from(block.tx, 'base64')
                    let decResult = decode(txDec)
                    if (index < maxPages && index > minPages) {
                        console.log('min - ' + minPages)
                        console.log('max - ' + maxPages)
                        console.log('index - ' + index)
                        if (decResult.account === publicKey) {
                            switch (decResult.operation) {
                                case 'create_account':
                                    let createAccountMess = publicKey + ' da tao tai khoan ' + decResult.params.address
                                    timeLine.push(createAccountMess)
                                    break;
                                case 'payment':
                                    let paymentMess = publicKey + ' da chuyen ' + decResult.params.amount + ' CEL cho ' + decResult.params.address
                                    timeLine.push(paymentMess)
                                    break;
                                case 'update_account':
                                    if (decResult.params.key === 'name') {
                                        let updateMess = decResult.account + ' da doi ten thanh ' + decResult.params.value.toString('utf-8')
                                        timeLine.push(updateMess)
                                    } else if (decResult.params.key === 'picture') {
                                        let updateMess = decResult.account + ' da cap nhat anh dai dien '
                                        timeLine.push(updateMess)
                                    } else if (decResult.params.key === 'followings') {
                                        let updateMess = decResult.account + ' bat dau theo doi'
                                        timeLine.push(updateMess)
                                    }
                                    break;
                                case 'post':
                                    let content = Buffer.from(decResult.params.content, 'utf-8').toString();
                                    tweets.push(content)
                                    this.props.fetchTweets(tweets);
                                    timeLine.push(content)
                                    break

                                default:
                                    break;
                            }
                        } else {
                            switch (decResult.operation) {
                                case 'create_account':
                                    let createAccountMess = decResult.account + ' da tao tai khoan cho ' + decResult.params.address
                                    timeLine.push(createAccountMess)
                                    break;
                                case 'payment':
                                    let paymentMess = decResult.account + ' da chuyen ' + decResult.params.amount + ' CEL cho ' + decResult.params.address
                                    timeLine.push(paymentMess)
                                    break;

                                default:
                                    break;
                            }
                        }

                    }
                })
                if ((maxPages + 2) > txs.length) {
                    maxPages = txs.length
                    this.setState({
                        timeLine: timeLine,
                        minPages: maxPages - 1,
                        maxPages: maxPages,
                        hasMoreItems: false
                    })
                } else {
                    this.setState({
                        timeLine: timeLine,
                        minPages: maxPages - 1,
                        maxPages: maxPages + 2,
                    })
                }
            })
    }

    render() {
        const { timeLine, hasMoreItems } = this.state
        var items = []
        
        timeLine.map((tweet, index) => {
            return (
                items.push(<PostItem user={this.props.user} tweet={tweet} key={index} />)
            )
        })
        return (
            <div>
                <div className="panel-body">

                    <InfiniteScroll
                        pageStart={0}
                        loadMore={this.loadItems}
                        hasMore={hasMoreItems}
                        loader={<div className="loader" key={0}>Loading ...</div>}
                    >
                        <div>
                            {items}
                        </div>
                    </InfiniteScroll>
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
export default connect(mapStateToProps, mapDispatchToProps)(PostList);