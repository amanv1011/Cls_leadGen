import React from "react";
import "../circularProgress/circular.scss";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

function Circular(props) {
  return (
    <>
      <Box className="circular-root">
        <Box className="circular-circle">
          <span
            className="circular-bar bar-name"
            style={{ color: props.barColor }}
          >
            {props.barName}
          </span>
          <CircularProgress
            sx={{ strokeLinecap: "round" }}
            style={{
              color: props.barColor,
              transform: "scaleY(-1) rotate(90deg)",
            }}
            className="circular-bar"
            size={95}
            value={props.value}
            thickness={3.6}
            variant="determinate"
          />
          <CircularProgress
            style={{ color: "#F7F8FB" }}
            className="circular-track"
            size={95}
            value={100}
            thickness={3.6}
            variant="determinate"
          />
          <CircularProgress
            style={{ color: props.innerColor }}
            className="circular-track"
            size={79.5}
            thickness={22}
            value={100}
            variant="determinate"
          />
        </Box>
      </Box>
    </>
  );
}

export default Circular;
