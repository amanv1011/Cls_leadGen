import React from "react";
import { makeStyles } from "@mui/styles";
import { TextField } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import "./input.scss";

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "#E5E5E5",
    width: "100%",
    height: "25px",
    borderRadius: "10px",
    "& .MuiFormLabel-root": {
      color: "#8B97A2",
      fontFamily: "Product Sans",
      letterSpacing: 0,
      paddingLeft: "10px",
      paddingRight: "10px",
    },
    "& .MuiFilledInput-root": {
      background: "#E5E5E5",
      borderRadius: "8px !important",
      height: "25px",
    },
  },
  input: {
    border: (styleProps) => (styleProps.border ? styleProps.border : "none"),
    backgroundColor: "#E5E5E5",
    borderRadius: "8px !important",
    color: "#1E2429",
    fontSize: (styleProps) =>
      styleProps.fontSize ? styleProps.fontSize : "16px",
    letterSpacing: "0.35px",
    lineHeight: (styleProps) =>
      styleProps.lineHeight ? styleProps.lineHeight : "19px",
    padding: "10px !important",
    caretColor: "#3c3996",
    fontWeight: (styleProps) =>
      styleProps.fontWeight ? styleProps.fontWeight : "normal",
  },
}));
export default function IInput({
  type,
  value,
  name,
  onChangeInput,
  disabled,
  placeholder,
  styleProps,
  isSearch,
  onClick,
}) {
  const classes = useStyles(styleProps);
  const iInputContainerStyle = {
    position: "relative",
    borderRadius: "10px",
    marginTop: "6px",
    height: "30px",
    opacity: 0.9,
    cursor: isSearch ? "pointer" : "default",
    width: styleProps && styleProps.width ? styleProps.width : "270px",
  };
  return (
    <div style={iInputContainerStyle} onClick={isSearch ? onClick : null}>
      <TextField
        variant="filled"
        InputProps={{
          disableUnderline: true,
          classes: {
            input: classes.input,
          },
        }}
        disabled={disabled}
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChangeInput(e)}
        className={classes.root}
        placeholder={placeholder}
        size="medium"
        autoComplete="off"
      />
      {isSearch ? (
        <SearchOutlined className="i-input-arrow-down" color="black" />
      ) : null}
    </div>
  );
}
