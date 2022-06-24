import { Autocomplete, Checkbox, TextField } from "@mui/material";
import React from "react";
import "./assignCampaign.scss";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckIcon from "@mui/icons-material/Check";

import { useState } from "react";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const AssignCampaign = ({
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
        // overflowY: "scroll",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        background: "rgb(233, 236, 241)",
        borderRadius: "10px",
        paddingRight: "5px",
        height: "44px",
        width: "180px",
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
        disableClearable
        onClose={onAutoPopperClose}
        id="checkboxes-tags-demo"
        getOptionLabel={(option) => option.name.toString()}
        options={options}
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
          width: "125px",
          background: "#e9ecf1",
          borderRadius: "10px",
          border: "none",
          outline: "none",
          "& .MuiAutocomplete-input": {
            fontSize: 13,
            fontWeight: 600,
            height: "20px",
            width: "100px",
          },
          "& .MuiAutocomplete-inputRoot": {
            paddingRight: "30px",
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
            fontSize: 14,
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
                fontWeight: 500,
                opacity: 0.8,
                display: "flex",
              },
            }}
            placeholder="Select User"
            className="autocomplete-text-input"
          />
        )}
      />
      <div className="okay-icon" onClick={assignUsers}>
        {selectedUsers && selectedUsers.length > 0 ? (
          <CheckIcon
            fontSize="small"
            sx={{ strokeWidth: 2 }}
            style={{
              background: "#003ad2",
              fontWeight: 600,
              color: "#ffffff",
              borderRadius: "5px",
            }}
          />
        ) : null}
      </div>
    </div>
  );
};

export default AssignCampaign;