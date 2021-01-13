import axios from "axios";

export default {
  // Gets all groups a user is in
  getUser: function () {
    return axios.get("/api/users/");
  },
  // Gets a group by id to view messages in that group
  getGroups: function (id) {
    return axios.get("/api/group/" + id);
  },

  // logs user in by email
  loginUser: function (credentials) {
    return axios.post("/api/users/login", credentials);
  },

  // Gets all groups a user is in
  getUser: function () {
    return axios.get("/api/users/");
  },
  // Gets a group by id to view messages in that group
  getGroups: function (id) {
    return axios.get("/api/group/" + id);
  },

  createGroup: function (groupName) {
    console.log("API.createGroup funciton");
    return axios.post("/api/groups/" + groupName);
  },

  createSubGroup: function (subGroup, users) {
    return axios.post("/api/groups/subgroup/" + subGroup, users);
  },

  //Posts a message to the database
  postMessage: function (messageBody, groupName) {
    return axios.put("/api/groups/" + groupName, messageBody);
  },

  saveUser: function (user) {
    return axios.post("/api/users/", user);
  },

  getGroup: function (groupName) {
    return axios.get("/api/groups/" + groupName);
  },

  getUser: function (username) {
    return axios.get("/api/users/" + username);
  },
};
