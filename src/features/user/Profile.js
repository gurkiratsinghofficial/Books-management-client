import React, { useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchUser, selectUser } from "./userSlice";

/**
 * @description: Component for displaying user details
 * @param {object} props
 */
function Profile(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.user.status);
  /**API is called and user is fetched when status==='idle' */
  useEffect(() => {
    if (userStatus === "idle") {
      dispatch(fetchUser());
    }
  }, [userStatus, dispatch]);
  const user = useSelector((state) => selectUser(state));
  const userinfo = user[0] ? user[0].userinfo : [];
  const { firstname, lastname, email, gender, birthday, profession } = userinfo;
  return (
    <div>
      <Card bg="dark" text="light" style={{ width: "50rem" }} className="mb-2">
        <Card.Header>{firstname}'s profile details</Card.Header>
        <Card.Body>
          <Card.Title>
            {" "}
            Name: {firstname} {lastname}
          </Card.Title>
          <Card.Title>Gender: {gender} </Card.Title>
          <Card.Title> Birthday: {birthday} </Card.Title>
          <Card.Title> Email Address: {email}</Card.Title>
          <Card.Title> Profession: {profession}</Card.Title>
          <Button
            variant="info"
            onClick={() => {
              history.push("/editUser");
            }}
          >
            Edit Details
          </Button>{" "}
        </Card.Body>
      </Card>
    </div>
  );
}

export default Profile;
