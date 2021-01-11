import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"


toast.configure()

export default {
     notify: function()  {
        toast("You are logged in")
      },
    
       allFields: function ()  {
        toast("please enter all fields")
      },

     allFields: function() {
        toast("please enter all fields")
      },
     userPassword: function() {
        toast("passwords don't match")
      }
    
}