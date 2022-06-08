import React from "react";
import { Checkbox, FormGroup, FormControlLabel } from "@mui/material";

const LeadsCheckbox = (props) => {
  const { label, isChecked, setIsChecked } = props;
  const onCheckboxChangeHandler = (event) => {
    setIsChecked(!isChecked);
  };
  return (
    <React.Fragment>
      <FormGroup>
        <FormControlLabel
          sx={{ marginRight: "0px" }}
          control={<Checkbox color="primary" size="small" />}
          label={label}
          checked={isChecked}
          onChange={onCheckboxChangeHandler}
        />
      </FormGroup>
    </React.Fragment>
  );
};
export default LeadsCheckbox;
