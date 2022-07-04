import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { ListItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./sidebar.scss";
import { sideBarList } from "../../../utils/constants";
const drawerWidth = 150;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  boxShadow: "0px 6px 10px #DBEAF3",
  // height: "100%",
  postion: "fixed",
  marginTop: "60px",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  border: "none",
  // height: "100%",
  postion: "fixed",
  marginTop: "60px",
  boxShadow: "0px 6px 10px #DBEAF3",
  width: `calc(${theme.spacing(6.8)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(6.8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  zIndex: 3,

  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer({ open, handleDrawer, handleDrawerClose }) {
  const url = window.location.pathname;
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        // position: "fixed",
        marginTop: "60px",
        border: "none ",
      }}
      className="box-main"
    >
      <Drawer className="drawer-main" variant="permanent" open={open}>
        {sideBarList.map((item, index) => (
          <ListItem
            button
            key={item.title}
            className={
              open && item.url === url
                ? "list-item-selected"
                : open && item.url !== url
                ? "list-item"
                : !open && item.url === url
                ? "list-item-closed-selected"
                : "list-item-closed"
            }
            onClick={() => {
              navigate(item.url);
              handleDrawerClose();
            }}
          >
            <ListItemIcon className="list-item-icon">{item.icon}</ListItemIcon>
            <ListItemText
              disableTypography
              style={{
                fontFamily: "Proxima Nova",
                fontSize: "14px",
                fontWeight: 600,
                lineHeight: "17px",
                letterSpacing: "0em",
                textAlign: "left",
              }}
              primary={item.title}
              className={open ? "list-item-text" : "list-item-text-closed"}
            />
          </ListItem>
        ))}
        {/* <Divider /> */}
      </Drawer>
      {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
      </Box> */}
    </Box>
  );
}
