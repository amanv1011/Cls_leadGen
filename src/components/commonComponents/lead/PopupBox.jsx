import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CrossIcon from "./Cross";
import { useSelector, useDispatch } from "react-redux";
import "./PopupBox.scss";
import { display } from "@mui/system";
import { IconButton } from "@mui/material";
import { getPopupDisable } from "../../../redux/actions/PopupAction";

function PopuoBox(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(true);
  // const popupStatus = useSelector((state) => {setOpen(state.popupStatus.popupStatus)})
  console.log(props.data);
  const popupdata = props.data[0];

  const handleClose = () => {
    dispatch(getPopupDisable());
  };

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="popupContainer">
          <Typography id="modal-modal-title" variant="p" component="p">
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
                  {" "}
                  Contact Person{" "}
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
                    Ajay{" "}
                  </Typography>
                  <br />
                  <hr style={{ color: "#1F4173", opacity: "0.1" }} />
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
                    {" "}
                    ajay.gupta@hcl.com
                  </Typography>
                  <br />
                  <hr style={{ color: "#1F4173", opacity: "0.1" }} />
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
                  <hr style={{ color: "#1F4173", opacity: "0.1" }} />
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
                    }}
                  >
                    {" "}
                    {popupdata.summary}
                  </Typography>
                  <br />
                  <hr style={{ color: "black", opacity: "0.1" }} />
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
