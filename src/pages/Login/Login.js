import React from "react";
import "./Login.css";
import { useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import { addUser } from "../../Components/Redux/action/User";
import { auth, google } from "../../Components/firebase/Firebase";
import GoogleIcon from "@mui/icons-material/Google";
import logo from "../../assets/logo.png";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const dispatch = useDispatch();

  const login = async () => {
    const result = await signInWithPopup(auth, google);
    dispatch(addUser(result.user));

    localStorage.setItem('loginData', JSON.stringify(result.user))

  };



  return (
    <div className="login">
      <img src={logo} alt="" />
      <Button onClick={login}>
        <GoogleIcon className="icon" />
        Sign in with google
      </Button>
    </div>
  );
};

export default Login;
