import React from 'react';
import { connect } from 'react-redux'
import FollowCard from '../FollowCard/FollowCar'
import FollowBox from '../Layout/FollowBox';
import UserInfo from '../Layout/UserInfo';
import axios from 'axios'
import { decode } from '../../lib/tx';
import BlockchainAPI from '../../configs/BlockchainAPI'

class Following extends React.Component {
    state = {
        followings: [],
        name: [],
        profilePicture: [],
        check: false
    }
    componentDidMount = () => {
        // await Blockchain.getLatestSequence();
        this.props.followings.map((following) => {
            this.getName(following)
            this.getProfilePicture(following)
        })
        this.setState({
            check: true
        });
    }

    getName = (publicKey) => {
        axios.get(`${BlockchainAPI.baseRoute}/tx_search?query="account=%27${publicKey}%27"`)
            .then(res => {
                let result = res.data.result
                for (let i = result.txs.length - 1; i >= 0; i--) {
                    let decResult = decode(Buffer.from(result.txs[i].tx, 'base64'));
                    if (decResult.operation === 'update_account' && decResult.params.key === 'name') {
                        this.setState({
                            name: [...this.state.name, decResult.params.value.toString('utf-8')]
                        });
                        return
                    }
                }
                this.setState({
                    name: [...this.state.name, publicKey]
                });
            })
    }


    getProfilePicture = (publicKey) => {
        axios.get(`${BlockchainAPI.baseRoute}/tx_search?query="account=%27${publicKey}%27"`)
            .then(res => {
                let result = res.data.result
                for (let i = result.txs.length - 1; i >= 0; i--) {
                    let decResult = decode(Buffer.from(result.txs[i].tx, 'base64'));
                    if (decResult.operation === 'update_account' && decResult.params.key === 'picture') {
                        let imgPath = "data:image/jpg;base64," + decResult.params.value.toString('base64')
                        this.setState({
                            profilePicture: [...this.state.profilePicture, imgPath]
                        });
                        return
                    }
                }
                this.setState({
                    profilePicture: [...this.state.profilePicture, 'http://placehold.it/500x500']
                });
            })
    }

    render() {
        const { name, profilePicture } = this.state
        let items = []
        if (profilePicture.length === this.props.followings.length) {
            name.map((following, index) => {
                let person = {
                    name: null,
                    profilePicture: null
                }
                person.name = following
                person.profilePicture = profilePicture[index]
                items.push(person)
            })
        }
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
                                        Following
                    </h3>
                                </div>
                                <div className="panel-body">
                                    <div className="media">
                                        <div className="follow">
                                            {
                                                items.map((obj, index) => <FollowCard
                                                    key={index}
                                                    person={obj}
                                                    addFollowing={this.props.addFollowing}
                                                    removeFollowing={this.props.removeFollowing}
                                                    isFollowed={this.props.followings.indexOf(obj) !== -1}
                                                    peopleFollowing={this.props.followings} />)
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <FollowBox />
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
