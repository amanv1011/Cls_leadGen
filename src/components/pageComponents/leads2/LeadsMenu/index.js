import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";

const LeadsMenu = (props) => {
  const {
    leadsAllCount,
    leadsAprrovedCount,
    leadsUnderReviewCount,
    leadsRejectedCount,
    leadsArchievedCount,
  } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        All Leads ({leadsAllCount})
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          UnderReview ({leadsUnderReviewCount})
        </MenuItem>
        <MenuItem onClick={handleClose}>
          Approved ({leadsAprrovedCount})
        </MenuItem>
        <MenuItem onClick={handleClose}>
          Rejected ({leadsRejectedCount})
        </MenuItem>
        <MenuItem onClick={handleClose}>
          Archived ({leadsArchievedCount})
        </MenuItem>
      </Menu>
    </div>
  );
};
export default LeadsMenu;
