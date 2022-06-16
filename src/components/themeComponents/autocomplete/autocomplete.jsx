import { Autocomplete, Checkbox, TextField } from "@mui/material";
import React from "react";
import "./autocomplete.scss";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckIcon from "@mui/icons-material/Check";
import { display } from "@mui/system";
import IButton from "../button";
import { useState } from "react";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const IAutocomplete = ({
  options,
  onChangeOption,
  disabled,
  onAutoPopperClose,
  selectedUsers,
  assignUsers,
}) => {
  const [first, setfirst] = useState([]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        background: "#e9ecf1",
        borderRadius: "10px",
        width: "min-content",
        paddingRight: "5px",
      }}
    >
      <Autocomplete
        closeText={"close"}
        freeSolo
        disablePortal
        multiple
        disabled={disabled}
        fullWidth={true}
        size="small"
        disableCloseOnSelect
        onClose={onAutoPopperClose}
        id="checkboxes-tags-demo"
        getOptionLabel={(option) => option.name.toString()}
        options={options}
        disableClearable
        value={selectedUsers}
        onChange={(e, option) => onChangeOption(e, option)}
        isOptionEqualToValue={(option, value) => option.name === value.name}
        renderOption={(props, option, { selected }) => (
          <li
            {...props}
            style={{
              height: "30px",
              borderRadius: "10px",
              padding: "0px",
              margin: "4px 0px",
            }}
          >
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              checked={selected}
            />
            {option.name}
          </li>
        )}
        sx={{
          width: 190,
          background: "#e9ecf1",
          borderRadius: "10px",
          border: "none",
          outline: "none",
          "& .MuiAutocomplete-input": {
            fontSize: 13,
            fontWeight: 600,
          },
          "& .MuiAutocomplete-inputRoot": {
            paddingRight: "40px",
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
            padding: "8px",
            borderRadius: "10px",
            maxHeight: "200px",
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
                fontWeight: 500,
                opacity: 0.8,
                display: "flex",
              },
            }}
            placeholder="Search or Select"
            className="autocomplete-text-input"
          />
        )}
      />
      {selectedUsers && selectedUsers.length > 0 ? (
        <div className="okay-icon" onClick={assignUsers}>
          <CheckIcon
            fontSize="medium"
            sx={{ strokeWidth: 2 }}
            style={{
              color: "green",
              fontWeight: 600,
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

export default IAutocomplete;
