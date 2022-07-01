import { MenuItem, Select } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { campaignStateFilterValueAction } from "../../../../redux/actions/campaignFilterActions";
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

const CampaignMenu = ({ campgaignId }) => {
  const dispatch = useDispatch();

  const campaignsAllCount = useSelector(
    (state) => state.campaignsCount.allCamapignsCount
  );
  const activeCampaignsCount = useSelector(
    (state) => state.campaignsCount.ativeCamapignsCount
  );
  const inActiveCampaignsCount = useSelector(
    (state) => state.campaignsCount.inActiveCamapignsCount
  );

  const campaignStateFilterValue = useSelector(
    (state) => state.campaignFilters.campaignState
  );

  return (
    <Select
      labelId="select-label"
      id="simple-select"
      value={campaignStateFilterValue}
      onChange={(event) => {
        dispatch(campaignStateFilterValueAction(event.target.value));
      }}
      size="small"
      className="select-container"
      variant="standard"
      disableUnderline
      disabled={campgaignId ? true : false}
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
      <MenuItem value="AllCampaigns" className="select-option" sx={style}>
        {`All (${campaignsAllCount && campaignsAllCount.length})`}
      </MenuItem>
      <MenuItem className="select-option" sx={style} value="activeCampaigns">
        {`Active (${activeCampaignsCount && activeCampaignsCount.length})`}
      </MenuItem>
      <MenuItem
        className="select-option"
        sx={style}
        value="inActiveCampaigns"
      >{`In-Active (${
        inActiveCampaignsCount && inActiveCampaignsCount.length
      })`}</MenuItem>
    </Select>
  );
};
export default CampaignMenu;
