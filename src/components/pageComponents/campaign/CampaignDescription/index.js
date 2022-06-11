import React from "react";
import { useSelector } from "react-redux";
import { Divider, Box, Switch } from "@mui/material";
import moment from "moment";
import { alpha, styled } from "@mui/material/styles";
import { green, red } from "@mui/material/colors";
import "./campaignDescription.scss";

const GreenSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase": {
    color: red[600],
    "&:hover": {
      backgroundColor: alpha(red[600], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase + .MuiSwitch-track": {
    backgroundColor: red[600],
  },
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: green[600],
    "&:hover": {
      backgroundColor: alpha(green[600], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: green[600],
  },
}));

const CampaignDescription = ({ campaignDoc }) => {
  console.log("campaignDoc", campaignDoc);
  let sourceType = "";

  if (campaignDoc && campaignDoc.source === "seek_aus") {
    sourceType = "Seek Australia";
  } else if (campaignDoc && campaignDoc.source === "indeed_aus") {
    sourceType = "Indeed Australia";
  } else if (campaignDoc && campaignDoc.source === "indeed_ca") {
    sourceType = "Indeed Canada";
  } else if (campaignDoc && campaignDoc.source === "indeed_uk") {
    sourceType = "Indeed United";
  } else if (campaignDoc && campaignDoc.source === "indeed_il") {
    sourceType = "Indeed Italy";
  } else if (campaignDoc && campaignDoc.source === "indeed_ae") {
    sourceType = "Indeed UAE";
  } else if (campaignDoc && campaignDoc.source === "indeed_fi") {
    sourceType = "Indeed Finland";
  } else if (campaignDoc && campaignDoc.source === "indeed_ch") {
    sourceType = "Indeed China";
  } else if (campaignDoc && campaignDoc.source === "indeed_pt") {
    sourceType = "Indeed Portugal";
  } else if (campaignDoc && campaignDoc.source === "indeed_sg") {
    sourceType = "Indeed Singapore";
  } else {
    sourceType = "LinkedIn";
  }

  return (
    <Box component={"div"} className="campaign-description-container">
      <Box component={"div"} className="campaign-description-header">
        <Box component={"div"} className="left-section">
          <Box component={"div"} className="title">
            {campaignDoc && campaignDoc.name}
          </Box>
          <Box component={"div"} className="subtitle">
            Tag: {campaignDoc.tags && campaignDoc.tags.toString()}
          </Box>
        </Box>
        <Box component={"div"} className="right-section">
          <span className="status-text">
            {campaignDoc && campaignDoc.status ? "Active" : "In-Active"}
          </span>
          <GreenSwitch
            className="toggleSwitch"
            checked={campaignDoc && campaignDoc.status ? true : false}
            // onClick={(event) => statusUpdate(event, campaignListItem.id)}
          />
        </Box>
      </Box>
      <Divider
        variant="middle"
        light={true}
        sx={{ height: "1px", background: "#1F4173", opacity: "0.15" }}
      />
      <Box component={"div"} className="campaign-description-body">
        <Box component={"div"} className="campaign-description-heading">
          <Box component={"div"} className="heading-element">
            <div className="header-item">
              <span className="header-key">Source Type</span>
              <span className="header-value">{sourceType}</span>
            </div>
            <div className="header-item">
              <span className="header-key">Start Date</span>
              <span className="header-value">
                {campaignDoc?.start_date &&
                  moment
                    .unix(
                      campaignDoc.start_date.seconds,
                      campaignDoc.start_date.nanoseconds
                    )
                    .format("MM/DD/YYYY")}
              </span>
            </div>
            <div className="header-item">
              <span className="header-key">End Date</span>
              <span className="header-value">
                {campaignDoc?.end_date &&
                  moment
                    .unix(
                      campaignDoc.end_date.seconds,
                      campaignDoc.end_date.nanoseconds
                    )
                    .format("MM/DD/YYYY")}
              </span>
            </div>
            <div className="header-item">
              <span className="header-key">Frequency</span>
              <span className="header-value">
                {campaignDoc && campaignDoc.frequency}
              </span>
            </div>
            <div className="header-item">
              <span className="header-key">Extract No. Of Page(s)</span>
              <span className="header-value">
                {campaignDoc && campaignDoc.pages}
              </span>
            </div>
            <div className="header-item">
              <span className="header-key">Locaion</span>
              <span className="header-value">
                {campaignDoc && campaignDoc.location}
              </span>
            </div>
            <div className="header-item">
              <span className="header-key">Created By</span>
              <span className="header-value">
                {campaignDoc && campaignDoc.owner}
              </span>
            </div>
            <div className="header-item">
              <span className="header-key">Last Crawled Data</span>
              <span className="header-value">
                {campaignDoc?.lastCrawledDate &&
                campaignDoc.lastCrawledDate &&
                campaignDoc.lastCrawledDate !== undefined
                  ? moment
                      .unix(
                        campaignDoc.lastCrawledDate.seconds,
                        campaignDoc.lastCrawledDate.nanoseconds
                      )
                      .format("MM/DD/YYYY")
                  : "NA"}
              </span>
            </div>
            <div className="header-item">
              <span className="header-key">Start Time</span>
              <span className="header-value">
                {campaignDoc && campaignDoc.start_time}
              </span>
            </div>
            <div className="header-item">
              <span className="header-key">End Time</span>
              <span className="header-value">
                {campaignDoc && campaignDoc.end_time}
              </span>
            </div>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CampaignDescription;
