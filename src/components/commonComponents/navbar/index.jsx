import { ArrowDropDownOutlined } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { Avatar, Box, Container, Typography } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import React, { useState } from "react";
import "./navbar.scss";
import Logo from "../../../assets/Logo.svg";
import avatar from "../../../assets/avatar.png";
import IInput from "../../themeComponents/input";

const drawerWidth = 400;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  marginLeft: `calc(${theme.spacing(7)} + 1px)`,
  width: "auto",
  height: "70px",
  backgroundColor: "#FFFFFF",
  boxShadow: "0 1px 3px 0 rgba(0,0,0,0.15)",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    zIndex: 1,
  },
}));

// const settings = ["Profile", "Account", "Dashboard", "Logout"];
const Navbar = () => {
  // const [anchorElNav, setAnchorElNav] = React.useState(null);
  // const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [inputValue, setinputValue] = useState("");

  const handleInputChange = (e) => {
    setinputValue(e.target.value);
  };

  // const handleOpenNavMenu = (event) => {
  //   setAnchorElNav(event.currentTarget);
  // };
  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  // const handleCloseNavMenu = () => {
  //   setAnchorElNav(null);
  // };

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };

  return (
    <AppBar position="static" sx={{ height: "60px" }}>
      <Container
        maxWidth="xl"
        sx={{ width: "100%", height: "100%" }}
        className="navbar-container"
      >
        <Box className="logo-container">
          <img
            src={Logo}
            alt="logo"
            className="logo-image"
            width="160px"
            height="70px"
          />
        </Box>
        <Box className="user-profile-container">
          <IInput
            isSearch={true}
            value={inputValue}
            onChangeInput={handleInputChange}
            placeholder={"Search"}
          />
          <Avatar
            alt="Jackson"
            src={avatar}
            className="profile-icon"
            width={"40px"}
            height="40px"
          />
          <Typography component="h6" className="user-profile-title">
            Rahul Saxena
          </Typography>
          <ArrowDropDownOutlined style={{ color: "#1F4173" }} />
        </Box>
      </Container>
    </AppBar>
  );
};

export default Navbar;
