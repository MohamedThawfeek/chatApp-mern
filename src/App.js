import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Chat from "./pages/chat/Chat";
import Login from "./pages/Login/Login";
import Sidebar from "./Components/sidebar/Sidebar";

const App = () => {
  const user = useSelector((state) => state.user);

  useEffect(()=>{

    localStorage.setItem("myData", JSON.stringify(user));


  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[user])
  return (
    <Router>
      {!user ? (
        <Login />
      ) : (
        <>
          <div className="app">
            <Sidebar />
            <Routes>
              <Route path="/" element={<Chat />} />
              <Route path="/rooms/:roomId" element={<Chat />} />
            </Routes>
          </div>
        </>
      )}
    </Router>
  );
};

export default App;
