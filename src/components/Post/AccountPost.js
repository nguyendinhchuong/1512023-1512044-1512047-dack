import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { decode } from '../../lib/tx'
import BlockchainAPI from '../../configs/BlockchainAPI'

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
        
        if(this.state.content){
            let time = new Date();            
            let tweet = {
                content:this.state.content
            }
            tweet.time = time.getDate().toString() + '/'+ time.getMonth().toString();
            this.props.onTweet(tweet);
            this.setState({content:''})
            this.refs.postbox.value=""
        }
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
            </div>
        )
    }
}

export default AccountPost