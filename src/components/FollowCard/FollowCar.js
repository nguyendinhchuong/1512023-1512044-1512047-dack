import React from "react";


class FollowCard extends React.Component {
  render() {
    return (
        <div class="panel panel-default follow-card">
            <img className="img-responsive" alt="demo" src={this.props.followers.profilePhoto} />
            <div class="panel-body text-center">
                <p>{this.props.followers.name}</p>
                <button className="btn btn-info"><i class="fa fa-plus"></i> Follow</button>
            </div>
        </div>
    );
  }
}

export default FollowCard;
