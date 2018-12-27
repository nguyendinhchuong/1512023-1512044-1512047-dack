import React from 'react';
import { connect } from 'react-redux'
import FollowCard from '../FollowCard/FollowCar'
class  Following extends React.Component {
    render() {
            return (
        <div>
            <div className="panel panel-default panel-custom user-info">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        Followings
            </h3>
                </div>
                <div className="panel-body">
                    <div className="media">
                        <div className="row">
                            <div className="col-xs-12 follow">
                                {
                                            this.props.follow.map((obj) => <FollowCard
                                                key={obj}
                                                publicKey={obj}
                                                addFollowing={this.props.addFollowing}
                                                removeFollowing={this.props.removeFollowing}
                                                isFollowed={this.props.followings.indexOf(obj) !== -1}
                                                peopleFollowing={this.props.followings}/>)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br></br>
            <br></br>
        </div>
    );
    }
};

const mapStateToProps = (state) => {
    return {
        follow: state.followReducer.followings,
        followings: state.followReducer.followings
    }
}

const mapDispatchToProps = dispatch => ({
    addFollowing: publicKey => dispatch({ type: 'ADD_FOLLOWING', payload: publicKey }),
    removeFollowing: publicKey => dispatch({ type: 'REMOVE_FOLLOWING', payload: publicKey })
});

export default connect(mapStateToProps, mapDispatchToProps)(Following);