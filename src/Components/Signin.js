import React, { Component, Fragment } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };

    // We can attach our own functions by binding them to the class
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
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
   * Update the state.password field evertime the password input changes
   * @param {} event
   */
  updatePassword(event) {
    var password = event.target.value;

    this.setState({
      password: password
    });

    if (event.charCode === 13) {
      this.handleSubmit(event);
    }
  }

  /**
   * This function will send the credentials to the GrahpQL API to either:
   *        authenticate the user
   *        deny the user
   * @param {*} event
   */
  handleSubmit(event) {
    event.preventDefault();
    alert("Authentication coming soon!");
    // Do checking for valid inputs (email and pass)
    // Do graphql user stuff
  }

  render() {
    return (
      <Fragment>
        <div
          className="d-flex flex-column"
          style={{
            height: "100vh"
          }}
        >
          <Navbar />
          <div className="d-flex flex-column flex-fill justify-content-center align-items-center">
            {/* You can attach a function to the class and use it as a function for an element */}
            <Form onSubmit={this.handleSubmit} style={{ minWidth: "20%" }}>
              <div className="d-flex align-items-center justify-content-center">
                <img
                  src="images/chivelogo.svg"
                  alt="chive logo"
                  style={{ width: "50%" }}
                />
              </div>
              <br />
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
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="secretPassword5!"
                  onChange={this.updatePassword}
                />
              </FormGroup>
              <Button onClick={this.handleSubmit} style={{ width: "100%" }}>
                Sign in!
              </Button>
            </Form>
            <Link to="/register">
              <br />
              Need an account?
            </Link>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Signin;
