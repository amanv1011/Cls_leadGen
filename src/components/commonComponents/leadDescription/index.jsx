import React from "react";
import { useSelector } from "react-redux";
import { Avatar, Divider, IconButton, Box } from "@mui/material";
import "./leadDescription.scss";

const LeadDescription = () => {
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
        <Box component={"div"} className="left-section">
          <Box component={"div"} className="title">
            {displayLeadData === undefined ? null : displayLeadData.title}
          </Box>
          <Box component={"div"} className="subtitle">
            Response #ASDF24
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
        light={true}
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
            {displayLeadData === undefined
              ? null
              : getDescription(displayLeadData.uniqueId)
              ? getDescription(displayLeadData.uniqueId)[0]
              : displayLeadData.summary}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LeadDescription;
