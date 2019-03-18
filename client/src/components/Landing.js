import React from "react";

const Landing = ({ match, headerOffset, footerOffset, windowHeight }) => {
  return (
    <div
      className="landing-page u-padding-bottom-medium"
      style={{
        textAlign: "center",
        minHeight: `${windowHeight - headerOffset - footerOffset}px`
      }}
    >
      <h1 className="u-padding-bottom-small ">Little Leo's Baby Shower!</h1>
      {match.params.decision == "attend" && (
        <div className="address-container">
          <p>Thank you for joining us on this special occasion!</p>

          <p>Sunday, April 7th 2019 from 1:00pm to 4:00pm</p>
          <p>Crystal Lake</p>
          <p>647 Grand St</p>
          <p>Brooklyn, NY 11211</p>
          <div>
            <h2>We are Registered at:</h2>
            <div className="button-container">
              <a
                className="myButton"
                target="__blank"
                href="https://www.amazon.com/baby-reg/saida-diperi-joseph-diperi-may-2019-newyork/18SXA6N15D8UM"
              >
                Amazon
              </a>
              <a
                className="myButton"
                target="__blank"
                href="https://www.buybuybaby.com/store/giftregistry/viewregistryguest/547282885?eventType=Baby"
              >
                Buy Buy Baby
              </a>
            </div>
          </div>
        </div>
      )}
      {match.params.decision !== "attend" &&
        match.params.decision !== "decline" && (
          <div className="address-container">
            <p>Sunday, April 7th 2019 from 1:00pm to 4:00pm</p>
            <p>Crystal Lake</p>
            <p>647 Grand St</p>
            <p>Brooklyn, NY 11211</p>
            <div>
              <h2>We are Registered at:</h2>
              <div className="button-container">
                <a
                  className="myButton"
                  target="__blank"
                  href="https://www.amazon.com/baby-reg/saida-diperi-joseph-diperi-may-2019-newyork/18SXA6N15D8UM"
                >
                  Amazon
                </a>
                <a
                  className="myButton"
                  target="__blank"
                  href="https://www.buybuybaby.com/store/giftregistry/viewregistryguest/547282885?eventType=Baby"
                >
                  Buy Buy Baby
                </a>
              </div>
            </div>
          </div>
        )}
      {match.params.decision == "decline" && (
        <div className="address-container">
          <p>We are sorry, you cant make it.</p>
          <div>
            <h2>We are Registered at:</h2>
            <div className="button-container">
              <a
                className="myButton"
                target="__blank"
                href="https://www.amazon.com/baby-reg/saida-diperi-joseph-diperi-may-2019-newyork/18SXA6N15D8UM "
              >
                Amazon
              </a>
              <a
                className="myButton"
                target="__blank"
                href="https://www.buybuybaby.com/store/giftregistry/viewregistryguest/547282885?eventType=Baby"
              >
                Buy Buy Baby
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Landing;
