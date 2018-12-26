import React, {Component} from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import FollowBoxCard from '../FollowCard/FollowBoxCard';

import { users } from '../../configs/BlockchainAPI';
class FollowBox extends Component {
    constructor(props) { 
        super(props);

        this.peopleNotFollowing = users;
    }

    componentWillUpdate(nextProps) {
        if (this.props.follow.followings.length < 1 && nextProps.follow.followings.length > 0) {
            this.peopleNotFollowing = users.filter(x => nextProps.follow.followings.indexOf(x) === -1);
            console.log('....', this.peopleNotFollowing);
        }
    }

    render() {
        return (
            <div>
                <div className="panel panel-default panel-custom .follow-panel">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            Who to follow
                    </h3>
                        <Link to="/">Refresh</Link>
                        <Link to="/">View all</Link>
                    </div>
                    <div className="panel-body">
                        {
                            this.peopleNotFollowing.map(person => <FollowBoxCard key={person} publicKey={person} addFollowing={this.props.addFollowing} removeFollowing={this.props.removeFollowing} peopleFollowing={this.props.follow.followings}/>)
                        }
                    </div>
                    <div className="panel-footer">
                        <Link to="/">
                            <span className="glyphicon glyphicon-user"></span> Find people you know
                    </Link>
                    </div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = ({ followReducer: follow }) => ({ follow });

const mapDispatchToPros = dispatch => ({
    addFollowing: publicKey => dispatch({ type: 'ADD_FOLLOWING', payload: publicKey }),
    removeFollowing: publicKey => dispatch({ type: 'REMOVE_FOLLOWING', payload: publicKey })
});

export default connect(mapStateToProps, mapDispatchToPros)(FollowBox);