import React, { Component, Fragment } from "react";
import Navbar from "./Navbar";

export class Profile extends Component {
  render() {
    return (
      <Fragment>
        <div
          className="d-flex flex-column"
          style={{
            height: "100vh"
          }}
        >
          {/* this is going to be a different navbar for logged in users */}
          <Navbar />
          <div className="d-flex container flex-column flex-fill mt-5">
            <div className="d-flex flex-row align-items-center">
              <div
                className="border border-dark rounded"
                style={{ width: "150px", height: "150px" }}
              />
              <h1 className="ml-4">Ashna</h1>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Profile;
