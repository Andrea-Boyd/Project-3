import React, { useContext } from "react";
import { UserContext } from "../../utils/UserStore";
import { GroupContext } from "../../utils/GroupStore";
import { CurrentGroupContext } from "../../utils/CurrentGroupStore";

function Message(props) {
  const { userState, setUserState } = useContext(UserContext);
  const { groupState, setGroupState } = useContext(GroupContext);
  const { currentGroupState, setCurrentGroupState } = useContext(
    CurrentGroupContext
  );
  //console.log(groupState);

  //let messages = currentGroupState.messages;
  //console.log(new Date(messages[0].date).toLocaleString());

  //adding something
  // let objDiv = document.getElementById("chat__body");
  // objDiv.scrollTop = objDiv.scrollHeight;
  
  // function differentMessage {
  //       if (message.name === currentGroupState.groupMembers.name) {

<<<<<<< HEAD
  if (currentGroupState) {
    return (
      <div id="chat__body" className="chat__body">
        {currentGroupState.messages.length ? (
          <div>
            {currentGroupState.messages.map((message) => (
              <p className="chat__message">
                <span className="chat__name">{message.name}</span>
                {`  ${message.text}`}
                <span className="chat__timestamp">
                  {new Date(message.date).toLocaleString()}
                </span>
              </p>
            ))}
          </div>
        ) : (
          <p className="chat__message">
            <span className="chat__name">Admin</span>
            Type in the box to send your first message
            <span className="chat__timestamp">{new Date().toUTCString()}</span>
          </p>
        )}
      </div>
    );
  } else {
    return (
      <p className="chat__message">
        <span className="chat__name">Admin</span>
        Type in the box to send your first message
        <span className="chat__timestamp">{new Date().toUTCString()}</span>
      </p>
    );
  }
=======
  //           }
  // }

  

  return (
    <div id="chat__body" className="chat__body">
      {messages.length ? (
        <div>
          {messages.map((message) => (

          
            <p className="chat__message">
              <span className="chat__name">
                {message.name}
                <span className="chat__timestamp">{new Date(message.date).toLocaleString()}</span>
                
              </span>
              {`  ${message.text}`}
              {/* <span className="chat__timestamp chat__name">
                {new Date(message.date).toLocaleString()}
              </span> */}
            </p>
          ))}
        </div>
      ) : (
        <p className="chat__message">
          <span className="chat__name">Admin</span>
          Type in the box to send your first message
          <span className="chat__timestamp">{new Date().toUTCString()}</span>
        </p>
      )}
    </div>
  );
>>>>>>> 5bf7a6893540eae5314ad67365a11252aeab3579
}
export default Message;
