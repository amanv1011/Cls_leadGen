import { Box, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "../../commonComponents/navbar";
import SideBar from "../../commonComponents/sidebar";
import "./dashboard.scss";
import Table from "../../themeComponents/table";
import { Outlet, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Circular from "../../themeComponents/circularProgress/circular";
import CircularChart from "../../themeComponents/circularProgress/circularChart";
import Button from "@mui/material/Button";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getAllCampaignsAction } from "../../../redux/actions/campaignActions";
import { getAllLeadsAction } from "../../../redux/actions/leadActions";

const Dashboard = ({ children }) => {
  const dispatch = useDispatch();
  var leadData = useSelector((state) => state.allCampaigns.campaignList);
  const genratedLeadData = useSelector((state) => state.allLeads.leadsList);
  const leadReduxState = useSelector((state) => state.allCampaigns.loading);
  const leadReduxStateErr = useSelector((state) => state.allCampaigns.err);

  let [activeCampPer, setActiveCampPer] = useState(0);
  let [activeCamp, setActiveCamp] = useState(0);
  let [leadsExtractedPer, setLeadsExtractedPer] = useState(0);
  let [leadsExtracted, setLeadsExtracted] = useState(0);
  let [todaysLeadsPer, setTodaysLeadsPer] = useState(0);
  let [todaysLeads, setTodaysLeads] = useState(0);
  let [yesterdaysLeadsPer, setYesterdaysLeadsPer] = useState(0);
  let [yesterdaysLeads, setYesterdaysLeads] = useState(0);
  let [weeklyLeadsPer, setWeeklyLeadsPer] = useState(0);
  let [weeklyLeads, setWeeklyLeads] = useState(0);

  const navigate = useNavigate();
  const viewMore = () => {
    navigate("/app/dashboard/campaign");
  };

  const goBack = () => {
    navigate("/app/dashboard");
  };

  useEffect(() => {
    dispatch(getAllCampaignsAction());
    dispatch(getAllLeadsAction());
  }, []);

  useEffect(() => {
    let ActiveCount = 0;
    let ActivePer = 0;
    let leadCount = 0;
    let Today = 0;
    let Weekly = 0;
    let Yesterday = 0;
    let TodayPer = 0;
    let WeeklyPer = 0;
    let YesterdayPer = 0;
    let leadExtracted = 0;
    let currentDate = moment().format("MM/DD/YYYY");

    
    if (leadData !== []) {
      leadData.map((ele) => {
        if (ele.status === 1) {
          ActiveCount++;
        }
      });
    }

    if (ActiveCount === 0) {
      ActivePer = 0;
    } else {
      ActivePer = (ActiveCount / (Math.ceil(ActiveCount / 100) * 100)) * 100;
    }

    if (genratedLeadData !== []) {
      genratedLeadData.map((ele) => {
        leadCount++;
        if (
          moment.unix(ele.leadGeneratedDate.seconds).format("MM/DD/YYYY") ===
          currentDate
        ) {
          Today++;
        }
        if (
          moment.unix(ele.leadGeneratedDate.seconds).format("MM/DD/YYYY") ===
          moment().subtract(1, "day").format("MM/DD/YYYY")
        ) {
          Yesterday++;
        }
        if (
          moment().startOf("week") <
          moment.unix(ele.leadGeneratedDate.seconds).format("MM/DD/YYYY") <
          moment().endOf("week")
        ) {
          Weekly++;
        }
      });
    }
    if(leadCount === 0){
      leadExtracted = 0;
    }else{
       leadExtracted = (leadCount / (Math.ceil(leadCount / 100) * 100)) * 100;
      
    }
    if(Today === 0){
      TodayPer = 0
    }else{
      TodayPer = (Today / (Math.ceil(Today / 100) * 100)) * 100;
    }
    if(Yesterday === 0){
      YesterdayPer = 0 
    }else{
      YesterdayPer = (Yesterday / (Math.ceil(Yesterday / 100) * 100)) * 100;
    }
    if(Weekly === 0){
      WeeklyPer = 0
    }else{
      WeeklyPer = (Weekly / (Math.ceil(Weekly / 100) * 100)) * 100;
    }
    
    
    setActiveCamp(ActiveCount);
    setLeadsExtracted(leadCount);
    setYesterdaysLeads(Yesterday);
    setTodaysLeads(Today);
    setWeeklyLeads(Weekly);
    setActiveCampPer(ActivePer);
    setLeadsExtractedPer(leadExtracted);
    setTodaysLeadsPer(TodayPer);
    setYesterdaysLeadsPer(YesterdayPer);
    setWeeklyLeadsPer(WeeklyPer);
  });





  return (
    <div className="dashboard-container" style={window.location.pathname === "/app/dashboard" ? { height: "100vh"} : {height:"100%"}}>
      
      <Navbar />
      <SideBar />
      
      <Box component="div" className="dshboard-content">
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginLeft: "-25px",
            marginBottom: "20px",
          }}
        >
          <IconButton onClick={goBack}>
            <ArrowBackIcon />
          </IconButton>
          <Typography component="p" className="dashboard-title">
            Lead Campaign
          </Typography>
        </Box>
        <Outlet />
        {window.location.pathname === "/app/dashboard" ? (
          <>
            <Box className="dash-box">
              <Box sx={{ boxShadow: 3 }} className="dash-lead-box">
                <Circular
                  value={activeCampPer}
                  barColor={"#3575FF"}
                  barName={"ACTIVE"}
                  innerColor={"#EFECFF"}
                />
                <div style={{ marginLeft: "20px" }}>
                  <h3 className="dash-card-head">{activeCamp}</h3>
                  <p className="dash-card-subhead">Active Campaigns</p>
                </div>
              </Box>
              <Box sx={{ boxShadow: 3 }} className="dash-lead-box">
                <Circular
                  value={leadsExtractedPer}
                  barColor={"#F36643"}
                  barName={"LEADS"}
                  innerColor={"#FFF3F0"}
                />
                <div style={{ marginLeft: "20px" }}>
                  <h3 className="dash-card-head">{leadsExtracted}</h3>
                  <p className="dash-card-subhead">Leads Extracted</p>
                </div>
              </Box>

              <Box sx={{ boxShadow: 3 }} className="dash-lead-box">
                <CircularChart
                  Todays={todaysLeadsPer}
                  Yesterdays={yesterdaysLeadsPer}
                  Weeklys={weeklyLeadsPer}
                />

                <div
                  style={{
                    marginLeft: "20px",
                    display: "flex",
                    paddingBottom: "16px",
                  }}
                >
                  <div style={{ marginRight: "45px" }}>
                    <h3 className="dash-card-head">{todaysLeads}</h3>

                    <span
                      style={{
                        display: "inline-block",
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor: "#20C997",
                      }}
                    ></span>
                    <span
                      className="dash-card-subhead"
                      style={{
                        marginLeft: "10px",
                        marginTop: "11px",
                        display: "inline-block",
                      }}
                    >
                      Today
                    </span>
                  </div>
                  <div style={{ marginRight: "45px" }}>
                    <h3 className="dash-card-head">{yesterdaysLeads}</h3>
                    <span
                      style={{
                        display: "inline-block",
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor: "#FF7049",
                      }}
                    ></span>

                    <span
                      className="dash-card-subhead"
                      style={{
                        marginLeft: "10px",
                        marginTop: "11px",
                        display: "inline-block",
                      }}
                    >
                      Yesterday
                    </span>
                  </div>
                  <div>
                    <h3 className="dash-card-head">{weeklyLeads}</h3>
                    <span
                      style={{
                        display: "inline-block",
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor: "#563BFF",
                      }}
                    ></span>

                    <span
                      className="dash-card-subhead"
                      style={{
                        marginLeft: "10px",
                        marginTop: "11px",
                        display: "inline-block",
                      }}
                    >
                      Weekly
                    </span>
                  </div>
                </div>
              </Box>
            </Box>
            <Box
              sx={{ boxShadow: 3, backgroundColor: "#FFFFFF" }}
              className="table-container"
            >
              {leadReduxState === false && leadReduxStateErr !== null ? (
                <Table leadData={leadData} />
              ) : null}
              <Button
                endIcon={<ArrowRightAltIcon />}
                style={{
                  textTransform: "none",
                  width: "100%",
                  color: "#003AD2",
                  fontWeight: "600",
                }}
                onClick={viewMore}
              >
                View More
              </Button>
            </Box>
          </>
        ) : null}
      </Box>
    </div>
  );
};

export default Dashboard;
