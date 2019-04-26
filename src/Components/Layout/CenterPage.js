import React from "react";

const CenterPage = props => {
  return (
    <div
      className="d-flex flex-column"
      style={{
        height: "100vh"
      }}
    >
      <div className="d-flex flex-fill flex-column justify-content-center align-items-center">
        {props.children}
      </div>
    </div>
  );
};

export default CenterPage;
