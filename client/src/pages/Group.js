import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Chat from "../components/Chat/Chat";
function Group() {
  return (
    <div className="app__body">
      <Sidebar />
      <Chat />
    </div>
  );
}
export default Group;