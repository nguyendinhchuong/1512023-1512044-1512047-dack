import React, { Fragment } from "react";

import Blockchain from '../../services/request.service';


class FollowCard extends React.Component {
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
        isFollowed: this.props.isFollowed
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
        <div className="panel panel-default follow-card">
            <img className="img-responsive" alt="demo" src={null} />
            <div className="panel-body text-center">
                <p style={{overflow: 'hidden'}}>{this.props.publicKey}</p>
                <span className="btn btn-default btn-xs" onClick={this.handleFollow}>{this.renderFollow()}</span>
            </div>
        </div>
    );
  }
}

export default FollowCard;
