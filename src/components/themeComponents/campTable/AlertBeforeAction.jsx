import React from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Slide,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
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
            color="error"
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
