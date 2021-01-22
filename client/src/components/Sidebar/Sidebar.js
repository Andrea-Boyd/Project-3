import React, { useContext } from "react";
import "./Sidebar.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import { Avatar, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChatIcon from "@material-ui/icons/Chat";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import SideBarChat from "../SideBarChat/SideBarChat";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import NewGroupModal from "../NewGroupModal/NewGroupModal";
import { GroupContext } from "../../utils/GroupStore";
import NoteIcon from "@material-ui/icons/Note";
import Logo from "../../images/logo_transparent.png";

function Sidebar(props) {
  const { groupState, setGroupState } = useContext(GroupContext);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__headerRight"></div>
      </div>
      <div className="sidebar__search">
        {/* <div className="sidebar__searchContainer">
          <SearchOutlinedIcon />
          <input placeholder="Search" type="text"></input>
        </div> */}

        <Popup
          className="popup__content"
          trigger={<button className="note__button">Kit Kode</button>}
          position="bottom right"
          closeOnDocumentClick
          nested
        >
          {groupState.inviteCode}
        </Popup>

        <NewGroupModal />
      </div>

      <div className="sidebar__chats">
        <SideBarChat changeGroup={props.changeGroup} />
      </div>
    </div>
  );
}

export default Sidebar;
