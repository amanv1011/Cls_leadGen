import { Autocomplete, Checkbox, Chip, TextField } from "@mui/material";
import React from "react";
import "./autocomplete.scss";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const IAutocomplete = ({
  options,
  onChangeOption,
  disabled,
  onAutoPopperClose,
  selectedUsers,
  assignUsers,
  width,
}) => {
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
        paddingRight: "0px",
      }}
    >
      <Autocomplete
        closeText={"close"}
        freeSolo
        disablePortal={true}
        multiple
        limitTags={1}
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
        renderTags={(value, getTagProps) => {
          const numTags = value.length;
          const limitTags = 1;
          return (
            <>
              {value.slice(0, limitTags).map((option, index) => (
                <Chip
                  style={{ borderRadius: "10px", fontWeight: 500 }}
                  size={"small"}
                  {...getTagProps({ index })}
                  key={index}
                  label={option.name}
                />
              ))}
              <span style={{ fontSize: "11px", fontWeight: "600" }}>
                {numTags > limitTags && ` +${numTags - limitTags} more`}
              </span>
            </>
          );
        }}
        renderOption={(props, option, { selected }) => (
          <li
            {...props}
            style={{
              boxSizing: "border-box",
              height: "30px",
              borderRadius: "10px",
              paddingTop: "6px",
              margin: "4px 0px",
              width: width - "15px",
              fontWeight: 500,
              display: "block",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              fontSize: "13px",
            }}
          >
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              checked={selected}
              style={{ padding: "0px 2px 0px 0px", margin: "0px" }}
            />
            <span>{option.name}</span>
          </li>
        )}
        sx={{
          width: width,
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
        componentsProps={{
          paper: {
            sx: {
              width: width,
            },
          },
        }}
        ListboxProps={{
          sx: {
            fontSize: 14,
            color: "#1F4173",
            opacity: 0.9,
            padding: "2px",
            borderRadius: "10px",
            maxHeight: "200px",
            fontWeight: 500,
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
      {/* <div className="okay-icon" onClick={assignUsers}>
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
      </div> */}
    </div>
  );
};

export default IAutocomplete;
