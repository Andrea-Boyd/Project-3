import React, { useState, useEffect, useContext, useRef } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Chat from "../components/Chat/Chat";
import API from "../utils/API";
import { UserContext } from "../utils/UserStore";
import { GroupContext } from "../utils/GroupStore";
import { CurrentGroupContext } from "../utils/CurrentGroupStore";
import { CurrentSubGroupContext } from "../utils/CurrentSubGroupStore";
import { Redirect } from "react-router-dom";
import "./Group.css";
import socketClient from "socket.io-client";
import "../App.css";

function Group(props) {
  // Pulling in Global and local states for component access
  const [group] = useState({});
  const [formObject, setFormObject] = useState({});
  const { userState } = useContext(UserContext);
  const { groupState, setGroupState } = useContext(GroupContext);
  const { currentGroupState, setCurrentGroupState } = useContext(
    CurrentGroupContext
  );
  const { currentSubGroupState, setCurrentSubGroupState } = useContext(
    CurrentSubGroupContext
  );

  const socket = useRef();

  let pathArray = window.location.pathname.split("/");
  let groupName = pathArray[3].replace("%20", " ");

  // Sends ID of current group to server so that user can be placed in the correct room
  function sendGroupID(id) {
    socket.current.emit("Join Group Request", id);
  }

  // When user changes group, this sends data to the server to be placed in a new room
  function changeGroup(currentID, newID) {
    socket.current.emit("Change Group Request", {
      currentID: currentID,
      newID: newID,
    });
  }

  function startSocketListener(id, name) {
    socket.current.on("message check", (data) => {
      console.log("Message Check");
      console.log(data);
      //console.log(currentGroupState);
      let currentGroup = data.currentGroupName;
      API.getGroup(currentGroup)
        .then((res) => {
          console.log("Message Check Response");
          //console.log(res.data);
          setCurrentGroupState(res.data);
          scrollToBottom();
        })
        .catch((err) => console.log(err));
    });
  }

  // Fires when Group page loads and retrieves current group and initiates a socket listener for new messages alerts
  useEffect(() => {
    initialLoadGroup(groupName);
    socket.current = socketClient.connect();
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
  }, [groupState]);

  // Loads initial group and starts socket listener
  function initialLoadGroup(groupName) {
    //console.log(groupName);
    API.getGroup(groupName)
      .then((res) => {
        console.log("initial load group response");
        console.log(res);
        setGroupState(res.data);
        setCurrentGroupState(res.data);
        sendGroupID(res.data._id);
        startSocketListener(res.data._id, res.data.name);
      })
      .catch((err) => console.log(err));
  }

  //loads the current group and sets it to group
  function loadGroup(groupName) {
    console.log(groupName);
    API.getGroup(groupName)
      .then((res) => {
        console.log("load group response");
        console.log(res);
        //props.joinGroupRequest(res.data._id);
        setGroupState(res.data);
        setCurrentGroupState(res.data);
      })
      .catch((err) => console.log(err));
  }

  function scrollToBottom() {
    var div = document.getElementById("chat__body");
    div.scrollTop = div.scrollHeight - div.clientHeight;
  }

  function loadCurrentGroup(groupName) {
    //console.log(groupName);
    API.getGroup(groupName)
      .then((res) => {
        //console.log("load group response");
        //console.log(res.data);
        setCurrentGroupState(res.data);
      })
      .catch((err) => console.log(err));
  }

  function onEmojiClick(event, emoji) {
    let input = document.getElementById("messageBar");
    //console.log(input.value);
    input.value = input.value + emoji.emoji;
    setFormObject({ ...formObject, message: input.value });
    //console.log(formObject);
  }

  //updates component state when the user types a message
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value.trim() });
  }

  // Posts new message to DB then sends a new message alert for server to handle
  function sendMessage(event) {
    // event.preventDefault();
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
          setFormObject({});
          socket.current.emit("new message", {
            group: groupState._id,
            currentGroup: currentGroupState._id,
            currentGroupName: currentGroupState.name,
          });
          console.log(res.data);
          loadCurrentGroup(currentGroupState.name);
          scrollToBottom();
          //event.target.reset();
        })
        .catch((err) => console.log(err));
    }
  }

  if (userState.username === "") {
    return <Redirect to={"/"} />;
  } else {
    return (
      <div className="app">
        <div className="app__body">
          <Sidebar changeGroup={changeGroup} />
          <Chat
            handleInputChange={handleInputChange}
            sendMessage={sendMessage}
            messages={group}
            logOutUser={props.logOutUser}
            onEmojiClick={onEmojiClick}
          />
        </div>
      </div>
    );
  }
}

export default Group;
