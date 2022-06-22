import React from "react";

const Textarea = ({ openText, setValue, value }) => {
  return (
    <textarea
      style={{
        width: "150px",
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
        setValue(e.target.value);
      }}
      className={openText ? "show" : "hide"}
    ></textarea>
  );
};

export default Textarea;
