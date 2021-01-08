import axios from "axios";

export default {
    saveUser: function(user) {
        return axios.post("/api/user/new", user);
    },

saveGroup: function(group) {
    return axios.post("/api/group", group)
}
}