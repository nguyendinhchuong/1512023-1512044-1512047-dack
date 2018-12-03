import React from "react";
import { Link } from "react-router-dom"

class FollowBoxCard extends React.Component {
  render() {
    return (
        <div className="media">
                        <div className="media-left">
                            <img src="http://placehold.it/32x32" alt="demo" className="media-object img-circle" />
                        </div>
                        <div className="media-body">
                            <h4 className="media-heading">Nome e cognome</h4>
                            <Link to="/" className="btn btn-default btn-xs">
                                +
                  <span className="glyphicon glyphicon-user"></span> Follow
                </Link>
                        </div>
                    </div>
    );
  }
}

export default FollowBoxCard;
