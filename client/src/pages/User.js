import { SentimentSatisfied } from "@material-ui/icons";
import React, { useState, useEffect, useContext } from "react";
import Login from "../pages/Login"
import { Link, Redirect } from "react-router-dom";
import API from "../utils/API";
import "./User.css";
import { UserContext } from "../utils/UserStore";

function User() {
  const [user, setUser] = useState({}); //groups that users are part of
  const [newGroup, setNewGroup] = useState({});
  const [inviteCode, setInviteCode] = useState({});
  const { userState, setUserState } = useContext(UserContext);
  const { logout } = useState("")


  //console.log(userState);

  let groupData = {};
  let groupsTest = [
    { name: "Javascript", _id: "1" },
    { name: "React", _id: "2" },
  ];

  let pathArray = window.location.pathname.split("/");
  let username = pathArray[2];

  useEffect(() => {
    //loadUser(username);
    console.log(userState)
  }, []);

  function loadUser(username) {
    console.log("before");
    console.log(username);
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
      const{ name, value } = event.target;
      setInviteCode({...inviteCode, [name]: value});
  }
    };

  function addUserToGroup(e) {
    e.preventDefault();
    let fullName = userState.first_name + " "+ userState.last_name;
    API.addUserToGroup({name:fullName ,_id: userState._id, inviteCode:inviteCode.inviteCode})
      .then((res) => {
        console.log(res.data);

      })
      .catch((err) => console.log(err));
  }

  function logoutUser() {
    API.logout()
    .then(({ status }) => {
      if (status === 200) {
        window.location.href = "/";
      }
    });
  };

  



   
  

  function handleFormSubmit(e) {
    e.preventDefault();
    console.log(newGroup);
    API.createGroup(newGroup.groupName)
      .then((res) => {
        console.log(res.data);
        groupData = {
          _id: res.data._id,
          name: res.data.name,
        };
        addGroupToUser(username, groupData);
      })
      .catch((err) => console.log(err));
  };

  function addGroupToUser(username, groupData) {
    API.addGroupToUser(username, groupData).then((res) => {
      console.log(res);
      loadUser(username);
    });
  };

  if (userState.username === ""){
      return <Redirect to={"/"} />
  } else {

  
  return (
    <>
      <div className="user__container">
        <button onClick={logoutUser}> Log Out</button>
        <form>
          <input
            onSubmit={handleFormSubmit}
            className="user-form-control"
            type="text"
            placeholder="Enter A New Group"
            name="groupName"
            onChange={handleInputChange}
          />
          <button onClick={handleFormSubmit} className="user__btn">
            Submit
          </button>
        </form>
        <form>
          <input
            onSubmit={handleFormSubmit}
            className="user-form-control"
            type="text"
            placeholder="Enter An Invite Code for an Existing Group"
            name="inviteCode"
            onChange={handleInputChange}
          />
          <button onClick={addUserToGroup} className="user__btn">
            Submit
          </button>
        </form>
        <div> 
          {/* This condition will need to be changed when groupdata is being returned properly */}
          
           {userState.groups !== "0" ? (
            <div>
              {userState.groups.map((group) => (
                <Link to={"/user/" + username + "/" + group.name}>
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
    </>
  );
          }
}
export default User;
