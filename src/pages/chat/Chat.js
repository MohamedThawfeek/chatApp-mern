/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./Chat.css";
import { Avatar, Button, IconButton } from "@material-ui/core";
import {
  SearchOutlined,
  AttachFile,
  MoreVert,
  InsertEmoticon,
  Send,
} from "@material-ui/icons";
import axios from "../../Components/axios/index";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import Picker from "emoji-picker-react";

const Chat = () => {
  const socket = io("https://my-first-app-chat-app.herokuapp.com");
  const user = useSelector((state) => state.user);
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [roomMessages, setRoomMessages] = useState([]);
  const [chosenEmoji, setChosenEmoji] = useState(false);

  const onEmojiClick = (e, emojiObject) => {
    setInput((pre) => pre + emojiObject.emoji);

    setChosenEmoji(false);
  };

  useEffect(() => {
    const result = async () => {
      if (roomId) {
        const response = await axios.get(`/rooms/${roomId}`);
        setRoomName(response.data.name);
        setUpdatedAt(response.data.updatedAt);

        const msg = await axios.get(`/message/${roomId}`);
        setRoomMessages(msg.data);
      }
    };
    result();
  }, [roomId]);

  useEffect(() => {
    socket.on("new message", (messageDetails) => {
      setRoomMessages((premsg) => [...premsg, messageDetails]);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const sendMessage = async () => {
    if (!input) {
      return;
    }

    await axios.post("/message/new", {
      message: input,
      name: user.displayName,
      uid: user.uid,
      timestamp: new Date(),
      roomId: roomId,
    });

    setInput("");
  };

  return (
    <div className="chats">
      {roomName ? (
        <div className="chat">
          <div className="chat__header">
            <Avatar
              src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
            />
            <div className="chat__headerInfo">
              <h3>{roomName ? roomName : "Welcome to Whatsapp"}</h3>
              <p>
                {updatedAt
                  ? `last seen at ${new Date(updatedAt)
                      .toString()
                      .slice(0, 25)}`
                  : "Click any groups"}
              </p>
            </div>

            <div className="chat__headerright">
              <IconButton>
                <SearchOutlined />
              </IconButton>
              <IconButton>
                <AttachFile />
              </IconButton>
              <IconButton>
                <MoreVert />
              </IconButton>
            </div>
          </div>

          <div className="chat__body">
            {roomMessages.map((message, index) => (
              <p
                className={`chat__message ${
                  message.uid === user.uid && "chat__reciver"
                } `}
                key={index}
              >
                <span className="chat__name">{message.name}</span>
                {message.message}
                <span className="chat__timestamp">
                  {new Date(message.timestamp).toString().slice(0, 25)}
                </span>
              </p>
            ))}
          </div>

          <div className="chat__footer">
            <img
              className="emoji-icon"
              src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
              alt=""
              onClick={(e) => setChosenEmoji((val) => !val)}
            />

            <input
              type="text"
              placeholder="Message"
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
            <Button type="submit" onClick={sendMessage}>
              <Send />
            </Button>
          </div>
          {chosenEmoji && (
            <Picker
              pickerStyle={{ width: "100%" }}
              onEmojiClick={onEmojiClick}
            />
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Chat;
