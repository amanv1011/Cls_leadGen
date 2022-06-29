import React from "react";
import { useDispatch } from "react-redux";
import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import * as campaignActions from "../../../../redux/actions/campaignActions";
import { openAlertAction } from "../../../../redux/actions/alertActions";
import { get_a_feild_in_a_document } from "../../../../services/api/campaign";
import IButton from "../../button";

const ActivePopUp = ({
  openCampaignPopupActive,
  handleClose,
  selectedArray,
}) => {
  const dispatch = useDispatch();

  const ActivateMultipleCampaings = () => {
    selectedArray.map((seletedCampaigns) => {
      try {
        get_a_feild_in_a_document(seletedCampaigns, { status: 1 });
        dispatch(campaignActions.getAllCampaignsAction());
        dispatch(openAlertAction("Campaigns Actived Successfully", false));
        handleClose();
      } catch (error) {
        dispatch(openAlertAction(`${error.message}`, true, "error"));
      }
    });
  };

  return (
    <div>
      <Dialog
        open={openCampaignPopupActive}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Activate selected campaigns ?
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
            onclick={ActivateMultipleCampaings}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default ActivePopUp;
