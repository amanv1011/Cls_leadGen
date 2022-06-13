import React, { useState } from "react";

const Textarea = ({ openText }) => {
  const [value, setValue] = useState("");

  return (
    <textarea
      style={{
        width: "180px",
        height: "120px",
        background: "rgba(31, 65, 115, 0.1)",
        borderRadius: "10px",
        border: "none",
        outline: "none",
        padding: "3px 6px",
        color: "rgba(31, 65, 115, 0.5)",
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: 14,
        // lineHeight: 17,
        opacity: 0.8,
      }}
      placeholder={"Add Notes"}
      value={value}
      onChange={(e) => {
        e.preventDefault();
        setValue(e.target.value);
      }}
      className={openText ? "show" : "hide"}
    ></textarea>
  );
};

export default Textarea;
