import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import WidgetsIcon from "@mui/icons-material/Widgets";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import { ListItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./sidebar.scss";
const drawerWidth = 175;
const sideBarList = [
  {
    icon: <WidgetsIcon />,
    title: "Dashboard",
    url: "/",
  },
  {
    icon: <HourglassBottomIcon />,
    title: "Campaign",
    url: "/campaign",
  },
  {
    icon: <WysiwygIcon />,
    title: "Leads",
    url: "/leads",
  },
];

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  position: "sticky",
  height: "100%",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  border: "none",
  position: "sticky",
  height: "100%",
  boxShadow: "0 1px 3px 0 rgb(0 0 0 / 15%)",
  width: `calc(${theme.spacing(8)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  height: "100%",

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
    <Box className="box-main" sx={{ display: "flex", border: "none " }}>
      <Drawer className="drawer-main" variant="permanent" open={open}>
        {sideBarList.map((item, index) => (
          <ListItem
            disableRipple
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
            <ListItemIcon disableRipple className="list-item-icon">
              {item.icon}
            </ListItemIcon>
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
