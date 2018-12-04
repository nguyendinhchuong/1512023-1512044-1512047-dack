import React, { Component } from 'react'

class PostItem extends Component {
    render() {
        return (
            <div className="media">
                    <a className="media-left" href="#fake">
                        <img alt="demo" className="media-object img-circle" src="http://placehold.it/64x64" />
                    </a>
                    <div className="media-body">
                        <h4 className="media-heading">{this.props.tweet.heading}</h4>
                        <p>{this.props.tweet.mgs}</p>
                        <ul className="nav nav-pills nav-pills-custom">
                            <li><a href="/"><span className="glyphicon glyphicon-heart" /></a></li>
                            <li><a href="/"><span className="glyphicon glyphicon-comment" /></a></li>
                            <li><a href="/"><span className="glyphicon glyphicon-share-alt" /></a></li>
                        </ul>
                    </div>
            </div>
        )
    }
}


export default PostItem;