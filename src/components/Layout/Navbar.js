import React from 'react';
import { Link, withRouter } from "react-router-dom"
import { connect } from 'react-redux';
import AuthenticationService from '../../services/auth.service';



class Navbar extends React.Component {
    handleLogout = () => {
        new AuthenticationService().logout(null, () => {
            this.props.history.push('/signin');
        });
    }

    state = {
        query: ''
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.history.push(`/search?query=${this.state.query}`);
    }

    render() {
        return (
            <div>
                <div className="navbar navbar-default navbar-static-top">
                    <div className="container">
                        <div className="navbar-collapse navbar-collapse-1 collapse" aria-expanded="true">
                            <ul className="nav navbar-nav custom-css">
                                <li className="active">
                                    <Link to="/"><span className="glyphicon glyphicon-home" /> Home</Link>
                                </li>
                                <li>
                                    <Link to="/history"><span className="glyphicon glyphicon-time" /> History</Link>
                                </li>
                                <li>
                                    <Link to="/exchange"><span className="glyphicon glyphicon-transfer" /> Exchange</Link>
                                </li>
                                <li>
                                    <Link to="/createaccount"><span className="glyphicon glyphicon-user" /> Create account</Link>
                                </li>
                            </ul>
                            <div className="navbar-form navbar-right">
                                <div className="form-group has-feedback search">
                                    <form onSubmit={this.handleSubmit}>
                                        <input type="text" className="form-control-nav search custom-css" id="search" aria-describedby="search1"
                                            placeholder="Search..." value={this.state.query} name="query" onChange={this.handleChange} style={{ paddingRight: 25 }}/>
                                        <span className="glyphicon glyphicon-search form-control-feedback" aria-hidden="true" /></form>

                                </div>
                                <button className="btn btn-primary tweet" type="submit" aria-label="Left Align" onClick={this.handleLogout}>
                                    Logout
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default withRouter(Navbar);
