// import { Avatar, ListItemAvatar } from '@material-ui/core'
import React, { useContext, useState, useEffect, useRef } from "react";
import "./Chat.css";
import { AttachFile, MoreVert, SearchOutlined } from "@material-ui/icons";
import { Avatar, IconButton } from "@material-ui/core";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import Message from "../Message/Message";
import { UserContext } from "../../utils/UserStore";
import Picker from "emoji-picker-react";
import Popup from "reactjs-popup";
//import { GroupContext } from "../utils/GroupStore";

function Chat(props) {
  const { userState, setUserState } = useContext(UserContext);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [message, setMessage] = useState("");
  const [cursorPosition, setCursorPosition] = useState();
  const inputRef = useRef();

  //make new handleinput function "buildMessage"
  // string concat

  const selectEmoji = (event, emojiObject) => {
    console.log(emojiObject)
    console.log(inputRef.current)
    inputRef.current.value += " " + emojiObject.emoji
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

  const buildMessage = e => {
    setMessage(e.target.value);
  };

  // const handleShowEmojis = () => {
  //   inputRef.current.focus();
  //   setChosenEmoji(!chosenEmoji);
  // };

  // useEffect(() => {
  //   inputRef.current.selectionEnd = cursorPosition;
  // }, [cursorPosition]);

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
        <Popup
          className="popup__content"
          trigger={<InsertEmoticonIcon />}
          position="top center"
          closeOnDocumentClick
          nested
        >
          <div>
            {chosenEmoji ? (
              <span>You chose: {chosenEmoji.emoji}</span>
            ) : (
              <span>No emoji Chosen</span>
            )}
            <Picker onEmojiClick={selectEmoji} />
          </div>
        </Popup>
        <form>
          <input
            name="message"
            onChange={buildMessage} //buildMessage
            placeholder="Type a message"
            type="text"
            // value={message}
            ref={inputRef}
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
