import React, { useContext } from "react";
import "./Sidebar.css";
import SideBarChat from "../SideBarChat/SideBarChat";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import NewGroupModal from "../NewGroupModal/NewGroupModal";
import { GroupContext } from "../../utils/GroupStore";

function Sidebar(props) {
  const { groupState } = useContext(GroupContext);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__headerRight"></div>
      </div>
      <div className="sidebar__search">
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
