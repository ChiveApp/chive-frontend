import React, { Component, Fragment } from "react";

/**
 * TODO:
 * - verify props
 * - clean up layout
 * - make a nicer check off overlay
 * - make sure it's responsive
 */

export default class GroceryItem extends Component {
  constructor(props) {
    super(props);

    if (parseInt(props.unit) > 1) {
      props.name += "s";
    }

    this.state = {
      checked: false
    };

    this.handleButton = this.handleButton.bind(this);
  }

  handleButton() {
    this.setState({
      checked: !this.state.checked
    });
  }

  render() {
    var image = null;

    if (!this.state.checked) {
      image = (
        <img
          alt={"alternate text"}
          src={this.props.imageSrc}
          style={{
            width: "100%",
            height: "100%"
          }}
        />
      );
    } else {
      image = (
        <Fragment>
          <img
            alt={"alt text"}
            src={"images/checkmark.png"}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.2)",
              zIndex: "2"
            }}
          />
          <img
            alt={"alternate text"}
            src={this.props.imageSrc}
            style={{
              width: "100%",
              height: "100%",
              zIndex: "1"
            }}
          />
        </Fragment>
      );
    }

    return (
      <div
        className="d-flex flex-row align-items-center"
        style={{
          marginTop: "12px"
        }}
        onClick={this.handleButton}
      >
        <div
          style={{
            width: "50px",
            height: "50px",
            position: "relative",
            border: "0"
          }}
        >
          {image}
        </div>
        <h3
          style={{
            margin: "0px",
            padding: "0px",
            marginLeft: "12px"
          }}
        >
          {this.props.quantity} {this.props.unit} {this.props.name}
        </h3>
      </div>
    );
  }
}
