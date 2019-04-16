var environmentKeys = ["REACT_APP_API_URL"];

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

export const apiURL = process.env.REACT_APP_API_URL;
