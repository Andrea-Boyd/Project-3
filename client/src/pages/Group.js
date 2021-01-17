import React, { useState, useEffect, useContext } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Chat from "../components/Chat/Chat";
import API from "../utils/API";
import { UserContext } from "../utils/UserStore";
import { GroupContext } from "../utils/GroupStore";
import { CurrentGroupContext } from "../utils/CurrentGroupStore";
import { CurrentSubGroupContext } from "../utils/CurrentSubGroupStore";
import { Redirect, Link } from "react-router-dom";
import socketClient from "socket.io-client";

//import { User } from "../../../models";

// will need to import any of the individual component features like
// col/row/container/list/textarea/btn/etc

function Group(props) {
  //setting the initial states
  const [user, setUser] = useState({});
  const [group, setGroup] = useState({});
  const [formObject, setFormObject] = useState({});
  const { userState, setUserState } = useContext(UserContext);
  const { groupState, setGroupState } = useContext(GroupContext);
  const { currentGroupState, setCurrentGroupState } = useContext(
    CurrentGroupContext
  );

  const { currentSubGroupState, setCurrentSubGroupState } = useContext(
    CurrentSubGroupContext
  );

  let socket = props.socket;

  let pathArray = window.location.pathname.split("/");
  let username = pathArray[2];
  let groupName = pathArray[3];

  let messages = {
    name: groupName,
    messages: [{ name: "Admin", text: "Messages are loading", date: "Now" }],
  };

  socket.on("message check", (data) => {
    console.log("Message Check");
    let group = data.group;
    let currentGroup = data.currentGroup;
    if (group === groupState._id && currentGroup === currentGroupState._id) {
      API.getGroup(currentGroupState.name)
        .then((res) => {
          //console.log(res.data);
          setCurrentGroupState(res.data);
        })
        .catch((err) => console.log(err));
    }
  });

  //load all groups and store them with setGroup
  useEffect(() => {
    console.log(groupState);
    loadGroup(groupName);
    //setGroup(messages);
    //loadUser(username);
  }, []);

  useEffect(() => {
    loadGroup(groupName);
  }, [userState]);

  let currentUsersSubGroups = [];

  async function filterSubGroups() {
    new Promise((resolve, reject) => {
      userState.subgroups.forEach((userSubGroup, index, array) => {
        if (index === array.length + 1) {
          resolve();
        } else {
          console.log("filter Loop");
          groupState.subgroups.forEach((groupSubGroup) => {
            if (userSubGroup._id === groupSubGroup._id) {
              currentUsersSubGroups.push(groupSubGroup);
            }
          });
        }
      });
    });
  }

  useEffect(() => {
    console.log("Filter Start");
    filterSubGroups().then(() => {
      console.log(currentUsersSubGroups);
      setCurrentSubGroupState(currentUsersSubGroups);
    });
  }, [currentGroupState]);

  //loads the current group and sets it to group
  function loadGroup(groupName) {
    //console.log(groupName);
    API.getGroup(groupName)
      .then((res) => {
        console.log("load group response");
        console.log(res);
        setGroupState(res.data);
        setCurrentGroupState(res.data);
      })
      .catch((err) => console.log(err));
  }

  function loadCurrentGroup(groupName) {
    //console.log(groupName);
    API.getGroup(groupName)
      .then((res) => {
        //console.log("load group response");
        console.log(res.data);
        setCurrentGroupState(res.data);
      })
      .catch((err) => console.log(err));
  }

  // function loadSubGroup(groupName) {
  //   console.log("Load SubGroup");
  //   API.getGroup(groupName)
  //     .then((res) => {
  //       console.log("load Sub Group response");
  //       console.log(res);
  //       setCurrentGroupState(res.data);
  //       //console.log(groupState);
  //     })
  //     .catch((err) => console.log(err));
  // }

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
    setFormObject({ ...formObject, [name]: value.trim() });
  }

  //when new message is submitted, use API.postMessage metohd to save
  //the message, then reload messages from the database
  function sendMessage(event) {
    event.preventDefault();
    let fullName = userState.first_name + " " + userState.last_name;
    let timeStamp = Date.now();
    console.log("Send Message Funciton");
    console.log(currentGroupState.name);
    if (formObject.message) {
      API.postMessage(
        {
          text: formObject.message,
          name: fullName,
          date: timeStamp,
        },
        currentGroupState.name
      )
        .then((res) => {
          socket.emit("new message", {
            group: groupState._id,
            currentGroup: currentGroupState._id,
          });
          console.log(res.data);
          loadCurrentGroup(currentGroupState.name);
          //event.target.reset();
        })
        .catch((err) => console.log(err));
    }
  }

  // a lot of what is here in the example from 21.5, we have in the actual component
  // rather here in the page?
  if (userState.username === "") {
    return <Redirect to={"/"} />;
  } else {
    return (
      <div className="app__body">
        <Sidebar />
        <Chat
          handleInputChange={handleInputChange}
          sendMessage={sendMessage}
          messages={group}
          logOutUser={props.logOutUser}
        />
      </div>
    );
  }
}

export default Group;
