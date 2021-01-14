import React, { useState, useEffect, useContext } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Chat from "../components/Chat/Chat";
import API from "../utils/API";
import { UserContext } from "../utils/UserStore";
import { GroupContext } from "../utils/GroupStore";
import { Redirect } from "react-router-dom";

//import { User } from "../../../models";

// will need to import any of the individual component features like
// col/row/container/list/textarea/btn/etc

function Group() {
  //setting the initial state
  const [user, setUser] = useState({});
  const [group, setGroup] = useState({});
  const [formObject, setFormObject] = useState({});
  const { userState, setUserState } = useContext(UserContext);
  const { groupState, setGroupState } = useContext(GroupContext);
  console.log("chadsssss", groupState.inviteCode)

  let pathArray = window.location.pathname.split("/");
  let username = pathArray[2];
  let groupName = pathArray[3];

  let messages = {
    name: groupName,
    messages: [{ name: "Admin", text: "Messages are loading", date: "Now" }],
  };

  //load all groups and store them with setGroup
  //loads user data
  useEffect(() => {
    console.log(groupState);
    loadGroup(groupName);
    //setGroup(messages);
    //loadUser(username);
  }, []);

  //loads the current group and sets it to group
  function loadGroup(groupName) {
    //console.log(groupName);
    API.getGroup(groupName)
      .then((res) => {
        console.log("load group response");
        console.log(res);
        setGroupState(res.data);
        //console.log(groupState);
      })
      .catch((err) => console.log(err));
  }

  function loadUser(username) {
    //console.log("before");
    //console.log(username);
    API.getUser(username)
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
        //console.log(groupName);
        loadGroup(groupName);
        //setGroup(messages);
      })
      .catch((err) => console.log(err));
  }

  //functionality to delete a group?

  //updates component state when the user types a message
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  //when new message is submitted, use API.postMessage metohd to save
  //the message, then reload messages from the database
  function sendMessage(event) {
    event.preventDefault();
    let fullName = userState.first_name + " " + userState.last_name;
    let timeStamp = Date.now();
    console.log(fullName);
    console.log(timeStamp);
    if (formObject.message) {
      API.postMessage(
        {
          text: formObject.message,
          name: fullName,
          date: timeStamp,
        },
        groupName
      )
        .then((res) => {
          console.log(res.data);
          loadGroup(groupName);
          event.target.reset();
        })
        .catch((err) => console.log(err));
    }
  }

  // a lot of what is here in the example from 21.5, we have in the actual component
  // rather here in the page?
  if (userState.username === ""){
    return <Redirect to={"/"} />
}else {
  return (
    <div className="app__body">
      <Sidebar />
      <Chat
        handleInputChange={handleInputChange}
        sendMessage={sendMessage}
        messages={group}
      />
    </div>
  );
}
}

export default Group;