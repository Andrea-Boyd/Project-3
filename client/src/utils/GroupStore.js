// Global Context for current Goup info
import React, { useState } from "react";

const initialGroupState = {
  name: "",
  subgroups: "",
  messages: [
    {
      name: "Amin",
      text: "If you are seeing this, something went wrong",
      date: Date.now(),
    },
  ],
  groupMembers: [
    {
      name: "",
    },
  ],
};

export const GroupContext = React.createContext();

const GroupStore = ({ children }) => {
  const [groupState, setGroupState] = useState(initialGroupState);

  return (
    <GroupContext.Provider value={{ groupState, setGroupState }}>
      {children}
    </GroupContext.Provider>
  );
};

export default GroupStore;
