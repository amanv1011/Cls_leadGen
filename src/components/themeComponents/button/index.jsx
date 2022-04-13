import React from "react";
import "./button.scss";

export default function IButton({
  type,
  children,
  name,
  handleClick,
  customClass,
  disabled,
}) {
  return (
    <>
      <button
        className={`${type}-btn ${customClass}`}
        name={name}
        onClick={handleClick}
        disabled={disabled}
      >
        {children}
      </button>
    </>
  );
}
