import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import WidgetsIcon from "@mui/icons-material/Widgets";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import { ListItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
const drawerWidth = 200;
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
    icon: <WidgetsIcon />,
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
  marginTop: "60px",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  border: "none",
  marginTop: "60px",
  boxShadow: "0 1px 3px 0 rgb(0 0 0 / 15%)",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(7)} + 1px)`,
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

export default function MiniDrawer({ open, handleDrawer, handleDrawerClose }) {
  const navigate = useNavigate();
  return (
    <Box
      className="box-main"
      sx={{ display: "flex", border: "none ", marginTop: "-60px" }}
    >
      <Drawer className="drawer-main" variant="permanent" open={open}>
        {/* <List>
          {["Dashboard", "Campagin", "Leads"].map((text, index) => (
            <ListItemButton
              key={text}
              sx={{
                minHeight: 40,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {index === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          ))}
        </List> */}
        {sideBarList.map((item, index) => (
          <ListItem
            button
            key={item.title}
            className={
              open && index === 0
                ? "list-item-selected"
                : open && index !== 0
                ? "list-item"
                : !open && index === 0
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
              primary={item.title}
              className={open ? "list-item-text" : "list-item-text-closed"}
            />
          </ListItem>
        ))}
        <Divider />
      </Drawer>
      {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
      </Box> */}
    </Box>
  );
}
