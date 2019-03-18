import React, { Component } from "react";

class Footer extends Component {
    componentDidMount() {
        let { offsetHeight } = this.refs.footer;
        this.props.getOffsetHeight("footerOffset", offsetHeight);
    }

    render() {
        return (
            <footer
                ref="footer"
                className="footer"
                style={{ textAlign: "center" }}
            >
                <p>Please RSVP by Sunday, March 24th 2019</p>
            </footer>
        );
    }
}

export default Footer;
