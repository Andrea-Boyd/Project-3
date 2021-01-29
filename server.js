// Imports
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const flash = require("connect-flash");
const PORT = process.env.PORT || 3001;

const http = require("http");
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/MessageApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(
  session({ secret: "keyboard cat", resave: false, saveUninitialized: false })
);

app.use(cookieParser("secretcode"));
const passport = require("./config/passport.js");
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  return next();
});

app.use(routes);

//Server listener and Socket.io functionality
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

io.on("connection", (socket) => {
  console.log("New user connected");
  //console.log(socket.id);

  socket.on("Join Group Request", (id) => {
    console.log("User has joined room: " + id);
    socket.join(id);
  });

  socket.on("Change Group Request", (data) => {
    console.log("Change Group Request");
    socket.leave(data.currentID);
    socket.join(data.newID);
  });

  socket.on("new message", (data) => {
    console.log("Recieved New Message Alert");

    io.to(data.currentGroup).emit("message check", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});
