import React, { Component } from 'react'
import { connect } from 'react-redux';

class EditUser extends Component {
    constructor(props) {
        super();
        this.state = {
            profilePicture: '',
            FirstName: '' || props.first_name,
            LastName: '' || props.last_name,
        }
    }
    handleChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.updateUserInfo({ first_name: this.state.FirstName, last_name: this.state.LastName});
    }

    render() {
        return (
            <div>
                <div className="panel panel-default panel-custom user-info">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            Change Profile Info
                        </h3>
                    </div>
                    <div className="panel-body">
                        <div className="media">
                            <label >Profile Picture</label>
                            <img className="img-responsive" alt="demo" src="http://placehold.it/300x200" />
                            <input type="file" />
                            <div className="media-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group mt-10">
                                        <label>First Name</label>
                                        <input type="text" name="FirstName" className="form-control width-300" onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group mt-10">
                                        <label>Last Name</label>
                                        <input type="text" name="LastName" className="form-control width-300" onChange={this.handleChange} />
                                    </div>
                                    <button type="submit" className="btn btn-info">Save changes</button>
                                </form>
                                <br></br>
                            </div>
                        </div>
                    </div>
                </div>
                <br></br>
                <br></br>
            </div>
        )
    }
}

const mapStateToProps = state => ({ user: state.userReducer });

const mapDispatchToProps = dispatch => ({
    updateUserInfo: info => dispatch({ type: 'UPDATE_PROFILE_INFO_FULFILLED', payload: info })
});

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
