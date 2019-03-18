import React, { Component } from "react";
import axios from "axios";

export default class RecipientsList extends Component {
    state = {
        recipients: ""
    };
    componentDidMount() {
        this.fetchRecipientsData();
    }
    fetchRecipientsData = async () => {
        let recipients = await axios("/api/recipients");
        console.log("not working", recipients.data);
        this.setState({
            recipients: recipients.data
        });
    };
    render() {
        let attendingArr = this.state.recipients
            ? this.state.recipients.reduce(
                  (arr, recipient) => {
                      if (recipient.responded == "attend") {
                          arr[0] += 1;
                      } else {
                          arr[1] += 1;
                      }
                      return arr;
                  },
                  [0, 0]
              )
            : "";
        attendingArr && console.log(attendingArr);
        return (
            <div>
                {this.state.recipients ? (
                    <div>
                        {attendingArr && (
                            <div className="row u-padding-top-small">
                                <p>Attending: {attendingArr[0]}</p>
                                <p>Declined: {attendingArr[1]}</p>
                            </div>
                        )}
                        {this.state.recipients.map((recipient, index) => {
                            return (
                                <div className="row">
                                    <p>{recipient.name}</p>
                                    <p>{recipient.responded}</p>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    "Loading..."
                )}{" "}
            </div>
        );
    }
}
