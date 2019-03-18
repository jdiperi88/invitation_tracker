import React, { Component } from "react";
import axios from "axios";

export default class RecipientsList extends Component {
    fetchRecipientsData = async () => {
        let recipients = await axios("/api/recipients");
    };
    render() {
        return <div />;
    }
}
