import React, { Component, Fragment } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  UncontrolledTooltip
} from "reactstrap";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import passwordvalidator from "password-validator";

import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const CREATE_USER = gql`
  mutation createUser($email: String!, $password: String!, $name: String!) {
    createUser(email: $email, password: $password, name: $name) {
      email
    }
  }
`;

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

    this.passwordSchema = new passwordvalidator();

    this.passwordSchema
      .is()
      .min(8)
      .is()
      .max(100)
      .has()
      .uppercase()
      .has()
      .lowercase()
      .has()
      .digits()
      .has()
      .symbols()
      .has()
      .not()
      .spaces();

    this.state = {
      email: "",
      password: "",
      name: "",
      tooltipIsOpen: false,
      tooltipText: ""
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
    alert("Authentication coming soon!");
    // Do checking for valid inputs (email and name and pass)
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

    var failed = this.passwordSchema.validate(password, { list: true });

    if (failed.length > 0 && password.length !== 0) {
      var error = failed.slice(-1)[0];
      var errorMessage = "";
      switch (error) {
        case "spaces":
          errorMessage = "No spaces in passwords";
          break;
        case "lowercase":
          errorMessage = "You need a lowercase letter";
          break;
        case "uppercase":
          errorMessage = "You need an uppercase letter";
          break;
        case "digits":
          errorMessage = "You need a number";
          break;
        case "symbols":
          errorMessage = "You need a symbol";
          break;
        case "min":
        case "max":
          errorMessage = "Passwords must be 8 to 100 characters";
          break;
        default:
          console.log(failed);
      }

      this.setState({
        tooltipIsOpen: true,
        tooltipText: errorMessage
      });
    } else {
      this.setState({
        tooltipIsOpen: false
      });
    }

    this.setState({
      password: password
    });

    if (event.charCode === 13) {
      this.handleSubmit(event);
    }
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
            <Form
              onSubmit={this.handleSubmit}
              style={{ minWidth: "20%" }}
              autoComplete="off"
            >
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
                <UncontrolledTooltip
                  placement="auto-end"
                  isOpen={this.state.tooltipIsOpen}
                  target="password"
                >
                  {this.state.tooltipText}
                </UncontrolledTooltip>
              </FormGroup>
              <Mutation mutation={CREATE_USER}>
                {(createUser, { data }) => (
                  <Button
                    onClick={e => {
                      e.preventDefault();
                      createUser({
                        variables: {
                          email: this.state.email,
                          password: this.state.password,
                          name: this.state.name
                        }
                      });
                    }}
                    style={{ width: "100%" }}
                  >
                    Register!
                  </Button>
                )}
              </Mutation>
            </Form>
            <Link to="/signin">
              <br />
              Already have an account?
            </Link>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Register;
