import React from "react";

const StatusInActive = () => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span
        style={{
          width: "12px",
          height: "12px",
          borderRadius: "3px",
          background: "linear-gradient(180deg, #FFDA70 0%, #FFBD00 100%)",
          display: "inline-flex",
          marginRight: "10px",
        }}
      ></span>
      <span>In-Active</span>
    </div>
  );
};

export default StatusInActive;
