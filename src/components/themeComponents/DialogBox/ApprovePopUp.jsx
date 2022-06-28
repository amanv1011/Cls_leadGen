import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import "./leadDialog.scss";
import { useDispatch } from "react-redux";
import {
  addNotestoLeadAction,
  assignLeadToUsersAction,
  getAllLeadsAction,
  updateLeadStatus,
} from "../../../redux/actions/leadActions";

export default function ApprovePopUp({
  leadsList,
  selectedLeadIdFun,
  buttonName,
  approveButton,
  open,
  handleClickOpen,
  handleClose,
  selectedLeadId,
  disabledButton,
}) {
  const dispatch = useDispatch();
  // const [open, setOpen] = React.useState(false);
  const [approveDisable, setApproveDisable] = useState([]);
  const displayLeadData = useSelector(
    (state) => state.popupStatus.popupData[0]
  );

  useEffect(() => {
    setApproveDisable(displayLeadData);
  }, [displayLeadData]);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  // console.log(approveDisable.status);
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  // const handleClose = () => {
  //   setOpen(false);
  // };
  // const approveButton = () => {
  //   dispatch(updateLeadStatus(selectedLeadId, 1));
  //   handleClose();
  // };
  return (
    <div>
      <Button
        className={
          buttonName === "Approve"
            ? "approveButtonStyle"
            : buttonName === "Archive"
            ? "archiveButtonStyle"
            : buttonName === "Under Review"
            ? "underReviewButtonStyle"
            : buttonName === "Reject"
            ? "rejectButtonStyle"
            : null
        }
        onClick={handleClickOpen}
        disabled={
          approveDisable && approveDisable.status && approveDisable.status === 1
            ? true
            : false
        }
      >
        {buttonName}
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          <h3 style={{ color: "#1f4173" }}>
            {" "}
            {displayLeadData === undefined ? null : displayLeadData.title}
          </h3>
          {"Are you sure you want to Approve leads ?."}
        </DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={approveButton}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
