import React from "react";
import "./textarea.scss";

const Textarea = ({ setValue, value }) => {
  return (
    <input
      placeholder={"Add Notes"}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      className={"show"}
    ></input>
  );
};

export default Textarea;
