import React, { useState } from "react";
import { CardContent, Card, CardMedia, Typography, Box } from "@mui/material";
// import { makeStyles } from "@material-ui/styles";

import loginImage from "../../../assets/loginImage.svg";
import Logo from "../../../assets/Logo.svg";
import Button from "../../themeComponents/button";
import "./login.scss";
import IInput from "../../themeComponents/input";
import { validateEmail } from "../../../utils/globalFunctions";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: false,
    password: false,
  });

  const handleSubmit = () => {
    if (!validateEmail(user.email)) {
      setError({ ...error, email: true });
      return;
    }
    if (user.password.length < 5) {
      setError({ ...error, password: true });
      return;
    }
    if (user.email.trim().length !== 0 && user.password.trim().length !== 0) {
      window.location.href = "/app/dashboard";
    }
  };

  const onChangeInput = (e) => {
    setError({
      email: false,
      password: false,
    });
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <Box component="main" className="login-container">
      <Card className="login-card">
        <Box className="login-left-container">
          <CardMedia
            component="img"
            className="login-card-img"
            image={loginImage}
            alt="logo"
          />
        </Box>
        <Box component="div" className="login-right-container">
          <CardContent className="login-card-content" sx={{ padding: "0px" }}>
            <CardMedia
              component="img"
              image={Logo}
              alt="title"
              className="login-title"
            />
            <Box component="div" className="login-fields">
              <label style={{ marginBottom: "4px" }}>Email</label>
              <IInput
                value={user.email}
                type="email"
                label={"Email"}
                name="email"
                // variant={"standard"}
                className={"login-input"}
                onChangeInput={onChangeInput}
                // styleProps={{
                //   borderBottom:
                //     error && error.password
                //       ? "2px solid #ee5353"
                //       : "2px solid black",
                // }}
              />
              {error && error.email ? (
                <label style={{ marginBottom: "4px" }} className={"emailLabel"}>
                  Email is not valid
                </label>
              ) : null}
              <label style={{ marginBottom: "4px" }}>Password</label>
              <IInput
                value={user.password}
                type="password"
                name="password"
                // variant={"standard"}
                onChangeInput={onChangeInput}
                // styleProps={{
                //   borderBottom:
                //     error && error.password
                //       ? "2px solid #ee5353"
                //       : "2px solid black",
                // }}
              />
              {error && error.password ? (
                <label style={{ marginBottom: "4px" }} className={"emailLabel"}>
                  Password is not valid
                </label>
              ) : null}
              <Box component="div" className="login-buttons">
                <Typography component="div" className="forgot-password">
                  Forgot Password?
                </Typography>
                <Button
                  type={
                    user.email === "" || user.password === ""
                      ? "primary-small-disabled"
                      : "primary-small"
                  }
                  handleClick={handleSubmit}
                >
                  Login
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
}
