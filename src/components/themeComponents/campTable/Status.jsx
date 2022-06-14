import React from "react";

const Status = () => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span
        style={{
          width: "12px",
          height: "12px",
          borderRadius: "3px",
          backgroundColor: "lightgreen",
          display: "inline-flex",
          background: "linear-gradient(180deg, #24D6A5 0%, #17C293 100%)",
          marginRight: "10px",
        }}
      ></span>
      <span>Active</span>
    </div>
  );
};

export default Status;
