import React from "react";
import Navbar from "../Navbar";

function MarginPageNav(props) {
  return (
    <div
      className="d-flex flex-column"
      style={{
        height: "100vh"
      }}
    >
      <Navbar {...props} />
      <div className="d-flex container flex-column flex-fill mt-5">
        {props.children}
      </div>
    </div>
  );
}

export default MarginPageNav;
