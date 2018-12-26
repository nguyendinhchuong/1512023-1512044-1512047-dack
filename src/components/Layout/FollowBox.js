import React, {Component} from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import FollowBoxCard from '../FollowCard/FollowBoxCard';

const users = [
    'GBOVRS6DWD56GOIEYHFFYRLUBCV3JPQXRZ7YY4B34IHK6KWO4MQXGNZF',
    'GC26I5WNQ5HYNYDIPPAOSX5W7FSJRYRLEFQF56V7MX4TFDHHEZDK7KZW',
    'GBAZVE7HITKLHDLBSP6TTHS3YQ4V26NODNYZFEIEIM72OBJ7PGMCQKKR',
    'GBCCV5V7D733JZJ2VPRI245XNV63WGVD2INMIUW4IUEOLSU6DQHKAGK2'
];
class FollowBox extends Component {
    constructor(props) { 
        super(props);

        this.peopleNotFollowing = users;
    }

    componentWillUpdate(nextProps) {
        if (this.props.follow.followings.length < 1 && nextProps.follow.followings.length > 0) {
            this.peopleNotFollowing = users.filter(x => nextProps.follow.followings.indexOf(x) === -1);
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