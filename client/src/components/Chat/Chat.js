// import { Avatar, ListItemAvatar } from '@material-ui/core'
import React from 'react'
import './Chat.css'
import {AttachFile, InsertEmoticon, MoreVert, SearchOutlined} from "@material-ui/icons"
import {Avatar, IconButton} from "@material-ui/core"
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon"

function Chat() {
    return (
      <div className="chat">
        <div className="chat__header">
          <div className="chat__headerInfo">
            <Avatar />
            <h3>Room Name</h3>
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
        <div className="chat__body">
          <p className="chat__message">
            <span className="chat__name">Kevin</span>
            This is a Message
            <span className="chat__timestamp">{new Date().toUTCString()}</span>
          </p>
          <p className="chat__message chat__reciever">
            <span className="chat__name">Kevin</span>
            This is a Message
            <span className="chat__timestamp">{new Date().toUTCString()}</span>
          </p>
        </div>

        <div className="chat__footer">
          <InsertEmoticonIcon />
          <form>
            <input 
            // value={input}
            // onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
            />
            <button type="submit">
              Send a Message
            </button>
          </form>
        </div>
      </div>
    );
}
export default Chat