import React, { Component } from "react";
import { Form, FormGroup, FormText, Label, Input, Button } from "reactstrap";
import { Link } from "react-router-dom";

/**
 * The Component is a class that can have a state
 *     (Component provides: constructor(), render(), etc)
 *
 * Make sure the component is exported at the end of the script so it can be used
 *     in other files (see App.js)
 */
class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      name: "",
      lowerColor: "white",
      upperColor: "white",
      numberColor: "white",
      symbolColor: "white",
      lengthColor: "white"
    };

    // We can attach our own functions by binding them to the class
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
  }

  /**
   * This function will send the credentials to the GrahpQL API to either:
   *        create a user
   *        tell the user that the email is conflicting
   * @param {*} event
   */
  handleSubmit(event) {
    event.preventDefault();
    alert("Submit!");
    // Do graphql user stuff
  }

  /**
   * Update the state.email field everytime the email input changes
   * @param {} event
   */
  updateEmail(event) {
    // setState() is misleading, it really updates the given field and
    //    leaves the other fields alone
    this.setState({
      email: event.target.value
    });
  }

  /**
   * Update the state.name field everytime the name input changes
   * @param {*} event
   */
  updateName(event) {
    this.setState({
      name: event.target.value
    });
  }

  /**
   * Check to see if the password is a valid password (strong enough)
   * Update the state.password field evertime the password input changes
   * @param {} event
   */
  updatePassword(event) {
    var password = event.target.value;

    var lowerColor = /[a-z]/.test(password) ? "white" : "red";
    var upperColor = /[A-Z]/.test(password) ? "white" : "red";
    var numberColor = /[0-9]/.test(password) ? "white" : "red";
    var symbolColor = /[$-/:-?{-~!"^_`]/.test(password) ? "white" : "red";
    var lengthColor = password.length >= 8 ? "white" : "red";

    this.setState({
      password: password,
      lowerColor: lowerColor,
      upperColor: upperColor,
      numberColor: numberColor,
      symbolColor: symbolColor,
      lengthColor: lengthColor
    });
  }

  /**
   * This is what is put on the screen.
   * Try to use reactstrap components when you can (Form, Input, Label, etc...)
   * *Always* remember the outermost div because all components must be contained in
   *     one element and it sizes up the "canvas" to make sure the page doesn't get
   *     too long or wide (emulating an app with web pages).
   * js should always be wrapped in curly braces in a jsx environment (see below)
   */
  render() {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          height: "100vh"
        }}
      >
        <div className="d-flex flex-column justify-content-center align-items-center">
          <img
            className="border rounded border-dark"
            src="images/logo.png"
            alt="chive logo"
            style={{ width: "50%" }}
          />
          <br />
          {/* You can attach a function to the class and use it as a function for an element */}
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="foodie67@chive.com"
                onChange={this.updateEmail}
              />
            </FormGroup>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="name"
                name="name"
                id="name"
                placeholder="John Appleseed"
                onChange={this.updateName}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="secretPassword5!"
                onChange={this.updatePassword}
              />
              <FormText
                className="d-flex justify-content-between"
                style={{
                  userSelect: "none",
                  MozUserSelect: "none",
                  WebkitUserSelect: "none",
                  msUserSelect: "none"
                }}
              >
                {/* You can use javascript variables but only if they are between curly braces.
                        Each one of these styles is an object {} (like state) */}
                <span style={{ color: this.state.lowerColor }}>lower </span>
                <span style={{ color: this.state.upperColor }}>upper </span>
                <span style={{ color: this.state.numberColor }}>number </span>
                <span style={{ color: this.state.symbolColor }}>symbol </span>
                <span style={{ color: this.state.lengthColor }}>length</span>
              </FormText>
            </FormGroup>
            <Button onClick={this.handleSubmit} style={{ width: "100%" }}>
              Register!
            </Button>
          </Form>
          <Link to="/signin">
            <br />
            Already have an account?
          </Link>
        </div>
      </div>
    );
  }
}

export default Register;
