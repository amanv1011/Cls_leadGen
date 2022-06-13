import React from "react";
import "./button.scss";

export default function IButton({
  type,
  children,
  name,
  onclick,
  customClass,
  disabled,
}) {
  return (
    <>
      <button
        className={`btn ${type}-btn ${customClass}`}
        name={name}
        onClick={onclick}
        disabled={disabled}
      >
        {children}
      </button>
    </>
  );
}
