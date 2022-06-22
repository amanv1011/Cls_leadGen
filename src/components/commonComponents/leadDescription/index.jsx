import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Avatar, Divider, IconButton, Box } from "@mui/material";
import Details from "../../../assets/icons/Details.png";
import LinkedInIcon from "../../../assets/icons/LinkedInIcon.png";
import "./leadDescription.scss";
import IPopup from "../../themeComponents/popup/leadPopup";

const LeadDescription = ({ selectedLeadIdFun }) => {
  const displayLeadData = useSelector((state) => state.PopupReducer.popupData);

  const leadsFullDescription = useSelector(
    (state) => state.allLeads.leadsFullDescription
  );
  let linkedInCompany;
  if (
    displayLeadData &&
    displayLeadData.companyName &&
    displayLeadData.companyName !== null
  ) {
    linkedInCompany =
      displayLeadData &&
      displayLeadData.companyName.toLowerCase().split(" ").join("");
  } else {
    linkedInCompany = "";
  }

  const getDescription = (elementUniqueId) => {
    const descNow = leadsFullDescription.filter((leadsFullDescUniqueId) => {
      return leadsFullDescUniqueId.uniqueId === elementUniqueId;
    });
    return descNow.length !== 0 ? descNow.map((wow) => wow.descData) : "";
  };

  return (
    <React.Fragment>
      <Box component={"div"} className="leads-description-container">
        <Box component={"div"} className="leads-description-header">
          {displayLeadData && displayLeadData ? (
            <>
              {" "}
              <Box component={"div"} className="left-section">
                <Box component={"div"} className="title">
                  {displayLeadData === undefined ? null : displayLeadData.title}
                </Box>
              </Box>
              <Box component={"div"} className="right-section">
                <Box component={"div"} className="links">
                  <a
                    href={
                      linkedInCompany
                        ? `https://www.linkedin.com/search/results/companies/?keywords=${linkedInCompany}`
                        : "https://www.linkedin.com"
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="link"
                  >
                    <Box component={"div"}>
                      <IconButton sx={{ padding: "2px" }}>
                        <Avatar
                          sx={{ width: "15px", height: "15px" }}
                          alt="indeedLogo"
                          src={LinkedInIcon}
                          className="indeed-logo"
                        />
                      </IconButton>
                      Company
                    </Box>
                  </a>
                  <a
                    href={
                      linkedInCompany
                        ? `https://www.linkedin.com/search/results/people/?keywords=${linkedInCompany}`
                        : "https://www.linkedin.com"
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="link"
                  >
                    <Box component={"div"}>
                      <IconButton sx={{ padding: "2px" }}>
                        <Avatar
                          sx={{ width: "15px", height: "15px" }}
                          alt="indeedLogo"
                          src={LinkedInIcon}
                          className="indeed-logo"
                        />
                      </IconButton>
                      People
                    </Box>
                  </a>
                  <a
                    href={
                      displayLeadData && displayLeadData.readMore
                        ? displayLeadData.readMore
                        : displayLeadData.link
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="link"
                  >
                    <Box component={"div"}>
                      <IconButton sx={{ padding: "2px", marginRight: "2px" }}>
                        <Avatar
                          sx={{ width: "15px", height: "15px" }}
                          alt="indeedLogo"
                          src={Details}
                          className="indeed-logo"
                        />
                      </IconButton>
                      Details
                    </Box>
                  </a>
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
          {displayLeadData ? (
            <>
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
                      {displayLeadData && displayLeadData.companyName
                        ? displayLeadData.companyName
                        : "NA"}
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
          ) : null}
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default LeadDescription;
