import React from "react";
import "./Sidebar.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import { Avatar, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChatIcon from "@material-ui/icons/Chat";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import SideBarChat from "../SideBarChat/SideBarChat";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import NewGroupModal from "../../NewGroupModal/NewGroupModal";

function Sidebar(props) {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar>K</Avatar>
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlinedIcon />
          <input placeholder="Search" type="text"></input>
        </div>
        <NewGroupModal />
      </div>

      <div className="sidebar__chats">
        <SideBarChat />
      </div>
    </div>
  );
}

export default Sidebar;
