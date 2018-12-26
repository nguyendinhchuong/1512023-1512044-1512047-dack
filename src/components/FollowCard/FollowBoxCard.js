import React, { Fragment } from "react";

import Blockchain from '../../services/request.service';
class FollowBoxCard extends React.Component {
    renderFollow = () => {
        if (this.state.isFollowed)
            return (
                <Fragment>
                    <span className="glyphicon glyphicon-ok"></span> Following
                </Fragment>
            );
        else
            return (
                <Fragment>+<span className="glyphicon glyphicon-user"></span> Follow
                </Fragment>
            );
    }

    state = {   
        isFollowed: false
    }

    handleFollow = () => {
        this.setState(prevState => {
            let currentFollowings = this.props.peopleFollowing;
            if (!prevState.isFollowed) {
                this.props.addFollowing(this.props.publicKey);
                currentFollowings.push(this.props.publicKey);
            } else {
                this.props.removeFollowing(this.props.publicKey);
                currentFollowings = currentFollowings.filter(x => x !== this.props.publicKey);
            }

            Blockchain.makeFollowing(currentFollowings);
            return { isFollowed: !prevState.isFollowed };
        });
    }

    render() {

        return (
            <div className="media">
                <div className="media-left">
                    <img src="http://placehold.it/32x32" alt="demo" className="media-object img-circle" />
                </div>
                <div className="media-body">
                    <h4 className="media-heading">{this.props.publicKey}</h4>
                    <span className="btn btn-default btn-xs" onClick={this.handleFollow}>
                        {this.renderFollow()}
                    </span>
                </div>
            </div>
        );
    }
}

export default FollowBoxCard;
