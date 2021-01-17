import { Avatar } from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import { GroupContext } from "../../utils/GroupStore";
import { CurrentGroupContext } from "../../utils/CurrentGroupStore";
import API from "../../utils/API";
import "./SideBarChat.css";

function SideBarChat(props) {
  const { groupState, setGroupState } = useContext(GroupContext);
  const { currentGroupState, setCurrentGroupState } = useContext(
    CurrentGroupContext
  );
  //console.log("bbbbb");
  //console.log(groupState.subgroups._id);

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

      {groupState.subgroups.map((subgroup) => (
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
          {/* {groupState.subgroups.map((subGroupMembers, index) => (
            <p
              key={subGroupMembers._id}
              className="sidebar__chat__p"
              value={subGroupMembers._id}
              // onClick={}
            >
              {subGroupMembers.subGroupMembers.name}
            </p>
          ))} */}
        </div>
      ))}
    </div>
  );
}
export default SideBarChat;