import React, { useState, useEffect, useContext, useRef } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Chat from "../components/Chat/Chat";
import API from "../utils/API";
import { UserContext } from "../utils/UserStore";
import { GroupContext } from "../utils/GroupStore";
import { CurrentGroupContext } from "../utils/CurrentGroupStore";
import { CurrentSubGroupContext } from "../utils/CurrentSubGroupStore";
import { Redirect, Link } from "react-router-dom";
import io from "socket.io-client";
import "./Group.css";
import socketClient from "socket.io-client";
import "../App.css";

function Group(props) {
  // Pulling in Global and local states for component access
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

  const socket = useRef();

  let pathArray = window.location.pathname.split("/");
  let username = pathArray[2];
  let groupName = pathArray[3].replace("%20", " ");

  let messages = {
    name: groupName,
    messages: [{ name: "Admin", text: "Messages are loading", date: "Now" }],
  };

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

  // function findSocketToJoin() {
  //   console.log("findSocketToJoin");
  //   userState.groups.forEach((group) => {
  //     console.log("for Each Statement");
  //     console.log(group);
  //     console.log(groupName);
  //     if (group.name === groupName) {
  //       props.socketRef.current.emit("Join Group Request", group._id);
  //     }
  //   });
  // };

  function startSocketListener(id, name) {
    socket.current.on("message check", (data) => {
      console.log("Message Check");
      console.log(data);
      //console.log(currentGroupState);
      let group = data.group;
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

  //load all groups and store them with setGroup
  useEffect(() => {
    // socketRef.current = io.connect("/");

    //findSocketToJoin();
    console.log(groupState);
    console.log(groupName);
    initialLoadGroup(groupName);
    //setGroup(messages);
    //loadUser(username);
    socket.current = socketClient.connect();
  }, []);

  // function initialLoadGroup(groupName) {
  //   console.log(groupName);
  //   API.getGroup(groupName)
  //     .then((res) => {
  //       console.log("load group response");
  //       console.log(res);
  //       //props.joinGroupRequest(res.data._id);
  //       setGroupState(res.data);
  //       setCurrentGroupState(res.data);
  //       console.log(currentGroupState);
  //       props.socketRef.current.on("Message Check", (data) => {
  //         let localCurrentGroup = getCurrentGroupState();
  //         console.log("Message Check");
  //         console.log(data.currentGroup);
  //         console.log(localCurrentGroup);
  //         let currentGroup = data.currentGroup;
  //         if (currentGroup === localCurrentGroup._id) {
  //           API.getGroup(localCurrentGroup.name)
  //             .then((res) => {
  //               console.log(res.data);
  //               setCurrentGroupState(res.data);
  //             })
  //             .catch((err) => console.log(err));
  //         }
  //       });
  //     })
  //     .catch((err) => console.log(err));
  // }

  useEffect(() => {
    loadGroup(groupName);
  }, [userState]);

  function getCurrentGroupState() {
    return currentGroupState;
  }
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

  // useEffect(() => {
  //   scrollToBottom();
  // }, [currentGroupState]);

  // props.socketRef.current.on("Message Check", (data) => {
  //   console.log("Message Check");
  //   console.log(props.socketRef.id);
  //   // console.log(data.currentGroup);
  //   // console.log(currentGroupState._id);
  //   let currentGroup = data.currentGroup;
  //   if (currentGroup === currentGroupState._id) {
  //     API.getGroup(currentGroupState.name)
  //       .then((res) => {
  //         console.log(res.data);
  //         setCurrentGroupState(res.data);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // });
  // useEffect(() => {
  //   scrollToBottom();
  // }, [currentGroupState]);

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

  function onEmojiClick(event, emoji) {
    let input = document.getElementById("messageBar");

    console.log(input.value);
    input.value = input.value + emoji.emoji;
    setFormObject({ ...formObject, message: input.value });
    // if(input.value === null) {
    //   input.value = emoji.emoji
    //   console.log(input.value)
    //   setFormObject({...formObject , message: input.value})
    // } else {
    //   input.value = input.value + emoji.emoji
    //   setFormObject({ ...formObject, message: input.value });
    // }
    console.log(formObject);

    // let emojiMessage = formObject.message + emoji.emoji;
    // setFormObject({ ...formObject, message: emojiMessage });
  }

  //updates component state when the user types a message
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value.trim() });
  }

  //when new message is submitted, use API.postMessage metohd to save
  //the message, then reload messages from the database
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

  // a lot of what is here in the example from 21.5, we have in the actual component
  // rather here in the page?
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
