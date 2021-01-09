import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../utils/API";
import "./User.css";

function User() {
  const [user, setUser] = useState({}); //groups that users are part of
  const [newGroup, setNewGroup] = useState({});

  let groupsTest = [
    { name: "Javascript", _id: "1" },
    { name: "React", _id: "2" },
  ];

  let pathArray = window.location.pathname.split("/");
  let username = pathArray[2];

  useEffect(() => {
    loadUser(username);
  }, []);

  function loadUser(username) {
    console.log("before");
    console.log(username);
    API.getUser(username)
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  }
  function handleInputChange(event) {
    console.log(event.target.value);
    const { name, value } = event.target;
    setNewGroup({ ...newGroup, [name]: value });
  }
  function handleFormSubmit(e) {
    e.preventDefault();
    console.log(newGroup);
    API.saveGroup(newGroup.groupName)
      .then((res) => {
        console.log(res.data);
        window.location.replace(
          window.location.origin + "/user/" + username + "/" + res.data.name
        );
      })
      .catch((err) => console.log(err));
  }
  return (
    <>
      <div className="user__container">
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
        <div>
          {/* This condition will need to be changed when groupdata is being returned properly */}
          {user.groups === "0" ? (
            <div>
              {user.groups.map((group) => (
                <Link to={"/user/" + username + "/" + group.groupName}>
                  <button
                    key={group.id}
                    className="group__btn"
                    value={group.id}
                  >
                    {group.groupName}
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
export default User;
