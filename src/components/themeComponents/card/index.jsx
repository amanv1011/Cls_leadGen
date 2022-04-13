import { CircularProgress } from "@mui/material";
import React from "react";
// import Donut from "../graphs/pieChart";
import "./card.scss";

export default function Card({ value, title, count }) {
  return (
    <div className="card-container">
      <div className="pie-chart">
        <CircularProgress
          color="success"
          variant="determinate"
          size={90}
          value={value}
          thickness={5}
        />
      </div>
      <div className="pie-chart-data">
        <div>{count}</div>
        <div className="title">{title}</div>
      </div>
    </div>
  );
}
