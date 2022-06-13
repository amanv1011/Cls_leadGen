import { styled } from "@mui/material/styles";
import { Avatar, Box, Container, IconButton, Typography } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import React, { useState } from "react";
import "./navbar.scss";
import Logo from "../../../assets/icons/Logo.svg";
import avatar from "../../../assets/icons/avatar.png";
import backButton from "../../../assets/icons/backButton.svg";
import UserPopover from "../../themeComponents/userPopover";
import Dropdown from "../../../assets/icons/Dropdown.svg";

const drawerWidth = 400;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  // marginLeft: `calc(${theme.spacing(7)} + 1px)`,
  width: "100%",
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
    zIndex: 2,
  },
}));

// const settings = ["Profile", "Account", "Dashboard", "Logout"];
const Navbar = ({ handleDrawer }) => {
  const [openPopUp, setOpenPopUp] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setOpenPopUp(false);
  };
  const onMenuClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpenPopUp(true);
  };
  return (
    <AppBar position="fixed" sx={{ height: "60px" }}>
      <Container
        maxWidth="100%"
        sx={{ width: "100%", height: "100%" }}
        className="navbar-container"
      >
        <Box className="logo-container">
          <Box className="back-button">
            <IconButton onClick={handleDrawer}>
              <img
                src={backButton}
                alt="back button"
                className="back-button-img"
              ></img>
            </IconButton>
          </Box>
          <img
            src={Logo}
            alt="logo"
            className="logo-image"
            width="160px"
            height="70px"
          />
        </Box>
        <Box style={{ display: "flex", alignItems: "center" }}>
          <Box></Box>
          <Box
            component={"div"}
            className="user-profile-container"
            onClick={onMenuClick}
          >
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
            <img src={Dropdown} alt="dropdown" style={{ color: "#1F4173" }} />
          </Box>
        </Box>
        <UserPopover
          openPopUp={openPopUp}
          anchorEl={anchorEl}
          handlePopoverClose={handlePopoverClose}
        />
      </Container>
    </AppBar>
  );
};

export default Navbar;
