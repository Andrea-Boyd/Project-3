// Global Context for Current SubGoup info
import React, { useState } from "react";

const initialSubGroupState = [
  { name: "test", _id: "123", subGroupMembers: [{ name: "Zak", _id: "321" }] },
];

export const CurrentSubGroupContext = React.createContext();

const CurrentSubGroupStore = ({ children }) => {
  const [currentSubGroupState, setCurrentSubGroupState] = useState(
    initialSubGroupState
  );

  return (
    <CurrentSubGroupContext.Provider
      value={{ currentSubGroupState, setCurrentSubGroupState }}
    >
      {children}
    </CurrentSubGroupContext.Provider>
  );
};

export default CurrentSubGroupStore;
