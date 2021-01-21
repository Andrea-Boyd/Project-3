// Global Context for Current Group/Subgroup that is being displayed in Chat
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
      name: "Admin",
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

export const CurrentGroupContext = React.createContext();

const CurrentGroupStore = ({ children }) => {
  const [currentGroupState, setCurrentGroupState] = useState();

  return (
    <CurrentGroupContext.Provider
      value={{ currentGroupState, setCurrentGroupState }}
    >
      {children}
    </CurrentGroupContext.Provider>
  );
};

export default CurrentGroupStore;
