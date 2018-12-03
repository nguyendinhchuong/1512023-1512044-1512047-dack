import React, { Component } from 'react'

class PostBox extends Component {
    render() {
        return (
            <div>
                <div className="panel-heading postbox">
                    <div className="media">
                        <a className="media-left" href="#fake">
                            <img alt="demo" className="media-object img-circle" src="http://placehold.it/35x35" />
                        </a>
                        <div className="media-body">
                            <div className="form-group has-feedback">
                                <label className="control-label sr-only" htmlFor="inputSuccess5">Hidden label</label>
                                <input type="text" className="form-control" id="search2" aria-describedby="search" />
                                <span className="glyphicon glyphicon-camera form-control-feedback" aria-hidden="true" />
                                <span id="search2" className="sr-only">(success)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default PostBox