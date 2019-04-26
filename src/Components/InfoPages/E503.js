import React from "react";
import Oops from "./Oops";

const E503 = () => {
  return (
    <Oops
      {...{
        errorCode: "503",
        errorName: "Ack! He's dead Jim",
        errorMessage:
          "chive's servers are taking a break, try again in a couple of minutes"
      }}
    />
  );
};

export default E503;
