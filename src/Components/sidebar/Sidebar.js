import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { useSelector } from "react-redux";
import { Avatar, Button, IconButton } from "@material-ui/core";
import {
  DonutLarge,
  Comment,
  Search,
  PowerSettingsNewOutlined,
} from "@material-ui/icons";
import SidebarChart from "../sibarchart/SidebarChart";
import axios from "../axios/index";
import io from "socket.io-client";
import { useDispatch } from "react-redux";
import { addUser } from "../Redux/action/User";

const Sidebar = () => {
  const user = useSelector((state) => state.user);
  const [rooms, setRooms] = useState([]);
  const socket = io("https://my-first-app-chat-app.herokuapp.com");

  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(addUser(null));

    window.localStorage.removeItem('loginData')

  };

  useEffect(() => {
    const result = async () => {
      const response = await axios.get("/rooms/all");
      setRooms(response.data);
      console.log(response.data);
    };
    result();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on("new Room", (roomDetails) => {
      setRooms((preroom) => [...preroom, roomDetails]);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user.photoURL} />
        <div className="sidebar__right">
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <Comment />
          </IconButton>
          <Button type="submit" onClick={signOut}>
            <PowerSettingsNewOutlined />
          </Button>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="input">
          <Search />
          <input type="text" placeholder="Search" />
        </div>
      </div>

      <div className="sidebar__chat">
        <SidebarChart addnewchart />

        {rooms.map((room) => (
          <SidebarChart key={room._id} name={room.name} id={room._id} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
