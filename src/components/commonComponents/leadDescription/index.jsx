import { Avatar, Divider, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import "./leadDescription.scss";

const desc =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";
const obj = {
  campaignId: "PmrXt2VjGEPeU28xDWcm",
  companyName: "Barclays",
  name: "Onkar",
  id: "fnho3mrM1a41ndJhJYms",
  location: "Glasgow G2",
  readMore:
    "https://uk.indeed.com/rc/clk?jk=f5278a4f52cfc421&fccid=057abf3fd357e717&vjs=3",
  status: 0,
  summary: "Develop the skills to code, whatever your background.",
  title: "Aspiring Developer Analyst - Expert Graduate Programme - 202...",
};
const LeadDescription = () => {
  return (
    <Box component={"div"} className="leads-description-container">
      <Box component={"div"} className="leads-description-header">
        <Box component={"div"} className="left-section">
          <Box component={"div"} className="title">
            Quality Test Assurence
          </Box>
          <Box component={"div"} className="subtitle">
            Subtitle
          </Box>
        </Box>
        <Box component={"div"} className="right-section">
          <Box component={"div"} className="links">
            <Box component={"div"} className="link">
              <IconButton>
                {/* <a href={ele.readMore} target="_blank"> */}
                <Avatar
                  sx={{ width: "24px", height: "24px" }}
                  alt="indeedLogo"
                  // src={indeedLogo3}
                  className="indeed-logo"
                />
                {/* </a> */}
              </IconButton>
              Company
            </Box>
            <Box component={"div"} className="link">
              <IconButton>
                {/* <a href={ele.readMore} target="_blank"> */}
                <Avatar
                  sx={{ width: "24px", height: "24px" }}
                  alt="indeedLogo"
                  // src={indeedLogo3}
                  className="indeed-logo"
                />
                {/* </a> */}
              </IconButton>
              People
            </Box>
            <Box component={"div"} className="link">
              <IconButton>
                {/* <a href={ele.readMore} target="_blank"> */}
                <Avatar
                  sx={{ width: "24px", height: "24px" }}
                  alt="indeedLogo"
                  // src={indeedLogo3}
                  className="indeed-logo"
                />
                {/* </a> */}
              </IconButton>
              Details
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider
        variant="middle"
        light="true"
        sx={{ height: "1px", background: "#1F4173", opacity: "0.15" }}
      />
      <Box component={"div"} className="leads-description-body">
        <Box component={"div"} className="leads-description-heading">
          <Box component={"div"} className="heading-element">
            Name : "Onkar Singh"
          </Box>
        </Box>
        <Box component={"div"} className="leads-description-desc">
          <Box component={"div"} className="leads-description-desc-title">
            Description
          </Box>
          <Box component={"div"} className="leads-description-desc-desc">
            {desc}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LeadDescription;
