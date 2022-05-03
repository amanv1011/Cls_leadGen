import React from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Slide,
} from "@mui/material";
import * as campaignActions from "../../../redux/actions/campaignActions";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AlertBeforeAction = ({
  open,
  setOpenAlert,
  campaignItemId,
  setIdForDelete,
  campaignName,
  setCampaignName,
}) => {
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpenAlert(false);
    dispatch(campaignActions.deleteCampaignsAction(campaignItemId));
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
        <DialogTitle>
          {`Do you really want to delete ${campaignName}?`}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClickOpen}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default AlertBeforeAction;
