import React, { Component } from 'react'

class PostItem extends Component {
    render() {
        return (
            <div className="media">
                    <a className="media-left" href="#fake">
                        <img alt="demo" className="media-object img-circle" src="http://placehold.it/64x64" />
                    </a>
                    <div className="media-body">
                        <h4 className="media-heading">Media heading</h4>
                        <p>Dolorem aspernatur rerum, iure? Culpa iste aperiam sequi, fuga, quasi rerum, eum, quo natus
                  tenetur officia placeat.</p>
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
export default PostItem