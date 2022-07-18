import React from "react";
import { useDispatch } from "react-redux";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  DialogContent,
} from "@mui/material";
import * as campaignActions from "../../../../redux/actions/campaignActions";
import { openAlertAction } from "../../../../redux/actions/alertActions";
import closeIcon from "../../../../assets/icons/closeIcon.png";
import IButton from "../../button";

const ActivePopUp = ({
  openCampaignPopupActive,
  handleClose,
  selectedArray,
  handleClosePopover,
  setselectedArray,
}) => {
  const dispatch = useDispatch();

  const ActivateMultipleCampaings = () => {
    selectedArray.forEach((seletedCampaignId) => {
      dispatch(
        campaignActions.updateCampaignStatusAction(seletedCampaignId, 1)
      );
    });
    handleClose();
    handleClosePopover();
    setselectedArray([]);
  };

  return (
    <div>
      <Dialog
        open={openCampaignPopupActive}
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
            Update campaign status ?
          </div>
          <IconButton aria-label="close" onClick={handleClose}>
            <img src={closeIcon} alt="close" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          Are you sure you want to perform this action?
        </DialogContent>
        <DialogActions>
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
