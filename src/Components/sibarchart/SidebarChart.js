import React, { useEffect, useState } from "react";
import "./SidebarChart.css";
import { Avatar } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import axios from "../axios/index";
import { Link, useNavigate } from "react-router-dom";

const SidebarChart = ({ addnewchart, name, id }) => {
  const [seed, setSeed] = useState("");
  // eslint-disable-next-line no-unused-vars

  const navigate = useNavigate();

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = async () => {
    const roomName = prompt("Please enter the name for the group");
    if (roomName) {
      try {
        await axios.post("/rooms/create", {
          groupName: roomName,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const roomDel = async () => {
    if (name) {
      try {
        await axios.post("/rooms/delete", {
          roomName: name,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  const msgDel = async () => {
    if (id) {
      try {
        await axios.post("/message/delete", {
          roomid: id,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const nav = () => {
    navigate("/");
  };

  const doubleDel = () => {
    roomDel();
    msgDel();
    nav();
  };

  return !addnewchart ? (
    <div className="side">
      <Link to={`/rooms/${id}`}>
        <div className="sidebarchat">
          <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
          <div className="sibarchat__info">
            <h2>{name}</h2>
          </div>
        </div>
      </Link>
      <Delete onClick={doubleDel} className="del" />
    </div>
  ) : (
    <div className="sidebarchat__new" onClick={createChat}>
      <h2>Add new Chat</h2>
    </div>
  );
};

export default SidebarChart;
