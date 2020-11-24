import React from "react";
import { useHistory } from "react-router-dom";
import { getJwt } from "../helpers/jwt";

/**Component to check if user JWT exists or not */

function AuthComponent(props) {
  const history = useHistory();
  const jwt = getJwt();
  if (!jwt) {
    history.push("/");
  }
  return <div>{props.children}</div>;
}

export default AuthComponent;
