import axios from "axios";

export default {
  saveUser: function (user) {
    return axios.post("/api/users", user);
  },

  loginUser: function(credentials) {
    return axios.post("/api/login", credentials )
  }
};
