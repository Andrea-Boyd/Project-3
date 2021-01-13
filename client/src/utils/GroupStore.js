// Global Context for current Goup info
import React, { useState } from "react";

const initialGroupState = {
  name: "Test",
  subgroups: [
    {
      name: "Test SubGroup",
      _id: "123456789",
      subGroupMembers: [
        { name: "Zak", _id: "1234" },
        { name: "Andrea", _id: "4312" },
      ],
    },
    {
      name: "Another Test SubGroup",
      _id: "987654321",
      subGroupMembers: [
        { name: "Kevin", _id: "5678" },
        { name: "Chad", _id: "8765" },
      ],
    },
  ],
  messages: [
    {
      name: "Amin",
      text: "If you are seeing this, something went wrong",
      date: Date.now(),
    },
  ],
  groupMembers: [
    {
      name: "Zak",
      _id: "123",
    },
    { name: "KevinP", _id: "321" },
    { name: "Chad", _id: "1234" },
    { name: "Andrea", _id: "4321" },
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
