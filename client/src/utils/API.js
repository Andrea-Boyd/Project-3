import axios from "axios";

export default {
  // Gets all groups a user is in
  getUser: function() {
    return axios.get("/api/users/" + id);
  },
  // Gets a group by id to view messages in that group
  getGroups: function(id) {
    return axios.get("/api/group/" + id);
  },

  //Posts a message to the database
  postMessage: function(messageBody) {
    return axios.post("/api/group/", messageBody);
  }
};
    saveUser: function(user) {
        return axios.post("/api/user/new", user);
    }
}
