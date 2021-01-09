import axios from "axios";



export default {
  saveUser: function (user) {
    return axios.post("/api/users", user)
  },

  loginUser: function (credentials) {
    return axios.post("/api/login/", credentials)
  },

  saveGroup: function (group) {
    return axios.post("/api/group", group)
  },

  postMessage: function (messageBody) {
    return axios.post("/api/group/", messageBody);
  },

  getGroups: function (id) {
    return axios.get("/api/group/" + id);
  },

  getUser: function () {
    return axios.get("/api/users/");
  },
}