// Importing expressjs
const express = require("express");
const app = express();
// Importing http and creating server on express
const server = require("http").createServer(app);
// Importing Cors module to relax the security applied to this API
const cors = require("cors");
// Imporing Cookie middleware which parses cookies attached to the client request object.
const cookieParser = require("cookie-parser");
// Imporing mongodb for database connection
const connectDB = require("./src/model/connects");
// Router module
const router = require("./src/routes/routes");
//Importing moment lib for time formating
const formatMsgs = require("./src/utils/msgFormat");
//Importing function for all users and current user
const {
  userJoins,
  getCurrentUser,
  userLeft,
  getRoomUsers,
} = require("./src/utils/users");

//is used to mount the specified middleware function(s) at the path which is being specified.
app.use(express.json());
app.use(
  cors({
    origin: "https://proj-chatter.netlify.app",
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(router);

const chatterBot = "Chatter";

// Importing socket.io
const io = require("socket.io")(server, {
  cors: {
    origin: "https://proj-chatter.netlify.app",
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  },
});

// Establishing a connection when a user connects
io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoins(socket.id, username, room);

    socket.join(user.room);

    // broadcast a message to client/sender only
    socket.emit("chat", formatMsgs(chatterBot, "Welcome to Chatter!"));

    //broadcast a message to all users except the sender
    socket.broadcast
      .to(user.room)
      .emit(
        "chat",
        formatMsgs(chatterBot, `${user.username} has joined the chat`)
      );

    // sending user and room info
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
    const myuser = getRoomUsers(user.room);
    console.log(myuser);
  });

  // Listen for chat message
  socket.on("chatMsg", (payload) => {
    const user = getCurrentUser(socket.id);
    io.to(user.room).emit("chat", formatMsgs(user.username, payload));
  });

  //it runs when client disconnects
  socket.on("disconnect", () => {
    const user = userLeft(socket.id);
    if (user) {
      //broadcast a message to all users including the sender
      io.to(user.room).emit(
        "chat",
        formatMsgs(chatterBot, `${user.username} has left the chat.`)
      );
      // sending user and room info
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});

// Server listens to port
connectDB()
  .then((port) => {
    server.listen(port);
  })
  .catch((err) => console.log(err));
