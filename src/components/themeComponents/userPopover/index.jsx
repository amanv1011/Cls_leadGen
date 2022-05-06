//Navbar popover for logout and displaying to other page
import React from "react";
import Popover from "@mui/material/Popover";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import "./userPopover.scss";

export default function UserPopover({
  openPopUp,
  anchorEl,
  handlePopoverClose,
}) {
  return (
    <Popover
      id="mouse-over-popover"
      open={openPopUp}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      onClose={handlePopoverClose}
      disableRestoreFocus
      PaperProps={{
        sx: {
          boxShadow: "0 2px 7px 0 rgba(36, 36, 36, 0.2)",
          borderRadius: "2px",
          // maxHeight: "233px",
          // marginTop: "8px",
          marginRight: "14px",
        },
      }}
    >
      {
        <Box className={"logout-container"}>
          <Typography className="user-option">
            <PersonIcon fontSize="small" style={{ marginRight: "8px" }} />
            Profile
          </Typography>
          <Typography className="user-option">
            <SettingsIcon fontSize="small" style={{ marginRight: "8px" }} />
            Settings
          </Typography>
          <Typography className="user-option" onClick={handlePopoverClose}>
            <LogoutIcon fontSize="small" style={{ marginRight: "8px" }} />
            Log Out
          </Typography>
        </Box>
      }
    </Popover>
  );
}
