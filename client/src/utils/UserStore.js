// Global context for User info
import React, { useState } from "react";

let initialUserState = {
  first_name: "David",
  last_name: "Bowie",
  username: "manwhofelltoearth47",
  email: "ziggy@stardust.com",
  password: "spaceoddity",
  groups: [{ _id: "weirdandgilly", name: "spidersfrommars" }],
  subgroups: [{ id_: "jeangenie", name: "diamonddogs" }],
};

export const UserContext = React.createContext();

const UserStore = ({ children }) => {
  const [userState, setUserState] = useState(initialUserState);

  return (
    <UserContext.Provider value={{ userState, setUserState }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserStore;
