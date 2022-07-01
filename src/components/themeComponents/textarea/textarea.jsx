import React from "react";
import "./textarea.scss";

const Textarea = ({ setValue, value }) => {
  return (
    <textarea
      spellcheck="false"
      placeholder={"Add Notes"}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      className={"show"}
    ></textarea>
  );
};

export default Textarea;
