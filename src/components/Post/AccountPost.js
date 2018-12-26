import React, { Component } from 'react'
import { connect } from 'react-redux'

class AccountPost extends Component {
    constructor() {
        super();
        this.state = {
            content: '',
            time:''
        }
    }
    onHandleChange = (e) => {
        console.log(e.target.value)
        this.setState({
            content: e.target.value
        })
    }
    onHandleSubmit = ()=>{
        let tweet = {};
        let time = Date.now();
        this.setState({time:time});
        tweet = this.state;
        this.props.Tweet(tweet);
    }
    render() {
        return (
            <div className="">
                <textarea name="accountPost"
                    className="form-control"
                    onChange={this.onHandleChange}
                    placeholder="Write your post here"
                    row={5} />
                <button className="btn btn-primary tweet right-side" onClick={this.onHandleSubmit}>Post</button>
            </div>
        )
    }
}

export default AccountPost