import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import "./autocomplete.scss";

const IAutocomplete = () => {
  const options = [
    { label: "The Shawshank Redemption", year: 1994 },
    { label: "The Godfather", year: 1972 },
    { label: "The Godfather: Part II", year: 1974 },
    { label: "The Dark Knight", year: 2008 },
    { label: "12 Angry Men", year: 1957 },
    { label: "Schindler's List", year: 1993 },
  ];

  return (
    <Autocomplete
      disablePortal
      fullWidth={true}
      size="small"
      id="combo-box-demo"
      options={options}
      isOptionEqualToValue={(option, value) => option.label === value.label}
      sx={{
        width: 180,
        background: "#e9ecf1",
        borderRadius: "10px",
        border: "none",
        outline: "none",
        "& .MuiAutocomplete-input": {
          fontSize: 13,
          fontWeight: 600,
        },
        "& .MuiAutocomplete-popper": {
          borderRadius: "20px",
        },
        "& .MuiInputBase-root": {
          opacity: 0.8,
        },
        "& legend": {
          visibility: "hidden",
        },
      }}
      ListboxProps={{
        sx: {
          fontSize: 13,
          color: "#1F4173",
          opacity: 0.7,
        },
      }}
      className="autocomplete"
      renderInput={(params) => (
        <TextField
          {...params}
          InputLabelProps={{
            style: {
              fontSize: 13,
              // paddingTop: "4px",
              fontWeight: 600,
              opacity: 0.8,
            },
          }}
          placeholder="Search or Select"
          className="autocomplete-text-input"
        />
      )}
    />
  );
};

export default IAutocomplete;
