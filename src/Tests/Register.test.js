import React from "react";
import ReactDOM from "react-dom";
import Register from "../Components/Register";
import { BrowserRouter, Route } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  document.body.appendChild(div);
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
