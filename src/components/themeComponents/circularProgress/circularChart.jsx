import React from "react";
import "./circular.scss";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

function CircularChart(props) {
  return (
    <>
      <Box className="circular-root">
        <Box className="circular-circle">
          <CircularProgress
            sx={{ strokeLinecap: "round" }}
            style={{ color: "#563BFF" }}
            className="circular-bar"
            size={100}
            value={props.Weeklys}
            thickness={3.33}
            variant="determinate"
          />
          <CircularProgress
            style={{ color: "antiquewhite" }}
            className="circular-track"
            size={100}
            value={100}
            thickness={3.33}
            variant="determinate"
          />

          <CircularProgress
            sx={{ strokeLinecap: "round" }}
            style={{ color: "#FF7049" }}
            className="circular-bar"
            size={66.66}
            value={props.Yesterdays}
            thickness={5}
            variant="determinate"
          />
          <CircularProgress
            style={{ color: "antiquewhite" }}
            className="circular-track"
            size={66.66}
            value={100}
            thickness={5}
            variant="determinate"
          />

          <CircularProgress
            sx={{ strokeLinecap: "round" }}
            style={{ color: "#20C997" }}
            className="circular-bar"
            size={33.33}
            value={props.Todays}
            thickness={10}
            variant="determinate"
          />
          <CircularProgress
            style={{ color: "antiquewhite" }}
            className="circular-track"
            size={33.33}
            value={100}
            thickness={10}
            variant="determinate"
          />
        </Box>
      </Box>
    </>
  );
}

export default CircularChart;
