import React, { useState, useEffect, useContext } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./NewGroupModal.css";
import { Avatar } from "@material-ui/core";
import { UserContext } from "../../utils/UserStore";
import { GroupContext } from "../../utils/GroupStore";
import API from "../../utils/API";
import GroupAddIcon from "@material-ui/icons/GroupAdd";

function NewGroupModal() {
  const [newSubGroup, setNewSubGroup] = useState({});
  const [userFormState, setUserFormState] = useState([]);
  const { userState, setUserState } = useContext(UserContext);
  const { groupState, setGroupState } = useContext(GroupContext);

  let subGroupData = {};

  function refreshUser(username) {
    // console.log("before");
    // console.log(username);
    API.getUser(username)
      .then((res) => {
        console.log(res.data);
        setUserState(res.data);
      })
      .catch((err) => console.log(err));
  }

  // Builds array of objects with all info for Users in new Subgroup
  function buildUserForm(event) {
    console.log(event.target);
    const id = event.target.value;
    const name = event.target.innerHTML;
    const userObject = { name: name, _id: id };
    setUserFormState([...userFormState, userObject]);
    console.log(userFormState);
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setNewSubGroup({ ...newSubGroup, [name]: value });
  }

  function clearField() {
    let input = document.getElementById("modalName");
    input.value = "";
    console.log(input);
  }

  // Creates new subgroup then calls functions to add appropriate data to other group and user documents
  function handleFormSubmit(e) {
    e.preventDefault();
    console.log(newSubGroup);
    console.log(userFormState);
    API.createSubGroup(newSubGroup.subGroupName, userFormState)
      .then((res) => {
        console.log(res.data);
        // let subGroupName = res.data.name;
        // let subGroupId = res.data._id;
        let subGroupData = { name: res.data.name, _id: res.data._id };
        let subGroupUserData = {
          name: res.data.name,
          _id: res.data._id,
          subGroupMembers: res.data.groupMembers,
        };
        console.log(subGroupUserData);
        addSubGroupToUsers(res.data.groupMembers, subGroupData);
        addSubGroupToGroup(groupState._id, subGroupUserData);
        setUserFormState([]);
      })
      .catch((err) => console.log(err));
  }

  // Adds new subgroup info to User documents
  function addSubGroupToUsers(users, subGroupData) {
    let totalCount = users.length;
    let completedCount = 0;
    for (let i = 0; i < totalCount; i++) {
      API.addSubGroupToUser(users[i]._id, subGroupData)
        .then((res) => {
          console.log(res);
          completedCount += 1;
          if (completedCount === totalCount) {
            refreshUser(userState.username);
          }
        })
        .catch((err) => console.log(err));
    }
  }

  // Adds new subgroup info to outer Group document
  function addSubGroupToGroup(groupID, subGroupData) {
    API.addSubGroupToGroup(groupID, subGroupData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  return (
    <Popup
      className="popup__content"
      trigger={<button className="note__button"> Add Kluster </button>}
      position="bottom center"
      closeOnDocumentClick
      nested
    >
      <div className="modal__container">
        <div className="modal__content">
          {/* Enter Group Name */}
          <form>
            <input
              id="modalName"
              name="subGroupName"
              onSubmit={handleFormSubmit}
              className="modal__group__name"
              onChange={handleInputChange}
              placeholder="Enter Group Name"
            />
          </form>
        </div>

        <div>
          {userFormState.map((user) => (
            <button className="modal__submit__button">{user.name}</button>
          ))}
        </div>
        <br></br>
        <div className="modal__group__members">
          Click to Add to Group
          {groupState.groupMembers.map((groupMember) => (
            <button
              key={groupMember._id}
              className="sub__btn"
              value={groupMember._id}
              onClick={buildUserForm}
            >
              {groupMember.name}
              {/* <Avatar /> */}
            </button>
          ))}
        </div>

        <button
          className="modal__submit__button"
          onClick={(event) => {
            event.preventDefault();
            handleFormSubmit(event);
            clearField();
          }}
          type="submit"
        >
          Submit
        </button>
      </div>
    </Popup>
  );
}

export default NewGroupModal;
