import React from "react";
import { useDispatch } from "react-redux";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import * as campaignActions from "../../../../redux/actions/campaignActions";
import IButton from "../../button";
import closeIcon from "../../../../assets/icons/closeIcon.png";

const CampaignPopup = ({
  openCampaignPopup,
  handleClose,
  disableApplyBtn,
  selectedArray,
  setselectedArray,
}) => {
  const dispatch = useDispatch();

  const deleteMultipleCampaings = () => {
    selectedArray.map((seletedCampaignsId) =>
      dispatch(campaignActions.deleteCampaignsAction(seletedCampaignsId))
    );
    handleClose();
    setselectedArray([]);
  };

  return (
    <div>
      <Dialog
        open={openCampaignPopup}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{
            display: "flex",
            padding: "12px 20px",
            alignItems: "center",
            justifyContent: "space-between",
            height: "60px",
            background: "#FAFAFA",
            boxShadow: "inset 0px -1px 3px rgba(0, 0, 0, 0.05)",
            borderRadius: "15px 15px 0px 0px",
          }}
        >
          <div
            style={{
              fontStyle: "normal",
              fontWeight: 600,
              fontSize: "18px",
              lineHeight: "22px",
              color: "#1F4173",
              height: "100%",
              display: "flex",
              alignItems: "inherit",
            }}
          >
            Delete campaigns
          </div>
          <IconButton aria-label="close" onClick={handleClose}>
            <img src={closeIcon} alt="close" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {disableApplyBtn
            ? "Please deselect the campaings with leads and try again."
            : "Are you sure you want to perform this action?"}
        </DialogContent>
        <DialogActions>
          <IButton
            type="apply"
            name="apply"
            children={"Apply"}
            disabled={disableApplyBtn}
            onclick={deleteMultipleCampaings}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default CampaignPopup;
