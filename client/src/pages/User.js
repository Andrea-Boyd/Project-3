import React, { useState, useEffect } from "react";
import API from "../utils/API";
import "./User.css";

function User() {
  const [groups, setGroups] = useState({}); //groups that users are part of

  useEffect(() => {
    loadGroups();
  }, []);

  function loadGroups() {
    API.loadGroup({});
  }

  function handleInputChange(event){
const {name, value} = event.target;
setGroups({...groups, [name]: value})
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    API.saveGroup({
      name: groups.groupName,
    })
};
  
  

  return (
    <div user__container>
      <form>
        <input
          onSubmit={handleSubmit}
          className="user-form-control"
          type="text"
          placeholder="Enter A New Group"
          name="groupName"
          onChange={handleInputChange}
        />

        <button onClick="" className="user__btn">
      
        </button>
      </form>

      <div>
        <button>{groups}</button>
      </div>
    </div>
  );
}

export default User;
