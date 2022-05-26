import { Avatar, IconButton, Typography } from "@mui/material";
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
import {
  cardsDisplayAction,
  getLeadsFullDescriptionAction,
} from "../../../redux/actions/leadActions";
import indeedLogo3 from "../../../assets/icons/indeedLogo3.jpg";

const Cards = (props) => {
  const dispatch = useDispatch();
  const leadsLoader = useSelector((state) => state.allLeads.loading);
  const leadsFullDescription = useSelector(
    (state) => state.allLeads.leadsFullDescription
  );
  const currentPage = useSelector((state) => state.paginationStates.activePage);
  const dataPerPage = useSelector(
    (state) => state.paginationStates.dataPerPage
  );
  const leadsData = props.leadData;

  useEffect(() => {
    dispatch(setTotalCount(leadsData.length));
    dispatch(cardsDisplayAction(leadsData));
    dispatch(getLeadsFullDescriptionAction());
  }, [leadsData.length]);

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
  const indexOfLastLead = currentPage * dataPerPage;
  const indexOfFirstLead = indexOfLastLead - dataPerPage;
  const currentLeads = leadsData.slice(indexOfFirstLead, indexOfLastLead);

  const getDescription = (elementUniqueId) => {
    const descNow = leadsFullDescription.filter((leadsFullDescUniqueId) => {
      return leadsFullDescUniqueId.uniqueId === elementUniqueId;
    });
    return descNow.length !== 0 ? descNow.map((wow) => wow.descData) : "";
  };

  if (leadsLoader === true) {
    return <Loader openLoader={leadsLoader} />;
  } else if (leadsLoader === false && currentLeads.length === 0) {
    return (
      <React.Fragment>
        <Box className="lead-container">
          <Box className="lead-header">
            <Box className="lead-header-title"></Box>
          </Box>
          <Box className="lead-body">No Data Found</Box>
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
                            height: "15px",
                            marginTop: "3px",
                            width: "73px",
                            fontSize: "11px",
                          }}
                          label="Approved"
                          size="small"
                        />
                      ) : ele.status === -1 ? (
                        <Chip
                          sx={{
                            background: "#FF6C5F",
                            color: "white",
                            height: "15px",
                            marginTop: "3px",
                            width: "65px",
                            fontSize: "11px",
                          }}
                          label="Rejected"
                          size="small"
                        />
                      ) : ele.status === 2 ? (
                        <Chip
                          sx={{
                            color: "white",
                            background: "#FFD365",
                            height: "15px",
                            marginTop: "3px",
                            width: "59px",
                            fontSize: "11px",
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

                    {ele.readMore != null ? (
                      <>
                        <IconButton>
                          <a
                            href={ele.readMore}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <Avatar
                              sx={{ width: "24px", height: "24px" }}
                              alt="indeedLogo"
                              src={indeedLogo3}
                              className="indeed-logo"
                            />
                          </a>
                        </IconButton>
                      </>
                    ) : null}
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
                <Box className="lead-body">
                  <div className="lead-body-row1">
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
                          {ele.companyName !== null ? ele.companyName : "..."}
                        </p>
                      </div>
                    </div>

                    <div className="lead-body-column">
                      <div className="lead-body-column-card3">
                        <p className="head-body">Description</p>

                        <p
                          className="body-detail"
                          style={{
                            width: "350px",
                            height: "auto",
                            textAlign: "justify",
                            whiteSpace: "pre-wrap",
                          }}
                        >
                          {getDescription(ele.uniqueId)
                            ? getDescription(ele.uniqueId)[0]
                            : ele.summary}
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
