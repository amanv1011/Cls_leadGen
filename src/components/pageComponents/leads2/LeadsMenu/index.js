import { MenuItem, Select } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { leadsDropDownFilterAction } from "../../../../redux/actions/leadsFilter";
// import DownArrow from "../../leads/DownArrow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "./leadsMenu.scss";

const LeadsMenu = () => {
  const dispatch = useDispatch();
  const style = {
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "500",
    color: "#1f4173",
    opacity: "0.8",
    paddingLeft: "8px",
    paddingRight: "8px",
  };

  const leadsAllCount = useSelector(
    (state) => state.approveRejectCount.allCount
  );
  const leadsAprrovedCount = useSelector(
    (state) => state.approveRejectCount.approveCount
  );
  const leadsUnderReviewCount = useSelector(
    (state) => state.approveRejectCount.underreviewCount
  );
  const leadsRejectedCount = useSelector(
    (state) => state.approveRejectCount.rejectCount
  );
  const leadsArchievedCount = useSelector(
    (state) => state.approveRejectCount.archieveCount
  );
  const leadsDropDownFilter = useSelector(
    (state) => state.leadsFilter.leadsDropDownFilter
  );

  return (
    <Select
      labelId="select-label"
      id="simple-select"
      value={leadsDropDownFilter}
      onChange={(event) => {
        dispatch(leadsDropDownFilterAction(event.target.value));
      }}
      size="small"
      className="select-container"
      variant="standard"
      disableUnderline
      IconComponent={(props) => (
        <KeyboardArrowDownIcon
          {...props}
          fontSize="small"
          style={{ color: "#003ad2" }}
        />
      )}
      MenuProps={{
        PaperProps: {
          sx: {
            borderRadius: "10px",
            boxshadow: "0px 6px 10px rgba(180, 180, 180, 0.35)",
            "& .MuiList-padding": {
              padding: "10px",
            },
            "& .Mui-selected": {
              borderRadius: "10px",
              background: "#e9ecf1",
              color: "#003ad2",
            },
          },
        },
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
        transformOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      }}
      sx={{
        fontSize: "13px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        color: "#003ad2",
        fontWeight: 600,
      }}
    >
      <MenuItem value="AllLeads" className="select-option" sx={style}>
        {`All (${leadsAllCount})`}
      </MenuItem>
      <MenuItem className="select-option" sx={style} value="UnderReveiwLeads">
        {`Under Reveiw (${leadsUnderReviewCount})`}
      </MenuItem>
      <MenuItem
        className="select-option"
        sx={style}
        value="ApprovedLeads"
      >{`Approved (${leadsAprrovedCount})`}</MenuItem>
      <MenuItem
        className="select-option"
        sx={style}
        value="RejectedLeads"
      >{`Rejected (${leadsRejectedCount})`}</MenuItem>
      <MenuItem
        className="select-option"
        sx={style}
        value="ArcheievdLeads"
      >{`Archieved (${leadsArchievedCount})`}</MenuItem>
    </Select>
  );
};
export default LeadsMenu;
