import React, { Component, Fragment } from "react";
import {
  Form,
  FormGroup,
  FormFeedback,
  Label,
  Input,
  Button
} from "reactstrap";
import { Link } from "react-router-dom";

import emailValidator from "email-validator";

import { Mutation } from "react-apollo";
import { LOGIN_MUTATION } from "../graphql/mutations";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faLock } from "@fortawesome/free-solid-svg-icons";
import CenterPageNav from "./Layout/CenterPageNav";

class Signin extends Component {
  constructor(props) {
    super(props);

    if (props.userContext.email !== "" && props.userContext.name !== "") {
      this.props.history.push("/profile");
    }

    this.state = {
      email: "",
      validEmail: "default",
      password: "",
      validPassword: "default",
      buttonDisabled: false,
      buttonText: this.props.loginLoading ? "Signing in..." : "Sign in!",
      errorComponent: undefined
    };

    // We can attach our own functions by binding them to the class
    this.handleTextChange = this.handleTextChange.bind(this);
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

    if (name === "password") {
      this.setState({
        validPassword: {
          valid: true
        }
      });
    }
  }

  validateForm(event, login) {
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
      login({
        variables: {
          email: this.state.email,
          password: this.state.password
        }
      });
    }
  }

  render() {
    return (
      <CenterPageNav {...this.props}>
        {/* You can attach a function to the class and use it as a function for an element */}
        <Form style={{ minWidth: "20%" }}>
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
              autoComplete="email"
              placeholder="foodie67@chive.com"
              invalid={
                !this.state.validEmail.valid &&
                this.state.validEmail !== "default"
              }
              onChange={this.handleTextChange}
            />
            <FormFeedback valid={this.state.validEmail.valid}>
              {this.state.validEmail.errorMessage}
            </FormFeedback>{" "}
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              autoComplete="password"
              placeholder="secretPassword5!"
              invalid={
                !this.state.validPassword.valid &&
                this.state.validPassword !== "default"
              }
              onChange={this.handleTextChange}
            />
            <FormFeedback valid={this.state.validPassword.valid}>
              {this.state.validPassword.errorMessage}
            </FormFeedback>
          </FormGroup>
          <Mutation
            mutation={LOGIN_MUTATION}
            onCompleted={({ login }) => {
              console.log("LOGIN: ", login);
              // TODO: updated context with extended user after backend update
              this.props.userContext.updateUser({
                email: login.email,
                name: login.name
              });
              this.props.history.push("/profile");
            }}
          >
            {(login, { loading, error }) => {
              let buttonText = undefined;

              if (loading) {
                buttonText = (
                  <Fragment>
                    <FontAwesomeIcon icon={faSpinner} spin /> Signing in...
                  </Fragment>
                );
              } else {
                buttonText = "Sign in!";
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
                    onClick={event => this.validateForm(event, login)}
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
        <Link to="/register" style={{ marginTop: ".4rem" }}>
          Need an account?
        </Link>
      </CenterPageNav>
    );
  }
}

export default Signin;
