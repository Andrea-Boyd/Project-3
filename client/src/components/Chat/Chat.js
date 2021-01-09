// import { Avatar, ListItemAvatar } from '@material-ui/core'
import React from 'react'
import './Chat.css'
import {AttachFile, MoreVert, SearchOutlined} from "@material-ui/icons"
import {Avatar, IconButton} from "@material-ui/core"
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon"
import Message from '../Message/Message'

function Chat(props) {
  //console.log(messages);
  //console.log(sendMessage);
  //let messages = [{name:"Andrea",message:"Please work",timeStamp:"Today 8pm"}];
    return (
      <div className="chat">
        <div className="chat__header">
          <div className="chat__headerInfo">
            <Avatar />
            <h3>{props.messages.name}</h3>
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
        <Message messages= {props.messages} />

        <div className="chat__footer">
          <InsertEmoticonIcon />
          <form>
            <input 
             name = "message"
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