import React from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button
} from "reactstrap";
import { recipesURL } from "../configuration/config";
import { Link } from "react-router-dom";

const RecipeCard = props => {
  const image = props.image ? (
    <CardImg src={`${recipesURL}${props.image}`} alt={props.name} />
  ) : (
    <CardImg src={`${recipesURL}default.png`} alt="defaut.png" />
  );

  return (
    <Card style={{ marginBottom: "1.25rem" }}>
      {image}
      <CardBody>
        <CardTitle>{props.name}</CardTitle>
        <CardSubtitle>Rating: {props.rating * 100}%</CardSubtitle>
        {props.description && (
          <CardText>{`${props.description.substring(0, 100)}...`}</CardText>
        )}
        <Link to={`/recipe/${props._id}`}>
          <Button outline color="dark">
            View
          </Button>
        </Link>
      </CardBody>
    </Card>
  );
};

export default RecipeCard;
