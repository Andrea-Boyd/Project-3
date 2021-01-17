import { Avatar } from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../utils/UserStore";
import { GroupContext } from "../../utils/GroupStore";
import { CurrentGroupContext } from "../../utils/CurrentGroupStore";
import { CurrentSubGroupContext } from "../../utils/CurrentSubGroupStore";
import API from "../../utils/API";
import "./SideBarChat.css";

function SideBarChat(props) {
  const { userState, setUserState } = useContext(UserContext);
  const { groupState, setGroupState } = useContext(GroupContext);
  const { currentGroupState, setCurrentGroupState } = useContext(
    CurrentGroupContext
  );
  const { currentSubGroupState, setCurrentSubGroupState } = useContext(
    CurrentSubGroupContext
  );

  // This code is attempting to compare subgroups in userState to subgroups in GroupState
  // and only display subgroups that are in both
  // const [currentSubGroupState, setCurrentSubGroupState] = useState([
  //   { name: "", _id: "", subGroupMembers: [{ name: "", _id: "" }] },
  // ]);

  // let currentUsersSubGroups = [];

  // const filterSubGroups = async () => {
  //   for (let i = 0; i < userState.subgroups.length; i++) {
  //     for (let j = 0; j < groupState.subgroups.length; j++) {
  //       if (userState.subgroups[i]._id === groupState.subgroups[j]._id) {
  //         currentUsersSubGroups.push(groupState.subgroups[j]);
  //       }
  //     }
  //   }
  //   return currentUsersSubGroups;
  //   console.log(currentUsersSubGroups);
  //   setTimeout(() => {
  //     setCurrentSubGroupState(currentUsersSubGroups);
  //   }, 500);
  // };

  // let filterSubGroups = new Promise((resolve, reject) => {
  //   userState.subgroups.forEach((userSubGroup, index, array) => {
  //     groupState.subgroups.forEach((groupSubGroup) => {
  //       if (userSubGroup._id === groupSubGroup._id) {
  //         currentUsersSubGroups.push(groupSubGroup);
  //         if (index === array.length - 1) resolve();
  //       }
  //     });
  //   });
  // });

  // useEffect(() => {
  //   filterSubGroups.then(() => {
  //     console.log(currentUsersSubGroups);
  //     setCurrentSubGroupState(currentUsersSubGroups);
  //   });
  // }, []);

  function loadSubGroup(e) {
    let subGroupName = e.target.innerHTML;
    console.log("Load SubGroup");
    API.getGroup(subGroupName)
      .then((res) => {
        console.log("load Sub Group response");
        console.log(res);
        setCurrentGroupState(res.data);
        //console.log(groupState);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      {/* <Avatar /> */}
      <div className="sidebar__chat">
        <h2
          key={groupState._id}
          className="sidebar__chat__h2"
          value={groupState._id}
          onClick={() => {
            setCurrentGroupState(groupState);
          }}
        >
          {groupState.name}
        </h2>
      </div>
      {currentSubGroupState._id === "" ? (
        <div></div>
      ) : (
        <div>
          {currentSubGroupState.map((subgroup) => (
            <div className="sidebar__chat">
              <h2
                key={subgroup._id}
                className="sidebar__chat__h2"
                value={subgroup._id}
                onClick={loadSubGroup}
              >
                {subgroup.name}
              </h2>
              {subgroup.subGroupMembers.map((member) => (
                <p>{member.name}</p>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* {currentSubGroupState.map((subgroup) => (
        <div className="sidebar__chat">
          <h2
            key={subgroup._id}
            className="sidebar__chat__h2"
            value={subgroup._id}
            onClick={loadSubGroup}
          >
            {subgroup.name}
          </h2>
          {subgroup.subGroupMembers.map((member) => (
            <p>{member.name}</p>
          ))}
        </div>
      ))} */}
    </div>
  );
}

export default SideBarChat;
