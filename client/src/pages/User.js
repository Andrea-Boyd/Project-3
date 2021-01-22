import { SentimentSatisfied } from "@material-ui/icons";
import React, { useState, useEffect, useContext } from "react";
import Login from "../pages/Login";
import { Link, Redirect } from "react-router-dom";
import API from "../utils/API";
import "./User.css";
import { UserContext } from "../utils/UserStore";
import Sidebar from "../components/Sidebar/Sidebar";

function User(props) {
  // Pulling in Global and local states for component access
  const [user, setUser] = useState({}); //groups that users are part of
  const [newGroup, setNewGroup] = useState({});
  const [inviteCode, setInviteCode] = useState({});
  const { userState, setUserState } = useContext(UserContext);
  const { logout } = useState("");

  let groupData = {};

  let pathArray = window.location.pathname.split("/");
  let username = pathArray[2];

  function loadUser(username) {
    // console.log("before");
    // console.log(username);
    API.getUser(username)
      .then((res) => {
        console.log(res.data);
        setUserState(res.data);
      })
      .catch((err) => console.log(err));
  }

  function handleInputChange(event) {
    if (event.target.name === "groupName") {
      const { name, value } = event.target;
      //console.log(`${name} ; ${value}`);
      setNewGroup({ ...newGroup, [name]: value });
    } else {
      const { name, value } = event.target;
      setInviteCode({ ...inviteCode, [name]: value.trim() });
    }
  }

  // When a user joins a group via invite code, info for that user is added to group document
  function addUserToGroup(e) {
    e.preventDefault();
    let fullName = userState.first_name + " " + userState.last_name;
    API.addUserToGroup({
      name: fullName,
      _id: userState._id,
      inviteCode: inviteCode.inviteCode,
    })
      .then((res) => {
        //console.log(res.data);
        addGroupToUser(username, res.data);
      })
      .catch((err) => console.log(err));
  }

  // Creates new group document
  function handleFormSubmit(e) {
    e.preventDefault();
    console.log(newGroup);
    let name = userState.first_name + " " + userState.last_name;
    let userData = [{ name: name, _id: userState._id }];
    API.createGroup(newGroup.groupName, userData)
      .then((res) => {
        console.log(res.data);
        groupData = {
          _id: res.data._id,
          name: res.data.name,
        };
        addGroupToUser(username, groupData);
      })
      .catch((err) => console.log(err));
  }

  // When a user joins a group via invite code, info for that group is added to the user document
  function addGroupToUser(username, groupData) {
    API.addGroupToUser(username, groupData).then((res) => {
      // console.log(res);
      loadUser(username);
    });
  }

  function clearField() {
    let input = document.getElementById("joinKit");
    input.value = "";
    console.log(input);
  }
  // if (userState.username === "") {
  //   <Redirect to={"/"} />;
  // } else {
  return (
    <>
      <div className="user__page">
        <div className="user__container">
          <button onClick={props.logOutUser} className="logout__btn">
            {" "}
            Log Out
          </button>
          <h2 className="user__h2">Join a Kit</h2>
          <form className="user-form">
            <input
              id="joinKit"
              className="user-form-control"
              type="text"
              placeholder="Enter an Invite Code"
              name="inviteCode"
              onChange={handleInputChange}
            />

            <button onClick={addUserToGroup} className="user__btn">
              Submit
            </button>
          </form>
          <h2 className="user__h2">Create a New Kit</h2>
          <form className="user__form">
            <input
              className="user-form-control"
              type="text"
              placeholder="Enter a New Group"
              name="groupName"
              onChange={handleInputChange}
            />
            <button onClick={handleFormSubmit} className="user__btn">
              Submit
            </button>
          </form>

          <div>
            <h2 className="user__h2">Select a Kit</h2>
            {userState.groups.length !== 0 ? (
              <div className="user__kits">
                {userState.groups.map((group) => (
                  <Link
                    to={"/user/" + username + "/" + group.name}
                    key={group._id}
                  >
                    <button
                      key={group._id}
                      className="group__btn"
                      value={group._id}
                    >
                      {group.name}
                    </button>
                  </Link>
                ))}
              </div>
            ) : (
              <h3>Start your first group above!</h3>
            )}
          </div>
        </div>
      </div>
    </>
  );
  // }
}

export default User;
