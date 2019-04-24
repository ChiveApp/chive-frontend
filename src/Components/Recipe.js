import React, { Component, Fragment } from "react";
import Navbar from "./Navbar";
import "../styles/Profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglassHalf } from "@fortawesome/free-solid-svg-icons";

export class Recipe extends Component {
  render() {
    var ingredients = ["bunch of carrots", "some sugar", "too much frosting"];

    ingredients = ingredients.map((ingredient, index) => (
      <li key={index}>{ingredient}</li>
    ));

    var directions = [
      "Blend carrots and sugar",
      "Bake the blend",
      "Dump on frosting"
    ];
    directions = directions.map((direction, index) => (
      <li key={index}>{direction}</li>
    ));
    var rating = "10 outta 10";
    var name = "Chef lady";
    var description =
      "Wow chef lady look happy, she put parsely on ribs(?) Amaze, she put parsely on ribs(?) AmazeWow chef lady look happy, she put parsely on ribs(?) AmazeWow chef lady look happy, she put parsely on ribs(?) AmazeWow chef lady look happy, she put parsely on ribs(?) AmazeWow chef lady look happy, she put parsely on ribs(?) AmazeWow chef lady look happy, she put parsely on ribs(?) Amaze";
    return (
      <div
        className="d-flex flex-column"
        style={{
          height: "100vh"
        }}
      >
        <Navbar />

        <div className="d-flex container flex-column flex-fill mt-5">
          <img
            // src={this.props.image}
            src="images/profile.jpg"
            alt={name}
            style={{ minWidth: "350px", minHeight: "350px" }}
            className="border border-dark 
			rounded-square align-self-center"
          />
          <h2
            style={{
              margin: "0px",
              padding: "0px"
            }}
            className="align-self-center"
          >
            {name}
          </h2>
          <h5 className="align-self-center">
            {rating}{" "}
          </h5>
          <p />
          <div
            className="container"
            style={{
              maxWidth: "750px"
            }}
          >
            <p className="align-self-center">{description}</p>
          </div>
          <hr />
          <h4
            align="left"
            style={{
              marginBottom: "0px"
            }}
          >
            Ingredients
          </h4>
          <hr />
          <ol className="container">{ingredients}</ol>
          <hr />
          <h4
            align="left"
            style={{
              marginBottom: "0px"
            }}
          >
            Directions
          </h4>
          <hr />
          <ol className="container">{directions}</ol>
        </div>
      </div>
    );
  }
}

export default Recipe;
