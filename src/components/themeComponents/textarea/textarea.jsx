import React, { useState } from "react";

const Textarea = () => {
  const [value, setValue] = useState("");

  return (
    <textarea
      value={value}
      onChange={(e) => {
        e.preventDefault();
        setValue(e.target.value);
      }}
      // className={openText ? "show" : "hide"}
    ></textarea>
  );
};

export default Textarea;
