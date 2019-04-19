import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglassHalf } from "@fortawesome/free-solid-svg-icons";

/**
 * TODO:
 * - verify props
 * - clean up layout
 * - edit buttons
 * - make sure it's responsive
 */

export default class FavoriteItem extends Component {
  render() {
    return (
      <div
        className="d-flex flex-row align-items-center"
        style={{
          marginTop: "20px"
        }}
      >
        <img
          src={this.props.image}
          alt="Food"
          style={{ width: "100px", height: "100px" }}
        />
        <div className="d-flex flex-column" style={{ marginLeft: "20px" }}>
          <h4
            style={{
              margin: "0px",
              padding: "0px"
            }}
          >
            {" "}
            {this.props.name}
          </h4>

          <span>
            <FontAwesomeIcon icon={faHourglassHalf} /> {this.props.time}{" "}
            {this.props.rating}
          </span>
        </div>
      </div>
    );
  }
}
