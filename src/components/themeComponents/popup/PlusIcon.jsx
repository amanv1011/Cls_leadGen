import React from "react";

const PlusIcon = () => {
  return (
    <React.Fragment>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 50"
        xmlSpace="preserve"
        style={{ width: "30px", height: "30px", marginRight: "5px" }}
      >
        <path fill="none" d="M0 0h50v50H0z" />
        <path
          fill="none"
          stroke="#ffffff"
          strokeMiterlimit="10"
          strokeWidth="4"
          d="M9 25h32M25 9v32"
          className="stroke-000000"
        />
      </svg>
    </React.Fragment>
  );
};

export default PlusIcon;
