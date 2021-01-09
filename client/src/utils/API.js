import axios from "axios";

export default {
  saveUser: function (user) {
    return axios.post("/api/users", user);
  },

  loginUser: function (credentials) {
    return axios.post("/api/users/login",   credentials);
  },

  saveGroup: function (groupName) {
    console.log("API.saveGroup");
    return axios.post("/api/groups/" + groupName);
  },

  postMessage: function (messageBody) {
    return axios.post("/api/group/", messageBody);
  },

  getGroups: function (groupName) {
    return axios.get("/api/groups/" + groupName);
  },

  getUser: function (username) {
    return axios.get("/api/users/" + username);
  },
};
