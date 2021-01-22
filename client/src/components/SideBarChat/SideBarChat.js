import { Avatar } from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../utils/UserStore";
import { GroupContext } from "../../utils/GroupStore";
import { CurrentGroupContext } from "../../utils/CurrentGroupStore";
import { CurrentSubGroupContext } from "../../utils/CurrentSubGroupStore";
import API from "../../utils/API";
import "./SideBarChat.css";
import { ContactSupportOutlined } from "@material-ui/icons";

function SideBarChat(props) {
  const { userState, setUserState } = useContext(UserContext);
  const { groupState, setGroupState } = useContext(GroupContext);
  const { currentGroupState, setCurrentGroupState } = useContext(
    CurrentGroupContext
  );
  const { currentSubGroupState, setCurrentSubGroupState } = useContext(
    CurrentSubGroupContext
  );

  let localGroupID = "";

  function loadSubGroup(name) {
    let subGroupName = name;
    console.log("Load SubGroup");
    API.getGroup(subGroupName)
      .then((res) => {
        // console.log("load Sub Group response");
        // console.log(res);
        // console.log(localGroupID);
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
            //console.log(localGroupID);
            props.changeGroup(currentGroupState._id, groupState._id);
            loadSubGroup(groupState.name);
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
                onClick={() => {
                  props.changeGroup(currentGroupState._id, subgroup._id);
                  loadSubGroup(subgroup.name);
                }}
              >
                {subgroup.name}
              </h2>
            </div>
          ))}
          ;
        </div>
      )}
      ;
    </div>
  );
}

export default SideBarChat;
