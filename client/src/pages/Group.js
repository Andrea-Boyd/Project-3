import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Chat from "../components/Chat/Chat";
import API from "../utils/API";
//import { User } from "../../../models";

// will need to import any of the individual component features like
// col/row/container/list/textarea/btn/etc

function Group() {
  //setting the initial state
  const [user, setUser] = useState({});
  const [group, setGroup] = useState({});
  const [formObject, setFormObject] = useState({});
  let pathArray = window.location.pathname.split("/");
  let username = pathArray[2];
  let groupName = pathArray[3];

  let messages = {
    name: groupName,
    messages: [
      { name: "Andrea", message: "Please work", timeStamp: "Today 8pm" },
    ],
  };

  //load all groups and store them with setGroup
  useEffect(() => {
    //loadGroup(groupName);
    //setGroup(messages);
    loadUser(username);
  }, []);

  //loads all groups and sets them to group
  function loadGroup(groupName) {
    //console.log(groupName);
    API.getGroup(groupName)
      .then((res) => {
        console.log("load group response");
        //console.log(res);
        setGroup(res.data);
        console.log(group);
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
    let fullName = user.first_name + " " + user.last_name;
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
        })
        .catch((err) => console.log(err));
    }
  }

  // a lot of what is here in the example from 21.5, we have in the actual component
  // rather here in the page?
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

export default Group;
