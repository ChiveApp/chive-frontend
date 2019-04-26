import React, { Component } from "react";
import { GET_GROCERY_ITEMS } from "./../graphql/queries";
import { Query } from "react-apollo";

/**
 * TODO:
 * - verify props
 * - clean up layout
 * - make a nicer check off overlay
 * - make sure it's responsive
 */

// Each grocery item is a recipe
// we want to list the ingredients by ingredient groups and then list
// those in that respective group

export default class test extends Component {
  render() {
    return <GroceryItem id="5cc2565774b9eb5f4a29447e" />;
  }
}

export const GroceryItem = ({ id }) => (
  <Query query={GET_GROCERY_ITEMS} variables={{ id }}>
    {({ loading, error, data }) => {
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;

      console.log(data);
      const { recipeById } = data;

      // need to map for each group name too
      var groupNames = recipeById.ingredients.map((ingredientGroup, index) => {
        return (
          <div key={index} style={{ marginBottom: "1rem" }}>
            <h4>{ingredientGroup.groupName}</h4>
            {ingredientGroup.ingredients.map((ingredient, index) => {
              return (
                <li key={index}>{`${ingredient.quantity} ${ingredient.unit} ${
                  ingredient.name
                }`}</li>
              );
            })}
          </div>
        );
      });
      return (
        <div>
          <h2>{recipeById.name}</h2>
          {groupNames}
        </div>
      );
    }}
  </Query>
);
// export default GroceryItem;
// export default class GroceryItem extends Component {
//   //class GroceryItem extends Component {
//   constructor(props) {
//     super(props);

//     if (parseInt(props.unit) > 1) {
//       props.name += "s";
//     }

//     this.state = {
//       checked: false
//     };

//     this.handleButton = this.handleButton.bind(this);
//   }

//   handleButton() {
//     this.setState({
//       checked: !this.state.checked
//     });
//   }

//   render() {
//     var image = null;

//     if (!this.state.checked) {
//       image = (
//         <img
//           alt={"alternate text"}
//           src={"images/checkmark.png"}
//           style={{
//             opacity: 1.0,
//             width: "100%",
//             height: "100%"
//           }}
//         />
//       );
//     } else {
//       image = (
//         <img
//           alt={"alt text"}
//           src={"images/checkmark.png"}
//           style={{
//             opacity: 0,
//             position: "absolute",
//             width: "100%",
//             height: "100%"
//           }}
//         />
//       );
//     }

//     return (
//       <div
//         className="d-flex flex-column align-items-center"
//         style={{
//           marginTop: "12px"
//         }}
//         onClick={this.handleButton}
//       >
//         {/* first we do recipe title */}

//         {/* <div
//           style={{
//             width: "50px",
//             height: "50px",
//             position: "relative",
//             border: "0"
//           }}
//         >
//           {image}
//         </div>
//         <h3
//           style={{
//             margin: "0px",
//             padding: "0px",
//             marginLeft: "12px"
//           }}
//         >
//           {this.props.name}
//         </h3>*/}
//       </div>
//     );
//   }
// }
