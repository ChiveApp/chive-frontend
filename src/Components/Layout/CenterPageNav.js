import React from "react";
import Navbar from "../Navbar";

function CenterPageNav(props) {
  return (
    <div
      className="d-flex flex-column"
      style={{
        height: "100vh"
      }}
    >
      <Navbar {...props} />
      <div className="d-flex flex-fill flex-column justify-content-center align-items-center">
        {props.children}
      </div>
    </div>
  );
}

export default CenterPageNav;
