import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import LinkedIn from "./LinkedIn";
import moment from "moment";
import { getPopupEnable } from "../../../redux/actions/PopupAction";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { updateLeadStatus } from "../../../redux/actions/leadActions";
import approv from "../../../assets/approv.svg";
import reject from "../../../assets/reject.svg";
import archieve from "../../../assets/archieve.svg";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import "./lead.scss";
import { useSelector } from "react-redux";
import { setTotalCount } from "../../../redux/actions/paginationActions";
import Loader from "../../themeComponents/Loader";

const Cards = (props) => {
  const dispatch = useDispatch();
  const leadsLoader = useSelector((state) => state.allLeads.loading);
  const currentPage = useSelector((state) => state.paginationStates.activePage);
  const leadsPerPage = useSelector(
    (state) => state.paginationStates.leadsPerPage
  );
  const leadsData = props.leadData;

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
      fontSize: "14px",
      fontWeight: "600",
      borderRadius: "8px",
    },
  }));
  const openPopup = (e) => {
    e.preventDefault();
    let leadsId = e.currentTarget.id;
    let leadsIdData = leadsData.filter((ele) => ele.id === leadsId);
    dispatch(getPopupEnable(leadsIdData));
  };

  var linkedInCompany;
  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = leadsData.slice(indexOfFirstLead, indexOfLastLead);

  useEffect(() => {
    dispatch(setTotalCount(leadsData.length));
  });

  if (leadsLoader === true) {
    return <Loader openLoader={leadsLoader} />;
  } else if (leadsLoader === false && currentLeads.length === 0) {
    return (
      <React.Fragment>
        <Box className="lead-container">
          <Box className="lead-header">
            <Box
              className="lead-header-title"
              style={{
                fontSize: "20px",
                color: "rgb(0,58,210)",
              }}
            >
              No Data found
            </Box>
          </Box>
          <Box
            className="lead-body"
            style={{
              textAlign: "center",
              fontSize: "20px",
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
              color: "rgb(0,58,210)",
            }}
          >
            Nothing to show
          </Box>
        </Box>
      </React.Fragment>
    );
  } else {


    return (
      <React.Fragment>
        {currentLeads.map((ele) => {
          if (ele.companyName !== null) {
            linkedInCompany = ele.companyName.toLowerCase().split(" ").join("");
          } else {
            linkedInCompany = "";
          }
          return (
            <React.Fragment key={ele.id}>

              <Box className="lead-container">
                <Box className="lead-header">
                  <Box
                    onClick={openPopup}
                    key={ele.id}
                    id={ele.id}
                    className="lead-header-title"
                    fontStyle={{ display: "flex" }}
                  >
                    <Typography
                      sx={{
                        fontSize: "15px !important",
                        fontWeight: "600",
                        marginRight: "9px",
                        cursor: "pointer",
                      }}
                      className="lead-header-title-component"
                    >
                      {ele.title}
                    </Typography>
                    {window.location.pathname === "/leads" ? (
                      ele.status === 1 ? (
                        <Chip
                          sx={{
                            background: "#16C31E",
                            color: "white",
                            fontWeight: "600",
                            height: "15px",
                            marginTop: "3px",
                            width: "82px"
                          }}
                          label="Approved"
                          size="small"
                        />
                      ) : ele.status === -1 ? (
                        <Chip
                          sx={{
                            background: "#FF6C5F",
                            color: "white",
                            fontWeight: "600",
                            height: "15px",
                            marginTop: "3px",
                            width: "74px",
                          }}
                          label="Rejected"
                          size="small"
                        />
                      ) : ele.status === 2 ? (
                        <Chip
                          sx={{
                            color: "white",
                            background: "#FFD365",
                            fontWeight: "600",
                            height: "15px",
                            marginTop: "3px",
                            width: "67px",
                          }}
                          label="Archive"
                          size="small"
                        />
                      ) : null
                    ) : null}
                  </Box>
                  <Box className="lead-header-option">
                    <span className="Response-time">
                      {moment.unix(ele.leadGeneratedDate.seconds).fromNow()}
                    </span>

                    <IconButton style={{ paddingBottom: "0px" }}>
                      {linkedInCompany ? (
                        <a
                          href={`https://www.linkedin.com/company/${linkedInCompany}/`}
                          target="blank"
                        >
                          <LinkedIn />
                        </a>
                      ) : (
                        <a href={`https://www.linkedin.com`} target="blank">
                          <LinkedIn />
                        </a>
                      )}
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
                            ? ele.companyName.slice(0, 50)
                            : "..."}
                        </p>
                      </div>
                    </div>

                    <div className="lead-body-column">
                      <div className="lead-body-column-card3">
                        <p className="head-body">Description</p>
                        <p className="body-detail" style={{ width: "350px" }}>
                          {ele.summary.slice(0, 70)}...
                          <span className="readmore-popup"
                            key={ele.id}
                            id={ele.id}
                            onClick={openPopup}>
                            Read More
                          </span>
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
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      {ele.status !== 1 ? (
                        <div style={{ marginRight: "1vw" }}>
                          <BootstrapTooltip
                            placement="top"
                            sx={{ color: "black" }}
                            title="Approve"
                            arrow
                          >
                            <input
                              type="image"
                              alt="approve_image"
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
                            title="Reject"
                            arrow
                          >
                            <input
                              type="image"
                              alt="reject_image"
                              style={{ width: "25px" }}
                              src={reject}
                              onClick={rejectButton}
                              value={ele.id}
                            />
                          </BootstrapTooltip>
                        </div>
                      ) : null}
                      {ele.status !== 2 ? (
                        <div>
                          <BootstrapTooltip
                            placement="top"
                            sx={{ color: "black" }}
                            title="Archive"
                            arrow
                          >
                            <input
                              type="image"
                              alt="archieve_image"
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

            </React.Fragment>
          );
        })}
      </React.Fragment>
    );
  }
};

export default Cards;
