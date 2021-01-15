import { Avatar } from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import { GroupContext } from "../../utils/GroupStore";

import "./SideBarChat.css";

function SideBarChat() {
  const { groupState, setGroupState } = useContext(GroupContext);
  console.log("bbbbb")
  console.log(groupState.subgroups._id);

  return (
    <div>
      {/* <Avatar /> */}
      
      {groupState.subgroups.map((subgroup) => (
        <div className="sidebar__chat">
          <h2
            key={subgroup._id}
            className="sidebar__chat__h2"
            value={subgroup._id}
            // onClick={}
          >
            {subgroup.name}
          </h2>
          {subgroup.subGroupMembers.map((member) => <p>
            {member.name}
          </p>)}
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
