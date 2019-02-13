import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Element } from "react-scroll";
import { Button } from "reactstrap";

class SignupSlide extends Component {
  constructor(props) {
    super(props);

    this.id = props.box.id;
    this.opacity = props.box.opacity;
    this.backgroundImage = props.box.backgroundImage;
  }

  render() {
    return (
      <Element name={`scrollElement${this.id}`}>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            height: "100vh",
            backgroundImage: `url(${this.backgroundImage})`,
            backgroundSize: "cover"
          }}
          id={this.id}
        >
          <div
            className="d-flex flex-column flex-fill justify-content-center align-items-center"
            style={{
              height: "100vh",
              backgroundColor: `rgba(0, 0, 0, ${this.opacity}`
            }}
          >
            <h1 className="text-light">Try chive for free!</h1>
            <br />
            <Link to="/register">
              <Button outline color="light">
                Register
              </Button>
            </Link>
          </div>
        </div>
      </Element>
    );
  }
}

export default SignupSlide;
