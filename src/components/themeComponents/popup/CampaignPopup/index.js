import React from "react";
import { useDispatch } from "react-redux";
import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import * as campaignActions from "../../../../redux/actions/campaignActions";
import IButton from "../../button";

const CampaignPopup = ({
  openCampaignPopup,
  handleClose,
  disableApplyBtn,
  selectedArray,
}) => {
  const dispatch = useDispatch();

  const deleteMultipleCampaings = () => {
    selectedArray.map((seletedCampaignsId) =>
      dispatch(campaignActions.deleteCampaignsAction(seletedCampaignsId))
    );
    handleClose();
  };
  return (
    <div>
      <Dialog
        open={openCampaignPopup}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {disableApplyBtn
            ? "You have selected campaings which has already generated leads. Please deselect the campaings with leads and try again"
            : "Delete seleted campaigns"}
        </DialogTitle>
        <DialogActions>
          <IButton
            type="cancel"
            name="cancel"
            children={"Cancel"}
            onclick={handleClose}
          />
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
