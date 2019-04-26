import React, { Component } from "react";
import MarginPageNav from "./Layout/MarginPageNav";
import "../styles/Profile.css";
import FavoriteItemsList from "./FavoriteItemsList";
import UploadAndCrop from "./UploadAndCrop";
import { uploadsURL } from "../configuration/config";
import GroceryItemsList from "./GroceryList";
import { NavLink, Nav, NavItem } from "reactstrap";
import classnames from "classnames";
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
    this.state = { activeTab: "Favorites" };
  }

  toggle = tab => {
    if (tab !== this.state.activeTab) this.setState({ activeTab: tab });
  };

  render() {
    var content = undefined;
    if (this.state.activeTab === "Favorites") {
      content = <FavoriteItemsList userContext={this.props.userContext} />;
    } else if (this.state.activeTab === "Inventory") {
      content = (
        <h2 style={{ marginTop: "1.5rem" }}>
          Sorry for the dust! We're under construction.
        </h2>
      );
    } else if (this.state.activeTab === "Grocery List") {
      content = <GroceryItemsList userContext={this.props.userContext} />;
    }
    return (
      <MarginPageNav {...this.props}>
        <div className="d-flex flex-row align-items-center">
          <div className="imageContainer border border-dark rounded">
            <img
              src={`${uploadsURL}${
                this.props.userContext.profilePicture
              }?${new Date().getTime()}`}
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
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({
                active: this.state.activeTab === "Favorites"
              })}
              onClick={() => {
                this.toggle("Favorites");
              }}
            >
              Favorites
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: this.state.activeTab === "Inventory"
              })}
              onClick={() => {
                this.toggle("Inventory");
              }}
            >
              Inventory
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: this.state.activeTab === "Grocery List"
              })}
              onClick={() => {
                this.toggle("Grocery List");
              }}
            >
              Grocery List
            </NavLink>
          </NavItem>
        </Nav>
        {content}
      </MarginPageNav>
    );
  }
}

export default Profile;
