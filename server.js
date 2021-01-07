const express = require("express");
const io = require("socket.io");

const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(routes);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/MessageApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());




//Socket.io functionality to be built
// io.on("connection", (socket) => {
//   console.log("a user is connected");
// });

app.listen(PORT, function () {
  console.log(`Server is now listening on PORT ${PORT}!`);
});
