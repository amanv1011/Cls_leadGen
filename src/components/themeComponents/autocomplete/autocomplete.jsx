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
      sx={{
        width: 180,
        background: "#e9ecf1",
        borderRadius: "10px",
        border: "none",
        outline: "none",
      }}
      className="autocomplete"
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search or Select"
          className="autocomplete-text-input"
        />
      )}
    />
  );
};

export default IAutocomplete;
