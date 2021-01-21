// Global context for User info
import React, { useState } from "react";

let initialUserState = {
  loggedIn: false,
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  password: "",
  groups: [{ _id: "weirdandgilly", name: "spidersfrommars" }],
  subgroups: [{ id_: "jeangenie", name: "diamonddogs" }],
};

export const UserContext = React.createContext();

const UserStore = ({ children }) => {
  const [userState, setUserState] = useState();

  return (
    <UserContext.Provider value={{ userState, setUserState }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserStore;
