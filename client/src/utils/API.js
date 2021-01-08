import axios from "axios";

export default {
  saveUser: function (user) {
    return axios.post("/api/users", user);
  },
};

saveGroup: function(group) {
    return axios.post("/api/group", group)