import * as React from "react";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CrossIcon from "./Cross";
import {  useDispatch } from "react-redux";
import "./PopupBox.scss";

import { IconButton } from "@mui/material";
import { getPopupDisable } from "../../../redux/actions/PopupAction";

function PopuoBox(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(true);
  
  
  const popupdata = props.data[0];

  const handleClose = () => {
    dispatch(getPopupDisable());
  };
  

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title-1"
        aria-describedby="modal-modal-description"
      >
        <Box className="popupContainer">
          <Typography id="modal-modal-title-1" variant="p" component="p">
            Leads{" "}
            <IconButton onClick={handleClose} className="crossIcon">
              {" "}
              <CrossIcon />{" "}
            </IconButton>
          </Typography>
          <div className="box-contain">
            <div className="box-containt-heading">
              <Typography
                style={{
                  color: "#1F4173",
                  fontWeight: "600",
                  fontSize: "18px",
                  fontStyle: "normal",
                }}
              >
                {" "}
                {popupdata.title}
              </Typography>
            </div>
            <div className="box-container-passage">
              <div className="info">
                <Typography
                  style={{
                    fontStyle: "normal",
                    fontWeight: "400",
                    fontSize: "14px",
                  }}
                >
                  {""}
                  Contact Person{""}
                </Typography>
                <div className="b0x-container-passage-name">
                  <Typography
                    style={{
                      color: "#1F4173",
                      fontWeight: "600",
                      fontSize: "14px",
                      fontStyle: "normal",
                      marginTop: "5px",
                    }}
                  >
                    {" "}
                    {"NA  "}
                  </Typography>
                  <br />
                  
                </div>
                <Typography> Contact Email ID </Typography>
                <div className="b0x-container-passage-name">
                  <Typography
                    style={{
                      color: "#1F4173",
                      fontWeight: "600",
                      fontSize: "14px",
                      fontStyle: "normal",
                      marginTop: "5px",
                    }}
                  >
                    {"NA "}
                    
                  </Typography>
                  <br />
                  
                </div>
                <Typography>Company Name </Typography>
                <div className="b0x-container-passage-name">
                  <Typography
                    style={{
                      color: "#1F4173",
                      fontWeight: "600",
                      fontSize: "14px",
                      fontStyle: "normal",
                      marginTop: "5px",
                    }}
                  >
                    {popupdata.companyName}
                  </Typography>
                  <br />
                  
                </div>
                <Typography>Location </Typography>
                <div className="b0x-container-passage-name">
                  <Typography
                    style={{
                      color: "#1F4173",
                      fontWeight: "600",
                      fontSize: "14px",
                      fontStyle: "normal",
                      marginTop: "5px",
                    }}
                  >
                    {popupdata.location}
                  </Typography>
                  <br />
                  
                </div>
                <Typography>Job Description</Typography>
                <div className="b0x-container-passage-name">
                  <Typography
                    style={{
                      color: "#1F4173",
                      fontWeight: "600",
                      fontSize: "14px",
                      fontStyle: "normal",
                      marginTop: "5px",
                      height:"100vh"
                      
                    }}
                  >
                    {" "}
                    {popupdata.summary}
                    
                  </Typography>
                  <br />
                 
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default PopuoBox;
