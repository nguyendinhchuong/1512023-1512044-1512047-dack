import React, { Component } from 'react'

const isLovedStyle = {
    color: 'crimson'
}

const heartIconStyle = {
    cursor: 'pointer'
}

class PostItem extends Component {
    state = {
        isLoved: false
    }

    render() {
        return (
            <div className="media">
                <a className="media-left" href="#fake">
                    <img alt="demo" className="media-object img-circle" src="http://placehold.it/64x64" />
                </a>
                <div className="media-body">
                    <h4 className="media-heading">{this.props.tweet.heading}</h4>
                    <p>{this.props.tweet.msg}</p>
                    <ul className="nav nav-pills nav-pills-custom">
                        <li><span onClick={_ => this.setState(prevState => ({ isLoved: !prevState.isLoved }))}><span className="glyphicon glyphicon-heart" style={{ ...heartIconStyle, ...(this.state.isLoved ? isLovedStyle : {}) }} /></span></li>
                    </ul>
                </div>
            </div>
        )
    }
}


export default PostItem;