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
            time: ''
        }
    }
    

    onHandleChange = (e) => {
        console.log(e.target.value)
        this.setState({
            content: e.target.value
        })
    }
    onHandleSubmit = (e) => {      
        e.preventDefault();
        let time = Date.now();
        this.setState({ time: time }, () => { this.props.onTweet(this.state) });
        this.refs.postbox.value=""
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