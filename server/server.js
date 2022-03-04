const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const apiRouter = require("./router");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: " https://my-first-mern-chat-app.netlify.app",
    methods: ["GET", "POST"],
  },
});

connectDB();

app.use(express.json());
app.use(cors());
app.use("/", apiRouter);

app.get("/", (req, res) => {
  res.send("backend");
});

const db = async () => {
  try {
    const db = await mongoose.connection;

    db.once("open", () => {
      console.log("socket is ready");

      const roomCollection = db.collection("rooms");
      const changeStream = roomCollection.watch();

      changeStream.on("change", (change) => {
        switch (change.operationType) {
          case "insert":
            const roomDetails = change.fullDocument;
            io.emit("new Room", roomDetails);
            break;
        }
      });

      const messageCollection = db.collection("messages");
      const changeStream1 = messageCollection.watch();

      changeStream1.on("change", (change) => {
        switch (change.operationType) {
          case "insert":
            const messageDetails = change.fullDocument;
            io.emit("new message", messageDetails);
            break;
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
};

db();

server.listen(PORT, () => {
  console.log(`Server is up and Running ${PORT}`);
});
