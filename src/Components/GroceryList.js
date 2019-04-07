import React, { Component, Fragment } from "react";
import Navbar from "./Navbar";

import GroceryItem from "./GroceryItem";

export default class GroceryList extends Component {
  render() {
    var groceries = [
      {
        quantity: "10",
        unit: "ounces",
        name: "oil"
      },
      {
        quantity: "6",
        unit: "cans",
        name: "peach"
      },
      {
        quantity: "1",
        unit: "",
        name: "Bell pepper"
      }
    ];

    var groceryComponents = groceries.map(item => (
      <GroceryItem
        imageSrc={"images/bellpepper.jpg"}
        quantity={item.quantity}
        unit={item.unit}
        name={item.name}
        key={groceries.indexOf(item)}
      />
    ));

    return (
      <Fragment>
        <Navbar />
        <div className="d-flex flex-column align-self-center container">
          {groceryComponents}
        </div>
      </Fragment>
    );
  }
}
