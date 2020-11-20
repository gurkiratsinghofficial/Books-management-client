import React from "react";
import { logOut } from "../user/userSlice";

import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

function Logout(props) {
  const dispatch = useDispatch();
  const logoutUser = async () => {
    try {
      /**dispatch action to add new book*/
      const resultAction = await dispatch(logOut());
      unwrapResult(resultAction);
    } catch (err) {
      console.log("unable to logout", err);
    }
  };

  return <button onClick={() => logoutUser()}>Logout</button>;
}

export default Logout;
