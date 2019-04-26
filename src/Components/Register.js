import React, { Component, Fragment } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback
} from "reactstrap";
import { Link } from "react-router-dom";

import passwordValidator from "password-validator";
import emailValidator from "email-validator";

import { Mutation } from "react-apollo";
import { CREATE_USER } from "../graphql/mutations";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faLock } from "@fortawesome/free-solid-svg-icons";
import CenterPageNav from "./Layout/CenterPageNav";

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

    if (props.userContext.email !== "" && props.userContext.name !== "") {
      this.props.history.push("/profile");
    }

    this.passwordSchema = new passwordValidator();

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
      validEmail: "default",
      password: "",
      validPassword: "default",
      name: "",
      validName: "default"
    };

    // We can attach our own functions by binding them to the class
    this.handleTextChange = this.handleTextChange.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  /**
   * Update the state[name] field everytime the associated input changes
   * @param {} event
   */
  handleTextChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });

    if (name + "Validator" === "emailValidator") {
      this.setState({
        validEmail: {
          valid: value.length === 0 || emailValidator.validate(value),
          errorMessage: "Invalid email"
        }
      });
    }
  }

  /**
   * Check to see if the password is a valid password (strong enough)
   * Update the state.password field everytime the password input changes
   * @param {} event
   */
  updatePassword(event) {
    var password = event.target.value;

    var failed = this.passwordSchema.validate(password, { list: true });

    if (password.length !== 0 && failed.length !== 0) {
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
          break;
      }

      this.setState({
        password: password,
        validPassword: {
          valid: false,
          errorMessage: errorMessage
        }
      });
    } else {
      this.setState({
        password: password,
        validPassword: {
          valid: true
        }
      });
    }
  }

  validateForm(event, createUser) {
    event.preventDefault();

    let isValid = true;

    if (!this.state.validEmail.valid) {
      this.setState({
        validEmail: {
          valid: false,
          errorMessage: "Valid email required"
        }
      });
      isValid = false;
    }

    if (this.state.email.length === 0) {
      this.setState({
        validName: {
          valid: false,
          errorMessage: "Valid name required"
        }
      });
      isValid = false;
    }

    if (!this.state.validPassword.valid) {
      this.setState({
        validPassword: {
          valid: false,
          errorMessage: "Valid password required"
        }
      });
      isValid = false;
    }

    if (isValid) {
      createUser({
        variables: {
          email: this.state.email,
          name: this.state.name,
          password: this.state.password
        }
      });
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
      <CenterPageNav {...this.props}>
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
              invalid={
                !this.state.validEmail.valid &&
                this.state.validEmail !== "default"
              }
              onChange={this.handleTextChange}
            />
            <FormFeedback valid={this.state.validEmail.valid}>
              {this.state.validEmail.errorMessage}
            </FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="name"
              name="name"
              id="name"
              placeholder="John Appleseed"
              invalid={
                !this.state.validName.valid &&
                this.state.validName !== "default"
              }
              onChange={this.handleTextChange}
            />
            <FormFeedback valid={this.state.validName.valid}>
              {this.state.validName.errorMessage}
            </FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="secretPassword5!"
              invalid={
                !this.state.validPassword.valid &&
                this.state.validPassword !== "default"
              }
              onChange={this.updatePassword}
            />
            <FormFeedback valid={this.state.validPassword.valid}>
              {this.state.validPassword.errorMessage}
            </FormFeedback>
          </FormGroup>
          <Mutation
            mutation={CREATE_USER}
            onCompleted={({ createUser }) => {
              this.props.userContext.updateUser(createUser);
              this.props.history.push("/profile");
            }}
          >
            {(createUser, { loading, error }) => {
              let buttonText = undefined;

              if (loading) {
                buttonText = (
                  <Fragment>
                    <FontAwesomeIcon icon={faSpinner} spin /> Registering...
                  </Fragment>
                );
              } else {
                buttonText = "Register!";
              }

              if (error) {
                /**
                 * TODO: handle graphql errors
                 */

                buttonText = (
                  <Fragment>
                    <FontAwesomeIcon icon={faLock} /> Try again
                  </Fragment>
                );
              }

              return (
                <Fragment>
                  <Button
                    onClick={event => this.validateForm(event, createUser)}
                    style={{ width: "100%" }}
                    disabled={loading}
                  >
                    {buttonText}
                  </Button>
                </Fragment>
              );
            }}
          </Mutation>
        </Form>
        <Link to="/signin" style={{ marginTop: ".4rem" }}>
          Already have an account?
        </Link>
      </CenterPageNav>
    );
  }
}

export default Register;
