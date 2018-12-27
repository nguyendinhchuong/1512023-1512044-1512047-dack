import React from 'react';
import { connect } from 'react-redux'
import FollowCard from '../FollowCard/FollowCar'
import FollowBox from '../Layout/FollowBox';
import UserInfo from '../Layout/UserInfo';

class Followers extends React.Component {
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-3">
                            <UserInfo />
                        </div>
                        <div className="col-sm-6">
                            <div className="panel panel-default panel-custom user-info">
                                <div className="panel-heading">
                                    <h3 className="panel-title">
                                        Followers
                    </h3>
                                </div>
                                <div className="panel-body">
                                    <div className="media">
                                        <div className="follow">
                                            {
                                                this.props.follow.map((obj) => <FollowCard
                                                    key={obj}
                                                    publicKey={obj}
                                                    addFollowing={this.props.addFollowing}
                                                    removeFollowing={this.props.removeFollowing}
                                                    isFollowed={this.props.followings.indexOf(obj) !== -1}
                                                    peopleFollowing={this.props.followings} />)
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <FollowBox />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
};

const mapStateToProps = (state) => {
    return {
        follow: state.followReducer.followers,
        followings: state.followReducer.followings
    }
}

const mapDispatchToPros = dispatch => ({
    addFollowing: publicKey => dispatch({ type: 'ADD_FOLLOWING', payload: publicKey }),
    removeFollowing: publicKey => dispatch({ type: 'REMOVE_FOLLOWING', payload: publicKey })
});

export default connect(mapStateToProps, mapDispatchToPros)(Followers);