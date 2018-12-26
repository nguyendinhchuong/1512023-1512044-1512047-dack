import React from 'react';
import { Link, withRouter } from "react-router-dom"
import AuthenticationService from '../../services/auth.service';

function handleLogout(props) {
    new AuthenticationService().logout(null, function () {
        props.history.push('/signin'); 
    });
}

const Navbar = props => {
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
                                <Link to="/exchange"><span className="glyphicon glyphicon-transfer" /> Exchane</Link>
                            </li>
                            <li>
                                <Link to="/createaccount"><span className="glyphicon glyphicon-user" /> Create account</Link>
                            </li>
                        </ul>
                        <div className="navbar-form navbar-right">
                            <div className="form-group has-feedback search">
                                <input type="text" className="form-control-nav search custom-css" id="search" aria-describedby="search1"
                                    placeholder="Search..." />
                                <span className="glyphicon glyphicon-search form-control-feedback" aria-hidden="true" />
                            </div>
                            <button className="btn btn-primary tweet" type="submit" aria-label="Left Align" onClick={() => handleLogout(props)}>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default withRouter(Navbar);
