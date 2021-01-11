// Will be used to hold global contexts
import React, { useState, useEffect } from "react";

let initialUserState = {
  first_name: "David",
  last_name: "Bowie",
  username: "manwhofelltoearth47",
  email: "ziggy@stardust.com",
  password: "spaceoddity",
  groups: [{ _id: "weirdandgilly", name: "spidersfrommars" }],
  subgroups: [{ id_: "jeangenie", name: "diamonddogs" }],
};

const initialGroupState = {
  name: "",
  subgroups: "",
  messages: [
    {
      name: "",
      text: "",
      date: "",
    },
  ],
  groupMembers: [
    {
      name: "",
    },
  ],
};

export const UserContext = React.createContext();

export const GroupContext = React.createContext();

const UserStore = ({ children }) => {
  const [userState, setUserState] = useState(initialUserState);

  useEffect(() => {
    initialUserState = userState;
    console.log(initialUserState);
  }, [userState]);

  return (
    <UserContext.Provider value={{ userState, setUserState }}>
      {children}
    </UserContext.Provider>
  );
};

const GroupStore = ({ children }) => {
  const [groupState, setGroupState] = useState({ initialGroupState });

  return (
    <GroupContext.Provider value={[groupState, setGroupState]}>
      {children}
    </GroupContext.Provider>
  );
};

export default UserStore;

//export default GroupStore;
