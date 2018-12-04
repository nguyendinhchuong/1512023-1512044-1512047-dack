import React, {Fragment} from "react";
import { Link } from "react-router-dom"

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

    render() {

        return (
            <div className="media">
                <div className="media-left">
                    <img src="http://placehold.it/32x32" alt="demo" className="media-object img-circle" />
                </div>
                <div className="media-body">
                    <h4 className="media-heading">Nome e cognome</h4>
                    <a className="btn btn-default btn-xs" onClick={_ => this.setState(prevState => ({ isFollowed: !prevState.isFollowed }))}>
                        {this.renderFollow()}
                    </a>
                </div>
            </div>
        );
  }
}

export default FollowBoxCard;
