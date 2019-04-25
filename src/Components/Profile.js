import React, { Component } from "react";
import MarginPageNav from "./Layout/MarginPageNav";
import "../styles/Profile.css";
import FavoriteItemsList from "./FavoriteItemsList";
import UploadAndCrop from "./UploadAndCrop";

/**
 * TODO: clean code
 * TODO: make sure it's responsive
 */

export class Profile extends Component {
  constructor(props) {
    super(props);

    if (props.userContext.email === "" && props.userContext.name === "") {
      this.props.history.push("/signin");
    }
  }

  render() {
    return (
      <MarginPageNav {...this.props}>
        <div className="d-flex flex-row align-items-center">
          <div className="imageContainer border border-dark rounded">
            <img
              src="images/profile.jpg"
              alt="Profile"
              className="profileImage"
              style={{ width: "100%" }}
            />
            <div className="middle">
              <UploadAndCrop {...this.props} />
            </div>
          </div>
          <h2 className="ml-4">Kyle Helmick</h2>
        </div>
        <hr />
        <h2 style={{ marginBottom: "0px" }}>Favorites</h2>
        <hr />
        <FavoriteItemsList />
      </MarginPageNav>
    );
  }
}

export default Profile;
