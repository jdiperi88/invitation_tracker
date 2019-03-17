import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Header extends Component {
    componentDidMount() {
        console.log("working");
        console.log(this.props);
    }
    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <li>
                        <a href="/auth/google">Login With Google</a>
                    </li>
                );
            default:
                return [
                    <li key="2" style={{ margin: "0 10px" }}>
                        {this.props.auth.email}
                    </li>,
                    <li key="3">
                        <a href="/auth/logout">Logout</a>
                    </li>
                ];
        }
    }
    render() {
        return (
            <nav className="navigation">
                <div className="nav-wrapper">
                    <Link
                        to={this.props.auth ? "/surveys" : "/"}
                        className="left brand-logo"
                    >
                        Baby Shower
                    </Link>
                    <ul id="nav-mobile" className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        );
    }
}
function mapStateToProps({ auth }) {
    return { auth };
}
export default connect(mapStateToProps)(Header);
