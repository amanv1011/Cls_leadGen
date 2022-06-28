import React from "react";
import { MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "./campaignMenu.scss";

const style = {
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: "500",
  color: "#1f4173",
  opacity: "0.8",
  paddingLeft: "8px",
  paddingRight: "8px",
};

const CampaignMenu = () => {
  const dispatch = useDispatch();

  const leadsAllCount = useSelector(
    (state) => state.approveRejectCount.allCount
  );
  const leadsAprrovedCount = useSelector(
    (state) => state.approveRejectCount.approveCount
  );
  const leadsUnderReviewCount = useSelector(
    (state) => state.approveRejectCount.underreviewCount
  );

  const leadsDropDownFilter = useSelector(
    (state) => state.leadsFilter.leadsDropDownFilter
  );

  return (
    <Select
      labelId="select-label"
      id="campaign-simple-select"
      // value={leadsDropDownFilter}
      onChange={(event) => {
        // console.log("event", event.target.value);
        // dispatch(leadsDropDownFilterAction(event.target.value));
      }}
      size="small"
      className="select-container"
      variant="standard"
      disableUnderline
      IconComponent={() => <KeyboardArrowDownIcon fontSize="small" />}
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
      <MenuItem value="AllCampaigns" className="select-option" sx={style}>
        {/* {` */}
        All
        {/* (${0})`} */}
      </MenuItem>
      <MenuItem className="select-option" sx={style} value="UnderReveiwLeads">
        {/* {` */}
        Active
        {/* (${0})`} */}
      </MenuItem>
      <MenuItem className="select-option" sx={style} value="ApprovedLeads">
        {/* {` */}
        In-Active
        {/* (${0})`} */}
      </MenuItem>
    </Select>
  );
};
export default CampaignMenu;
