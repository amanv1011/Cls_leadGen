import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import "./tabs.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";

export default function BasicTabs({ type }) {
  const [value, setValue] = React.useState(0);
  const [valueTabs, setValueTabs] = useState(0);
  const matches = useMediaQuery("(max-width:1460px)");

  const approveCount = useSelector(
    (state) => state.approveRejectCount.approveCount
  );
  const rejectCount = useSelector(
    (state) => state.approveRejectCount.rejectCount
  );
  const underreviewCount = useSelector(
    (state) => state.approveRejectCount.underreviewCount
  );
  const archieveCount = useSelector(
    (state) => state.approveRejectCount.archieveCount
  );
  const allCount = useSelector((state) => state.approveRejectCount.allCount);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  var [hover, setHover] = useState(true);

  var [leadsHover, setLeadsHover] = useState(false);

  useEffect(() => {
    if (window.location.pathname === "/campaign") {
      setValue(0);
    }
    if (window.location.pathname === "/leads") {
      setValue(1);
    }
    if (window.location.pathname === "/leads") {
      setValue(1);
      setValueTabs(0);
    }
    if (window.location.pathname === "/leads/underreview") {
      setValue(1);
      setValueTabs(1);
    }
    if (window.location.pathname === "/leads/approve") {
      setValue(1);
      setValueTabs(2);
    }
    if (window.location.pathname === "/leads/reject") {
      setValue(1);
      setValueTabs(3);
    }
    if (window.location.pathname === "/leads/archive") {
      setValue(1);
      setValueTabs(4);
    }
  });

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderColor: "divider" }}>
        {type === "dashboardTabs" ? (
          <Tabs value={value} onChange={handleChange} className="form-tabs">
            <Tab
              label="Campaign"
              component={Link}
              to="/campaign"
              sx={{
                textTransform: "none",
                color: hover
                  ? "rgb(0,58,210)!important"
                  : "rgb(31,65,115)!important",
                fontSize: matches ? "15px" : "16px",
              }}
              onClick={() => {
                setHover(true);
                setLeadsHover(false);
              }}
            />
            <Tab
              label="Leads"
              component={Link}
              to="/leads"
              sx={{
                textTransform: "none",
                color: leadsHover
                  ? "rgb(0,58,210)!important"
                  : "rgb(31,65,115)!important",
                fontSize: matches ? "14px" : "16px !important",
              }}
              onClick={() => {
                setHover(false);
                setLeadsHover(true);
              }}
            />
          </Tabs>
        ) : (
          <Tabs value={valueTabs} onChange={handleChange} className="form-tabs">
            <Tab
              component={Link}
              to="/leads"
              label={`All (${allCount})`}
              sx={{
                textTransform: "none",
                fontSize: matches ? "13px" : "14px !important",
                fontWeight: "600",
              }}
            />
            <Tab
              component={Link}
              to="/leads/underreview"
              label={`Under Review(${underreviewCount})`}
              sx={{
                textTransform: "none",
                fontSize: matches ? "13px" : "14px !important",
                fontWeight: "600",
              }}
            />
            <Tab
              component={Link}
              to="/leads/approve"
              label={`Approved (${approveCount})`}
              sx={{
                textTransform: "none",
                fontSize: matches ? "13px" : "14px !important",
                fontWeight: "600",
              }}
            />
            <Tab
              component={Link}
              to="/leads/reject"
              label={`Rejected (${rejectCount})`}
              sx={{
                textTransform: "none",
                fontSize: matches ? "13px" : "14px !important",
                fontWeight: "600",
              }}
            />
            <Tab
              component={Link}
              to="/leads/archive"
              label={`Archive (${archieveCount})`}
              sx={{
                textTransform: "none",
                fontSize: matches ? "13px" : "14px !important",
                fontWeight: "600",
              }}
            />
          </Tabs>
        )}
      </Box>
    </Box>
  );
}
