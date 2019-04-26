import React, { Component } from "react";
import MarginPageNav from "./Layout/MarginPageNav";
import "../styles/Profile.css";
import FavoriteItemsList from "./FavoriteItemsList";
import UploadAndCrop from "./UploadAndCrop";
import { uploadsURL } from "../configuration/config";

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
              src={uploadsURL + this.props.userContext.profilePicture}
              alt="Profile"
              className="profileImage"
              style={{ width: "100%" }}
            />
            <div className="middle">
              <UploadAndCrop {...this.props} />
            </div>
          </div>
          <h2 className="ml-4">{this.props.userContext.name}</h2>
        </div>
        <hr />
        <ul className="nav nav-pills nav-fill">
          <li className="nav-item">
            <div className="nav-link active">Active</div>
          </li>
          <li className="nav-item">
            <div className="nav-link">Longer nav link</div>
          </li>
          <li className="nav-item">
            <div className="nav-link">Link</div>
          </li>
          <li className="nav-item">
            <div className="nav-link disabled">Disabled</div>
          </li>
        </ul>{" "}
        <h2 style={{ marginBottom: "0px" }}>Favorites</h2>
        <hr />
        <FavoriteItemsList {...this.props} />
      </MarginPageNav>
    );
  }
}

export default Profile;
