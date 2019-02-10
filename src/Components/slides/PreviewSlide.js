import React, { Component } from "react";
import "../../styles/Preview.css";
import { Button } from "reactstrap";
import { Element, scroller } from "react-scroll";
import uniqid from "uniqid";

class PreviewSlide extends Component {
  constructor(props) {
    super(props);

    this.id = props.box.id;
    this.image = props.box.image;
    this.header = props.box.header;
    this.description = props.box.description;
    this.buttonText = props.box.buttonText;
    this.flairImage = props.box.flairImage;
    this.buttonText = props.box.buttonText;
    this.layout = props.box.layout;
    this.phoneClass = props.box.phoneClass;

    this.key = 0;
  }

  render() {
    var classes = `d-flex bg-light ${
      this.layout === "left" ? "switcher" : "switcher2"
    }`;

    var flairImage = this.flairImage ? (
      <img src={this.flairImage} alt="" style={{ width: "50%" }} />
    ) : null;

    var descriptions = [];

    for (var index in this.description) {
      descriptions.push(<p key={uniqid.time()}>{this.description[index]}</p>);
    }

    return (
      <Element name={`scrollElement${this.id}`}>
        <div className={classes} style={{ height: "100vh" }} id={this.id}>
          <img
            src={this.image}
            alt="Phone depicting Favorites and What's on Hand"
            className={this.phoneClass}
          />
          <div className="d-flex flex-column blurb-width">
            <h3 className="text-dark">{this.header}</h3>
            <br />
            <h5 className="text-dark">{descriptions}</h5>
            <br />
            {flairImage}
            <p>
              <Button
                outline
                color="dark"
                onClick={() => {
                  scroller.scrollTo(`scrollElement${this.id + 1}`, {
                    duration: 1250,
                    smooth: true
                  });
                }}
              >
                {this.buttonText}
              </Button>
            </p>
          </div>
        </div>
      </Element>
    );
  }
}

export default PreviewSlide;
