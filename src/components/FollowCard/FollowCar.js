import React from "react";


class FollowCard extends React.Component {
  render() {
    return (
        <div class="panel panel-default follow-card">
            <img className="img-responsive" alt="demo" src="http://placehold.it/300x200" />
            <div class="panel-body text-center">
                <p>Follower Name 1</p>
                <button className="btn btn-info"><i class="fa fa-plus"></i> Follow</button>
            </div>
        </div>
    );
  }
}

export default FollowCard;
