// import { Avatar, ListItemAvatar } from '@material-ui/core'
import React, { useContext, useState, useEffect, useRef } from "react";
import "./Chat.css";
import { AttachFile, MoreVert, SearchOutlined } from "@material-ui/icons";
import { Avatar, IconButton } from "@material-ui/core";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import NoteIcon from "@material-ui/icons/Note";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import Message from "../Message/Message";
import { UserContext } from "../../utils/UserStore";
import Picker from "emoji-picker-react";
import Popup from "reactjs-popup";
import { Redirect, Link } from "react-router-dom";
import { GroupContext } from "../../utils/GroupStore";
import { CurrentGroupContext } from "../../utils/CurrentGroupStore";
import NewGroupModal from "../../NewGroupModal/NewGroupModal";

import API from "../../utils/API";

//import { GroupContext } from "../utils/GroupStore";

function Chat(props) {
  const { userState, setUserState } = useContext(UserContext);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [message, setMessage] = useState("");
  const [cursorPosition, setCursorPosition] = useState();
  const { groupState, setGroupState } = useContext(GroupContext);
  const { currentGroupState, setCurrentGroupState } = useContext(CurrentGroupContext);
  const inputRef = useRef();

  //make new handleinput function "buildMessage"
  // string concat

  const selectEmoji = (event, emojiObject) => {
    console.log(event);
    console.log(inputRef.current);
    inputRef.current.value += " " + emojiObject.emoji;
    // ref.focus();
    // const ref = inputRef.current.value;
    // const start = ref.substring(0, ref.selectionStart);
    // const end = ref.substring(ref.selectionStart);
    // const msg = start + emojiObject.emoji + end;
    // inputRef.current.value = msg
    // setMessage(msg);
    // inputRef.current.selectionEnd = start.length+emojiObject.emoji.length
    // setCursorPosition(start.length+emojiObject.length)
    // inputRef.current.focus();
    // setChosenEmoji(!chosenEmoji);
    // setChosenEmoji(emojiObject);
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };
  function clearField() {
    let input = document.getElementById("messageBar");
    input.value = "";
    console.log(input);
  }
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

  // const handleShowEmojis = () => {
  //   inputRef.current.focus();
  //   setChosenEmoji(!chosenEmoji);
  // };

  useEffect(() => {
    console.log(currentGroupState.groupMembers);
  }, []);

  return (
    <div className="chat">
      <div className="chat__header">
        <div className="chat__headerInfo">
          <Avatar />
          <h3>{userState.username}</h3>
          <p>Last seen at...</p>
        </div>
        <div className="chat__headerRight">
          <Link
            to={"/user/" + userState.username}
            style={{ textDecoration: "none" }}
          >
            <button className="signup__btn">Back To User Page</button>
          </Link>
          <button onClick={props.logOutUser}>LogOut</button>

          <Popup trigger={<EmojiPeopleIcon />} position="bottom right">
           
              {/* {currentGroupState.groupMembers.map((subMembers) => {
                <p>{subMembers.name}</p>
              })} */}

            
          </Popup>

          <Popup trigger={<MoreVert />} position="bottom right" nested>
            <div>
              {groupState.subgroups.map((subgroup) => (
                <div className="subgroup__hamburger">
                  <button
                    key={subgroup._id}
                    className="subgroup__hamburger__h2"
                    value={subgroup._id}
                    onClick={loadSubGroup}
                  >
                    {subgroup.name}
                  </button>
                </div>
              ))}
              <Popup
                trigger={
                  <button className="button">
                    {" "}
                    <NoteIcon />
                  </button>
                }
                position="bottom left"
                nested
              >
                <div>{groupState.inviteCode}</div>
              </Popup>
              <Popup
                trigger={<NewGroupModal />}
                position="bottom right"
                nested
              ></Popup>
            </div>
          </Popup>
        </div>
      </div>
      <Message messages={props.messages} />

      <div className="chat__footer">
        <Popup
          className="popup__content"
          trigger={<InsertEmoticonIcon />}
          position="top center"
          closeOnDocumentClick
          nested
        >
          <div>
            <Picker onEmojiClick={props.onEmojiClick} />
          </div>
        </Popup>
        <form>
          <input
            id="messageBar"
            name="message"
            onChange={props.handleInputChange}
            placeholder="Type a message"
            type="text"
            // value={message}
            ref={inputRef}
          />
          <button
            type="submit"
            onClick={(event) => {
              event.preventDefault();
              props.sendMessage();
              clearField();
            }}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
export default Chat;
