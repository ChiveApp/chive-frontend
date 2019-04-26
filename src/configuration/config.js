var environmentKeys = [
  "REACT_APP_GRAPHQL_URL",
  "REACT_APP_UPLOADS_URL",
  "REACT_APP_RECIPES_URL"
];

environmentKeys = environmentKeys.filter(key => {
  if (typeof process.env[key] === "undefined") {
    return true; // [key is present, key name]
  }
  return false;
});

if (environmentKeys.length > 0) {
  throw new Error(
    `Failed to load environment variables: ${environmentKeys.join(" ")}
       You may be missing your .env file or the system is not configured properly
`
  );
}

export const graphqlURL = process.env.REACT_APP_GRAPHQL_URL;
export const recipesURL = process.env.REACT_APP_RECIPES_URL;
export const uploadsURL = process.env.REACT_APP_UPLOADS_URL;
