import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import "./tabs.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Redirect} from 'react-router';

export default function BasicTabs({ type }) {
  const [value, setValue] = React.useState(0);
  const approveCount  = useSelector((state) => state.approveRejectCount.approveCount)
  const rejectCount  = useSelector((state) => state.approveRejectCount.rejectCount)
  const underreviewCount  = useSelector((state) => state.approveRejectCount.underreviewCount)

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  var [ hover, setHover] = useState(true);

  var [ leadsHover, setLeadsHover] = useState(false);


  

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderColor: "divider" }}>
        {type === "dashboardTabs" ? (
          <Tabs value={value} onChange={handleChange} className="form-tabs">
            <Tab
              disableRipple
              label="Campaign"
              component={Link}
              to="/app/dashboard/campaign"
              sx={{ textTransform: "none", color: hover ? "rgb(0,58,210)!important" :"rgb(31,65,115)!important" , fontFamily: "Segoe UI", fontSize: "16px !important" }}
              // onFocus = { () => setHover(true)}
              // outOffFocus = { () => setHover(false)} 
              onClick= { () => {setHover(true); setLeadsHover(false)}}

            />
            <Tab
              disableRipple
              label="Leads"
              component={Link}
              to="/app/dashboard/leads"
              sx={{ textTransform: "none", color: leadsHover ? "rgb(0,58,210)!important" :"rgb(31,65,115)!important", fontFamily: "Segoe UI" , fontSize: "16px !important" }}
              onClick= { () => {setHover(false); setLeadsHover(true)}}

            />
            
          </Tabs>
        ) : (
          <Tabs value={value} onChange={handleChange} className="form-tabs">
            <Tab component={Link} to="/app/dashboard/leads" label="All" sx={{ textTransform: "none" }} />
            <Tab  component={Link} to="/app/dashboard/leads/underreview" label={`Under Review( ${underreviewCount})`} sx={{ textTransform: "none" }} />
            <Tab component={Link} to="/app/dashboard/leads/approve" label={`Approved (${approveCount})`} sx={{ textTransform: "none" }} />
            <Tab component={Link} to="/app/dashboard/leads/reject" label={`Rejected (${rejectCount})`} sx={{ textTransform: "none" }} />
            <Tab component={Link} to="/app/dashboard/leads/archive" label="Archieve(100)" sx={{ textTransform: "none" }} />
          </Tabs>
        )}
      </Box>
    </Box>
  );
}
