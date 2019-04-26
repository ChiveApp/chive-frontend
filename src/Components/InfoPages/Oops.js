import React from "react";
import CenterPage from "../Layout/CenterPage";
import { Jumbotron, Button } from "reactstrap";
import { Link } from "react-router-dom";

const Oops = props => {
  return (
    <CenterPage>
      <Jumbotron>
        <h1 className="display-5">
          {props.errorCode || "Whoa"}:{" "}
          <i>{props.errorName || "Something really messed up..."}</i>
        </h1>
        <p className="lead" style={{ wordwrap: "normal" }}>
          {props.errorMessage ||
            "We aren't really even sure what happened, so here's a button to go back to the main page."}
        </p>
        <Link to={props.errorTo || "/"}>
          <Button outline color="dark" style={{ marginRight: "19px" }}>
            {props.errorButton || "Home"}
          </Button>
        </Link>
      </Jumbotron>
    </CenterPage>
  );
};

export default Oops;
