import React from "react";
import ReactDOM from "react-dom";
import Register from "../Components/Register";
import { BrowserRouter, Route } from "react-router-dom";

/**
 * This is an example test for a Component that must be contained in a Route
 */
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Route>
        <Register />
      </Route>
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
