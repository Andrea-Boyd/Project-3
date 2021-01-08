import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Chat from "../components/Chat/Chat";
import API from "../utils/API";
import { Link } from "react-router-dom";
// will need to import any of the individual component features like 
// col/row/container/list/textarea/btn/etc




function Group() {
    //setting the initial state 
    const [group, setGroup] = useState([]);
    const [formObject, setFormObject] = useState({});
    let messages = [{name:"Andrea",message:"Please work",timeStamp:"Today 8pm"}];
   
    //load all groups and store them with setGroup
    useEffect(() => {
        loadGroup()
    }, [])

    //loads all groups and sets them to group
    function loadGroup() {
        API.getGroups()
          .then(res =>
            setGroup(res.data)
          )
          .catch(err => console.log(err));
    };

    //functionality to delete a group?

    //updates component state when the user types a message 
    function handleInputChange(event) {
        const {name, value} = event.target;
        setFormObject({...formObject, [name]: value})
    };

    //when new message is submitted, use API.postMessage metohd to save
    //the message, then reload messages from the database 
    function sendMessage(event) {
        event.preventDefault();
        if (formObject.message) {
            API.postMessage({
                message: formObject.message
            })
                .then(res => loadGroup())
                .catch(err => console.log(err));
        }
    };
 
// a lot of what is here in the example from 21.5, we have in the actual component
// rather here in the page?
  return (
    <div className="app__body">
      <Sidebar />
      <Chat 
        handleInputChange={handleInputChange} 
        sendMessage={sendMessage} 
        messages={messages}
      />
      
    </div>
  );
}
export default Group;
