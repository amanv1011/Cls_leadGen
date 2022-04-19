import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import LinkedIn from "./LinkedIn";
import moment from "moment";
import {
  getPopupEnable,
  getPopupDisable,
} from "../../../redux/actions/PopupAction";
import { useSelector, useDispatch } from "react-redux";
import React from "react";
import { updateLeadStatus } from "../../../redux/actions/leadActions";
import approv from "../../../assets/approv.svg";
import reject from "../../../assets/reject.svg";
import archieve from "../../../assets/archieve.svg";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import "./lead.scss";

const Cards = (props) => {
  const dispatch = useDispatch();

  var leadsData = props.leadData;

  let approveButton = (event) => {
    dispatch(updateLeadStatus(event.target.value, 1));
  };
  let rejectButton = (event) => {
    dispatch(updateLeadStatus(event.target.value, -1));
  };
  let archieveButton = (event) => {
    dispatch(updateLeadStatus(event.target.value, 2));
  };

  const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
      fontFamily: "Segoe UI",
      fontSize:"14px",
      fontWeight:"600",
      borderRadius:"8px"
    },
  }));

  const openPopup = (e) => {
    e.preventDefault();

    let leadsId = e.currentTarget.id;

    let leadsIdData = leadsData.filter((ele) => ele.id === leadsId);

    dispatch(getPopupEnable(leadsIdData));
  };

  return (
    <>
      {leadsData.map((ele) => {
        return (
          <>
            <Box className="lead-container">
              <Box className="lead-header">
                <Box
                  onClick={openPopup}
                  id={ele.id}
                  className="lead-header-title"
                >
                  <Typography className="lead-header-title-component">
                    {ele.title.slice(0, 20)}
                  </Typography>
                </Box>
                <Box className="lead-header-option">
                  <span className="Response-time">
                    {" "}
                    {moment.unix(ele.leadGeneratedDate.seconds).fromNow()}{" "}
                  </span>
                  <IconButton>
                    {" "}
                    <a href={ele.link}>
                      <LinkedIn />
                    </a>{" "}
                  </IconButton>
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                </Box>
              </Box>
              <hr className="line" />
              <Box
                style={{ display: "flex", paddingTop: "16px" }}
                className="lead-body"
              >
                <div
                  style={{ display: "flex", width: "100%" }}
                  className="lead-body-row1"
                >
                  <div className="lead-body-column">
                    <div className="lead-body-column-card1">
                      <p className="head-body">Key Skills</p>
                      <p className="body-detail">...</p>
                    </div>
                  </div>

                  <div className="lead-body-column">
                    <div className="lead-body-column-card2">
                      <p className="head-body">Company</p>
                      <p className="body-detail">
                        {ele.companyName !== null
                          ? ele.companyName.slice(0, 10)
                          : "..."}
                      </p>
                    </div>
                  </div>

                  <div className="lead-body-column">
                    <div className="lead-body-column-card3">
                      <p className="head-body">Description</p>
                      <p className="body-detail" style={{ width: "13vw" }}>
                        {ele.summary.slice(0, 30)}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "100%",
                    marginRight: "2vw",
                  }}
                  className="lead-body-row2"
                >
                  <div
                    className="bt"
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    {ele.status !==
                    1 ? (
                      <div style={{ marginRight: "1vw" }}>
                        <BootstrapTooltip
                          placement="top"
                          sx={{ color: "black" }}
                          title="Approve"
                          arrow
                        >
                          <input
                            type="image"
                            style={{ width: "25px" }}
                            src={approv}
                            onClick={approveButton}
                            value={ele.id}
                          />
                        </BootstrapTooltip>
                      </div>
                    ) : null}
                    {ele.status !== -1 ? (
                      <div style={{ marginRight: "1vw" }}>
                        <BootstrapTooltip
                          placement="top"
                          sx={{ fontFamily:'Segoe UI'}}
                          title="Reject"
                          arrow
                        >
                          <input
                            type="image"
                            style={{ width: "25px" }}
                            src={reject}
                            onClick={rejectButton}
                            value={ele.id}
                          />
                        </BootstrapTooltip>
                      </div>
                    ) : null}
                    {ele.status !==
                    2 ? (
                      <div>
                        <BootstrapTooltip
                          placement="top"
                          sx={{ color: "black" }}
                          title="Archieve"
                          arrow
                        >
                          <input
                            type="image"
                            style={{ width: "27.5px", paddingTop: "1px" }}
                            src={archieve}
                            onClick={archieveButton}
                            value={ele.id}
                          />
                        </BootstrapTooltip>
                      </div>
                    ) : null}
                  </div>
                </div>
              </Box>
            </Box>
          </>
        );
      })}
    </>
  );
};

export default Cards;
