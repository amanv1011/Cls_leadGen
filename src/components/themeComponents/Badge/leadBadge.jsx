import React from "react";
import { makeStyles } from "@mui/styles";
import { Badge } from "@mui/material";

const leadBadge = () => {
  const useStyles = makeStyles((theme) => ({
    badge: {
      backgroundColor: "green",
    },
  }));
  const classes = useStyles();

  return (
    <>
      <Badge
        badgeContent="100"
        variant="dot"
        classes={{ badge: classes.badge }}
      ></Badge>
    </>
  );
};

export default leadBadge;
