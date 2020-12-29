import { Avatar } from "@material-ui/core";
import React from "react";
import "./SideBarChat.css";
function SideBarChat() {
  return (
    <div>
      <div className="sidebarChat">
        <Avatar />
        <div>
            <h2>Room Name</h2>
            <p>This is last message</p>
        </div>
      </div>
    </div>
  );
}
export default SideBarChat;