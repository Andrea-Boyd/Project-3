import React, { useState, useEffect } from "react";
import API from "../utils/API";
import "./User.css";

function User() {
  const [groups, setGroups] = useState({}); //groups that users are part of

  let groupsTest = [
    { name: "Javascript", _id: "1" },
    { name: "React", _id: "2" },
  ];

  useEffect(() => {
    loadGroups();
  }, []);

  function loadGroups() {
    API.getUser()
      .then((res) => setGroups(res.data))
      .catch((err) => console.log(err));
  }

  function handleInputChange(event) {
    console.log(event.target.value);
    const { name, value } = event.target;
    setGroups({ ...groups, [name]: value });
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    console.log(groups);
    API.saveGroup({
      name: groups.groupName,
    });
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
          {groupsTest.map((btn) => (
            <Link to="">
              <button
                key={btn._id}
                className="group__btn"
                value={btn._id}
                
              >
                {btn.name}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default User;
