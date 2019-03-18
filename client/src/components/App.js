import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./Header";
import Landing from "./Landing";
import { connect } from "react-redux";
import Dashboard from "./Dashboard";
import * as actions from "../actions/index";
import SurveyNew from "./surveys/SurveyNew";
import Footer from "./Footer";
import RecipientsList from "./RecipientsList";

class App extends Component {
    state = {
        headerOffset: "",
        footerOffset: "",
        windowHeight: "",
        landingPageHeight: ""
    };

    getOffsetHeight = (property, height) => {
        this.setState({
            [property]: height
        });
    };
    componentDidMount() {
        this.props.fetchUser();
        console.log(this.props);
        this.setState({ windowHeight: window.innerHeight });
    }
    render() {
        let { headerOffset, footerOffset, windowHeight } = this.state;
        return (
            <div className="app-container">
                <Router>
                    <div>
                        <Header getOffsetHeight={this.getOffsetHeight} />
                        <Route
                            exact
                            path="/"
                            render={props => (
                                <Landing
                                    {...props}
                                    headerOffset={headerOffset}
                                    footerOffset={footerOffset}
                                    windowHeight={windowHeight}
                                />
                            )}
                        />
                        <Route exact path="/surveys" component={Dashboard} />
                        <Route
                            exact
                            path="/surveys/new"
                            component={SurveyNew}
                        />
                        <Route
                            exact
                            path="/api/surveys/:id/:decision"
                            render={props => (
                                <Landing
                                    {...props}
                                    headerOffset={headerOffset}
                                    footerOffset={footerOffset}
                                    windowHeight={windowHeight}
                                />
                            )}
                        />
                        <Footer getOffsetHeight={this.getOffsetHeight} />

                        <Route
                            exact
                            path="/recipients"
                            component={RecipientsList}
                        />
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
