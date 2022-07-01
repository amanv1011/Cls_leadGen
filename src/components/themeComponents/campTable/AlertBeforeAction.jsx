import React, { forwardRef } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Slide,
} from "@mui/material";
import { openAlertAction } from "../../../redux/actions/alertActions";
import DeleteIcon from "@mui/icons-material/Delete";
import * as campaignActions from "../../../redux/actions/campaignActions";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AlertBeforeAction = ({
  open,
  setOpenAlert,
  campaignItemId,
  setIdForDelete,
  campaignName,
  setCampaignName,
  searchedCampaignList,
}) => {
  const dispatch = useDispatch();

  const Viewed = async (campaignListItemId) => {
    try {
      await dispatch(campaignActions.getACampaignAction(campaignListItemId));
    } catch (error) {
      dispatch(openAlertAction(`${error.message}`, true, "error"));
    }
  };

  const handleClickOpen = async () => {
    setOpenAlert(false);
    await dispatch(campaignActions.deleteCampaignsAction(campaignItemId));
    Viewed(searchedCampaignList[1].id);
  };

  const handleClose = () => {
    setOpenAlert(false);
    setIdForDelete("");
    setCampaignName("");
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{`Do you want to delete ${campaignName}?`}</DialogTitle>
        <DialogActions>
          <Button
            variant="contained"
            color="success"
            onClick={handleClose}
            style={{
              borderRadius: "10px",
              background: "#1F4173",
              textTransform: "none",
              fontWeight: "600",
              opacity: 0.5,
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            startIcon={<DeleteIcon />}
            style={{
              borderRadius: "10px",
              background: "#ff6c5f",
              opacity: 1,
              textTransform: "none",
            }}
            onClick={handleClickOpen}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default AlertBeforeAction;
