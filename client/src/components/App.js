import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./Header";
import Landing from "./Landing";
import { connect } from "react-redux";
import Dashboard from "./Dashboard";
import * as actions from "../actions/index";
import SurveyNew from "./surveys/SurveyNew";
import Footer from "./Footer";

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
        console.log(this.props);
    }
    render() {
        return (
            <div className="app-container">
                <Router>
                    <div>
                        <Header />
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/surveys" component={Dashboard} />
                        <Route
                            exact
                            path="/surveys/new"
                            component={SurveyNew}
                        />
                        <Route
                            exact
                            path="/api/surveys/:id/:decision"
                            render={props => <Landing {...props} />}
                        />
                        <Footer />
                    </div>
                </Router>
            </div>
        );
    }
}

export default connect(
    null,
    actions
)(App);
