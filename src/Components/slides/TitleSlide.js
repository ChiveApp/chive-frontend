import React, { Component } from "react";
import { Button } from "reactstrap";
import { scroller } from "react-scroll";
import { Link } from "react-router-dom";

class TitleSlide extends Component {
  constructor(props) {
    super(props);
    this.name = props.box.name;
    this.tagline = props.box.tagline;
    this.id = props.box.id;
    this.opacity = props.box.opacity;
    this.backgroundImage = props.box.backgroundImage;
    this.buttonText = props.box.buttonText;
  }

  render() {
    return (
      <div
        className={
          "d-flex flex-grow-1 justify-content-center align-items-center"
        }
        style={{
          height: "100vh",
          backgroundImage: `url(${this.backgroundImage})`,
          backgroundSize: "cover"
        }}
        id={this.id}
      >
        <div
          className={"d-flex flex-fill flex-column align-items-center"}
          style={{
            height: "100vh",
            backgroundColor: `rgba(0, 0, 0, ${this.opacity}`
          }}
        >
          <div
            className="d-flex flex-row align-self-end"
            style={{ marginRight: "19px", marginTop: "19px" }}
          >
            <Link to="/register">
              <Button outline color="light" style={{ marginRight: "19px" }}>
                Register
              </Button>
            </Link>
            <Link to="/signin">
              <Button outline color="light">
                Sign In
              </Button>
            </Link>
          </div>

          <div
            className="d-flex flex-fill flex-column align-items-center justify-content-center"
            style={{ marginTop: "-57px" }}
          >
            <h1 className="text-light">{this.name}</h1>
            <h4 className="text-light">{this.tagline}</h4>
            <br />
            <Button
              outline
              color="light"
              onClick={() => {
                scroller.scrollTo(`scrollElement${this.id + 1}`, {
                  duration: 1250,
                  smooth: true
                });
              }}
            >
              {this.buttonText}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default TitleSlide;
