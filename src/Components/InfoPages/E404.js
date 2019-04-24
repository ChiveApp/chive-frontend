import React from "react";
import Oops from "./Oops";

function E404() {
  return (
    <Oops
      {...{
        errorCode: "404",
        errorName: "Where are we?",
        errorMessage:
          "You're lost, but life finds a way... click below to go back to the home page"
      }}
    />
  );
}

export default E404;
