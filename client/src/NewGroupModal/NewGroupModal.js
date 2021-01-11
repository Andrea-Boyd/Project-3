import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./NewGroupModal.css";
import { Avatar } from "@material-ui/core";
import { UserContext } from "../utils/UserStore";

function NewGroupModal() {
  const [modalUser, setModalUser] = useContext(UserContext)

  let modalTest = [
    { name: "Zak Monnet", _id: "1" },
    { name: "Chad Tarpey", _id: "2" },
    { name: "Andrea Boyd", _id: "2" },
    { name: "Kevin Pulley", _id: "2" },
  ];

  return (
    <Popup
      className="popup__content"
      trigger={<button className="button"> Add New Group </button>}
      position="bottom center"
      closeOnDocumentClick
      nested
    >
      <div modal__container>
        <div modal__content>
          {/* Enter Group Name */}
          <form>
            <input
              className="modal__group__name"
              onChange=""
              placeholder="Enter Group Name"
            />
          </form>
        </div>

        <div>!Selected Names Go Here!</div>
        <br></br>
        <div className="modal__group__members">
          Click to Add to Group
          <button>
            <Avatar />
          </button>
          {modalTest.name}
        </div>

        <button
          className="modal__submit__button"
          // onClick={handleFormSubmit}
          type="submit"
        >
          Submit
        </button>
      </div>
    </Popup>
  );
}

export default NewGroupModal;
