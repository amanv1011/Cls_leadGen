import React from "react";
const Status = (props) => {
  return (
    <>
      {props.status === 1 ? (
        <>
          <span
            style={{
              width: "12px",
              height: "12px",
              borderradius: "3px",
              background: "linear-gradient(180deg, #24D6A5 0%, #17C293 100%)",
              display: "inline-flex",
              marginRight: "10px",
            }}
          ></span>
          <span>Active</span>
        </>
      ) : (
        <>
          <span
            style={{
              width: "12px",
              height: "12px",
              borderradius: "3px",
              background: "linear-gradient(180deg, #FFDA70 0%, #FFBD00 100%)",
              display: "inline-flex",
              marginRight: "10px",
            }}
          ></span>
          <span>In-active</span>
        </>
      )}
    </>
  );
};

export default Status;
