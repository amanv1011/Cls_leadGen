import React from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
  Typography,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import ViewCompactOutlinedIcon from "@mui/icons-material/ViewCompactOutlined";
import TableRowsOutlinedIcon from "@mui/icons-material/TableRowsOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import "./sidebar.scss";
import Close from "@mui/icons-material/Close";
import backButton from "../../../assets/backButton.svg";



const drawerWidth = 300;
const sideBarComponents1 = [
  {
    icon: <ViewCompactOutlinedIcon />,
    name: "Manage Deployments",
  },
  {
    icon: <TableRowsOutlinedIcon />,
    name: "Integrations",
  },
];

const sideBarComponents2 = [
  {
    icon: <SettingsIcon />,
    name: "Account Settings",
  },
  {
    icon: <HelpOutlineOutlinedIcon />,
    name: "Support",
  },
];

const openedMixin = (theme) => ({
  width: drawerWidth,
  backgroundColor: "#FFFFFF",
  borderRadius: "0 8px 8px 0",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  [theme.breakpoints.down("sm")]: {
    position: "fixed",
    zIndex: 10,
  },
});

const closedMixin = (theme) => ({
  backgroundColor: "#FFFFFF",
  border: "none",
  boxShadow: "none",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(6)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function SideBar({ open, closeMenu }) {
  const resize = useMediaQuery("(max-width:600px)");
  return (
    <>
      <Drawer variant="permanent" open={open}>
        <IconButton size="small" aria-label="show 4 new mails" color="inherit">
          <img src={backButton} alt="back button" />
        </IconButton>
        {resize ? (
          <IconButton className={"sidebar-backButton"} onClick={closeMenu}>
            <Close sx={{ color: "#ffffff" }} />
          </IconButton>
        ) : null}
        {open && (
          <Typography className="list-head">Project Navigation</Typography>
        )}
        <List>
          {sideBarComponents1.map((item, index) => (
            <ListItem
              button
              key={item.name}
              className={
                open && index === 0
                  ? "list-item-selected"
                  : open && index !== 0
                  ? "list-item"
                  : !open && index === 0
                  ? "list-item-colsed-selected"
                  : "list-item-colsed"
              }
            >
              <ListItemIcon className="list-item-icon">
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.name}
                className={open ? "list-item-text" : "list-item-text-closed"}
              />
            </ListItem>
          ))}
        </List>
        {open && <Typography className="list-head">User Navigation</Typography>}
        <List>
          {sideBarComponents2.map((item, index) => (
            <ListItem
              button
              key={item.name}
              className={open ? "list-item" : "list-item-colsed"}
            >
              <ListItemIcon className="list-item-icon">
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.name}
                className={open ? "list-item-text" : "list-item-text-closed"}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
