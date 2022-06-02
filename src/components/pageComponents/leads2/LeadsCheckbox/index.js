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
          control={<Checkbox />}
          label={label}
          checked={isChecked}
          onChange={onCheckboxChangeHandler}
        />
      </FormGroup>
    </React.Fragment>
  );
};
export default LeadsCheckbox;
