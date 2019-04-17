import React, { Component, Fragment } from "react";
import Navbar from "./Navbar";
import "../styles/Profile.css";
import FavoriteItemsList from "./FavoriteItemsList";

/**
 * TODO:
 * - clean code
 * - wrap in Query for users' profile
 * - make sure it's responsive
 */

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
              {/* <img src="images/profile.jpg" alt="Profile" 
                style={{width:"150px", height: "150px"}}/> */}
              <div className="imageContainer border border-dark rounded-circle">
                <img
                  src="images/profile.jpg"
                  alt="Profile"
                  className="profileImage"
                  style={{ width: "100%" }}
                />
                <div className="middle">
                  <button className="text">Edit</button>
                </div>
              </div>
              <h1 className="ml-4">Ashna</h1>
            </div>
            <hr />
            <h2 style={{ marginBottom: "0px" }}>Favorites</h2>
            <hr />
            <FavoriteItemsList />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Profile;
