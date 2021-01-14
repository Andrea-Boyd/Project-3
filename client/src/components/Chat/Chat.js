// import { Avatar, ListItemAvatar } from '@material-ui/core'
import React, { useContext } from "react";
import "./Chat.css";
import { AttachFile, MoreVert, SearchOutlined } from "@material-ui/icons";
import { Avatar, IconButton } from "@material-ui/core";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import Message from "../Message/Message";
import { UserContext } from "../../utils/UserStore";
import { Redirect, Link } from "react-router-dom";

//import { GroupContext } from "../utils/GroupStore";

function Chat(props) {
  const { userState, setUserState } = useContext(UserContext);

  return (
    <div className="chat">
      <div className="chat__header">
        <div className="chat__headerInfo">
          <Avatar />
          <h3>{userState.username}</h3>
          <p>Last seen at...</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
            <button onClick={props.logOutUser}>LogOut</button>
            <Link to={"/user/" + userState.username} style={{ textDecoration: "none" }}>
              <button className="signup__btn">Back To User Page</button>
            </Link>
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <Message messages={props.messages} />

      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form>
          <input
            name="message"
            onChange={props.handleInputChange}
            placeholder="Type a message"
            type="text"
          />
          <button type="submit" onClick={props.sendMessage}>
            Send a Message
          </button>
          
        </form>
      </div>
    </div>
  );
}
export default Chat;
