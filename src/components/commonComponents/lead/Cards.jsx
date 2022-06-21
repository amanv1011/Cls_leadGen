import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addNotestoLeadAction,
  assignLeadToUsersAction,
  getAllLeadsAction,
  updateLeadStatus,
} from "../../../redux/actions/leadActions";
import { cardsDisplayAction } from "../../../redux/actions/leadActions";
import IButton from "../../themeComponents/button";
import LeadDescription from "../../commonComponents/leadDescription";
import LeadsDisplay from "../../pageComponents/leads2/LeadsDisplay";
import LeadsSearch from "../../pageComponents/leads2/LeadsSearch";
import LeadsHeader from "../../themeComponents/header/leadsHeader/leadsHeader";
// import "./lead.scss";
import "../../pageComponents/leads2/leads.scss";
import IAutocomplete from "../../themeComponents/autocomplete/autocomplete";
import AddIcon from "@mui/icons-material/Add";
import Textarea from "../../themeComponents/textarea/textarea";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
// import { Input } from "@mui/material";
// import { TextFields } from "@mui/icons-material";
// import { Button } from "@mui/material";
import ApprovePopUp from "../../themeComponents/DialogBox/ApprovePopUp";

const Cards = (props) => {
  const dispatch = useDispatch();
  const [openText, setopenText] = useState(false);
  const [displayLeadData, setdisplayLeadData] = useState([]);
  const [value, setValue] = useState("");
  const [open, setOpen] = React.useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const leadsData = props.leadData;
  const allLeadData = useSelector((state) => state.popupStatus.popupData[0]);
  const approveRejectResponse = useSelector(
    (state) => state.allLeads.approveRejectResponse
  );
  const allUsers = useSelector((state) => state.users.users);
  useEffect(() => {
    setdisplayLeadData(allLeadData);
  }, [allLeadData]);

  useEffect(() => {
    dispatch(getAllLeadsAction());
    if (approveRejectResponse && approveRejectResponse.status) {
      let data = displayLeadData;
      data.status = approveRejectResponse && approveRejectResponse.status;
      setdisplayLeadData(data);
    }
  }, [approveRejectResponse]);

  useEffect(() => {
    dispatch(cardsDisplayAction(leadsData));
  }, [leadsData.length]);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  let approveButton = () => {
    dispatch(updateLeadStatus(selectedLeadId, 1));
    handleClose();
  };
  let rejectButton = () => {
    dispatch(updateLeadStatus(selectedLeadId, -1));
    handleClose();
  };
  let archieveButton = () => {
    handleClickOpen();
    dispatch(updateLeadStatus(selectedLeadId, 2));
    handleClose();
  };
  let underReviewButton = () => {
    dispatch(updateLeadStatus(selectedLeadId, 0));
    handleClose();
  };

  const [selectedLeadId, setSlectedLeadId] = useState("");

  const selectedLeadIdFun = (leadId) => {
    setSlectedLeadId(leadId);
  };

  const onChangeOption = (e, option) => {
    console.log(option);
    if (selectedLeadId.length > 0 && option && option.userId) {
      //assign user to leadId here
      dispatch(assignLeadToUsersAction(selectedLeadId, option.userId));
    }
  };

  const addNotesFunction = () => {
    if (openText && value.length > 0) {
      dispatch(addNotestoLeadAction(selectedLeadId, value));
    }
    setopenText(!openText);
  };

  // const approveDisableButton =
  //   displayLeadData && displayLeadData.status && displayLeadData.status === 1
  //     ? true
  //     : false;




  return (
    <Box component="div" className="leads-container">
      <Box component={"div"} className="leads-header">
        <LeadsHeader />
      </Box>
      <Divider
        light={true}
        sx={{ height: "1px", background: "#1F4173", opacity: "0.15" }}
      />
      <Box component={"div"} className="leads-body">
        <Box component={"div"} className="section leads-list">
          <div
            style={{
              padding: "2px 12px",
            }}
          >
            <LeadsSearch />
          </div>
          <LeadsDisplay
            leadsList={leadsData}
            selectedLeadIdFun={selectedLeadIdFun}
            selectedLeadId={selectedLeadId}
          />
        </Box>
        <Box component={"div"} className="section leads-details">
          <LeadDescription leadsList={leadsData} />
        </Box>
        <Box component={"div"} className="section leads-actions">
          <Box>
            <Box component={"div"} className="action-title">
              Move To:
            </Box>
            <Box component={"div"} className="action-buttons">
              <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
              >
                <DialogTitle id="responsive-dialog-title">
                  <h5 style={{ color: "#1f4173" }}>
                    {" "}
                    {displayLeadData === undefined
                      ? null
                      : displayLeadData.title}
                  </h5>
                  {"Are you sure you want to Approve leads ?."}
                </DialogTitle>
                <DialogContent></DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={approveButton}>Confirm</Button>
                </DialogActions>
              </Dialog>
              {/* <ApprovePopUp 
                buttonName={"Approve"}
                open={open}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                approveButton={approveButton}
                // disabledButton={approveDisableButton}
            /> */}
              {/* <ApprovePopUp 
                buttonName={"Archive"}
                open={open}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                approveButton={archieveButton}
            />
              <ApprovePopUp 
                buttonName={"Under Review"}
                open={open}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                approveButton={underReviewButton}
            />
                <ApprovePopUp 
                buttonName={"Reject"}
                open={open}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                approveButton={rejectButton}
            /> */}
              <IButton
                type={"green"}
                name={"Approve"}
                children="Approve"
                onclick={handleClickOpen}
                disabled={
                  displayLeadData &&
                  displayLeadData.status &&
                  displayLeadData.status === 1
                    ? true
                    : false
                }
              //  disabled={approveDisableButton}
              />

              <IButton
                type={"yellow"}
                name={"Archive"}
                children="Archive"
                onclick={handleClickOpen}
                disabled={
                  displayLeadData &&
                  displayLeadData.status &&
                  displayLeadData.status === 2
                    ? true
                    : false
                }
              />
              <IButton
                type={"grey"}
                name={"Under Review"}
                children="Under Review"
                disabled={
                  Number(
                    displayLeadData &&
                      displayLeadData.status &&
                      displayLeadData.status
                  ) === Number(0)
                    ? true
                    : false
                }
                onclick={handleClickOpen}
              />
              <IButton
                type={"pink"}
                name={"Reject"}
                children="Reject"
                disabled={
                  displayLeadData &&
                  displayLeadData.status &&
                  displayLeadData.status === -1
                    ? true
                    : false
                }
                onclick={handleClickOpen}
              />
            </Box>
          </Box>
          <Box className="autocomplete-container">
            <Box className="autocomplete-title">Assign To</Box>
            <IAutocomplete options={allUsers} onChangeOption={onChangeOption} />
          </Box>
          <Box className="add-notes-container">
            {openText ? (
              <Textarea openText={openText} value={value} setValue={setValue} />
            ) : null}
            <IButton
              type={"blue"}
              name={"blue"}
              children={" + Add Notes"}
              customClass={"add-nts-btn"}
              onclick={addNotesFunction}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Cards;
