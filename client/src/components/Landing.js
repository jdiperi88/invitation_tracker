import React from "react";

const Landing = ({ match }) => {
    return (
        <div className="landing-page" style={{ textAlign: "center" }}>
            <h1>Little Leo's Baby Shower!</h1>
            {match.params.decision == "attend" && (
                <p>Thank you for joining us</p>
            )}
            {match.params.decision == "decline" && (
                <p>Sorry, you cant make it</p>
            )}
        </div>
    );
};

export default Landing;
