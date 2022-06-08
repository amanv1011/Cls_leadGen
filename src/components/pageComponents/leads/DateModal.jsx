import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import BasicDateRangePicker from "./DatePicker";
import Calendar from "./Calendar";
import { useSelector, useDispatch } from "react-redux";

import DownArrow from "./DownArrow";
import {
  openDateModal,
  closeDateModal,
} from "../../../redux/actions/dateModalAction";
import { useMediaQuery } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 311,
  bgcolor: "#fefefe",
  border: "none",
  borderRadius: "10px",
  color: "green",
};
export default function DateModal() {
  const dispatch = useDispatch();
  const matches = useMediaQuery("(max-width:1460px)");
  const handleOpen = () => {
    dispatch(openDateModal());
  };
  const handleClose = () => {
    dispatch(closeDateModal());
  };
  const filterDate = useSelector((state) => state.leadsFilter.filterDate);
  const open = useSelector((state) => state.dateModal.isOpen);
  const tempDate = "Select Date Range";

  const renderSelectionValue = () => {
    return (
      <div>
        {filterDate.start.format("MMM DD, YYYY")}
        <span style={{ padding: "5px" }}>{"to"}</span>
        {filterDate.end.format("MMM DD, YYYY")}
      </div>
    );
  };
  return (
    <div>
      <Button
        style={{
          textTransform: "none",
          color: "#5C759A",
          // backgroundColor: "#E7E7E7",
          backgroundColor: "rgb(233,236,241)",
          borderRadius: "10px",
          fontSize: matches ? "13px" : "14px",
        }}
        onClick={handleOpen}
      >
        {filterDate === "" ? tempDate : renderSelectionValue()}{" "}
        <span style={{ paddingLeft: "8px", paddingTop: "3px" }}>
          <Calendar />
        </span>
        <span style={{ paddingLeft: "5px", paddingBottom: "3px" }}>
          <DownArrow />
        </span>
      </Button>

      <Modal
        sx={{ border: "none" }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <BasicDateRangePicker />
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
