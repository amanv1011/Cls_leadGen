import React from "react";
import { useSelector } from "react-redux";
import { Avatar, Divider, IconButton, Box } from "@mui/material";
import "./leadDescription.scss";
import LinkedIn from "../../commonComponents/lead/LinkedIn";
import avatar from "../../../assets/avatar.png";
import Logo from "../../../assets/Logo.svg";

const LeadDescription = ({ selectedLeadIdFun }) => {
  const displayLeadData = useSelector(
    (state) => state.popupStatus.popupData[0]
  );

  const leadsFullDescription = useSelector(
    (state) => state.allLeads.leadsFullDescription
  );

  const getDescription = (elementUniqueId) => {
    const descNow = leadsFullDescription.filter((leadsFullDescUniqueId) => {
      return leadsFullDescUniqueId.uniqueId === elementUniqueId;
    });
    return descNow.length !== 0 ? descNow.map((wow) => wow.descData) : "";
  };

  return (
    <Box component={"div"} className="leads-description-container">
      <Box component={"div"} className="leads-description-header">
        {displayLeadData && displayLeadData ? (
          <>
            {" "}
            <Box component={"div"} className="left-section">
              <Box component={"div"} className="title">
                {displayLeadData === undefined ? null : displayLeadData.title}
              </Box>
              {/* <Box component={"div"} className="subtitle"></Box> */}
            </Box>
            <Box component={"div"} className="right-section">
              <Box component={"div"} className="links">
                <Box component={"div"} className="link">
                  <IconButton sx={{ padding: "4px" }}>
                    {/* <a href={ele.readMore} target="_blank"> */}
                    <Avatar
                      sx={{ width: "18px", height: "18px" }}
                      alt="indeedLogo"
                      // src={indeedLogo3}
                      className="indeed-logo"
                    />
                    {/* </a> */}
                  </IconButton>
                  Company
                </Box>
                <Box component={"div"} className="link">
                  <IconButton sx={{ padding: "4px" }}>
                    {/* <a href={ele.readMore} target="_blank"> */}
                    <Avatar
                      sx={{ width: "18px", height: "18px" }}
                      alt="indeedLogo"
                      // src={indeedLogo3}
                      className="indeed-logo"
                    />
                    {/* </a> */}
                  </IconButton>
                  People
                </Box>
                <Box component={"div"} className="link">
                  <IconButton sx={{ padding: "4px" }}>
                    {/* <a href={ele.readMore} target="_blank"> */}
                    <Avatar
                      sx={{ width: "18px", height: "18px" }}
                      alt="indeedLogo"
                      // src={indeedLogo3}
                      className="indeed-logo"
                    />
                    {/* </a> */}
                  </IconButton>
                  Details
                </Box>
              </Box>
            </Box>{" "}
          </>
        ) : null}
      </Box>
      <Divider
        variant="middle"
        light={true}
        sx={{ height: "1px", background: "#1F4173", opacity: "0.15" }}
      />
      <Box component={"div"} className="leads-description-body">
        {displayLeadData && displayLeadData ? (
          <>
            {" "}
            <Box component={"div"} className="leads-description-heading">
              <Box component={"div"} className="heading-element">
                <div className="header-item">
                  <span className="header-key">Contact Person:</span>
                  <span className="header-value">NA</span>
                </div>
                <div className="header-item">
                  <span className="header-key">Contact Email ID:</span>
                  <span className="header-value">NA</span>
                </div>
                <div className="header-item">
                  <span className="header-key">Company Name:</span>
                  <span className="header-value">
                    {displayLeadData && displayLeadData.companyName}
                  </span>
                </div>
                <div className="header-item">
                  <span className="header-key">Experience(Yrs):</span>
                  <span className="header-value">NA</span>
                </div>
              </Box>
            </Box>
            <Box component={"div"} className="leads-description-desc">
              <Box component={"div"} className="leads-description-desc-title">
                Description
              </Box>
              <Box component={"div"} className="leads-description-desc-desc">
                {displayLeadData === undefined
                  ? null
                  : getDescription(displayLeadData.uniqueId)
                  ? getDescription(displayLeadData.uniqueId)[0]
                  : displayLeadData.summary}
              </Box>
            </Box>
          </>
        ) : (
          <img
            src={Logo}
            alt="logo"
            height="50%"
            width="75%"
            style={{
              opacity: 0.05,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "25% 10% ",
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default LeadDescription;
