import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Table from "../../themeComponents/table";
import { Outlet, useNavigate } from "react-router-dom";
import Circular from "../../themeComponents/circularProgress/circular";
import CircularChart from "../../themeComponents/circularProgress/circularChart";
import Button from "@mui/material/Button";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  getAllCampaignsAction,
  getAssignedCampaignsAction,
} from "../../../redux/actions/campaignActions";
import {
  getAllLeadsAction,
  getLeadsFullDescriptionAction,
} from "../../../redux/actions/leadActions";
import { getlastCrawledDateAction } from "../../../redux/actions/lastCrawledDateActions";
import { getCountryAction } from "../../../redux/actions/countryActions";
import { getBlockedCompaniesListAction } from "../../../redux/actions/blockedCompaniesAction";
import "./dashboard.scss";

const Dashboard = ({ children }) => {
  const dispatch = useDispatch();
  var leadData = useSelector((state) => state.allCampaigns.campaignList);
  const genratedLeadData1 = useSelector((state) => state.allLeads.leadsList);
  const leadReduxState = useSelector((state) => state.allCampaigns.loading);
  const leadReduxStateErr = useSelector((state) => state.allCampaigns.err);
  const blockedCompaniesList = useSelector(
    (state) => state.blockedCompaniesReducer.blockedCompainesList
  );

  let array1 = [];

  blockedCompaniesList.length > 0 &&
    blockedCompaniesList.map((blocked) =>
      blocked.leadId.map((item) => array1.push(item))
    );

  let genratedLeadData = genratedLeadData1.filter(function (item) {
    return !array1.includes(item.id);
  });

  let [activeCampPer, setActiveCampPer] = useState(0);
  let [activeCamp, setActiveCamp] = useState(0);
  let [totalCampPer, setTotalCampPer] = useState(0);
  let [totalCamp, setTotalCamp] = useState(0);
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
    navigate("/campaign");
  };

  useEffect(() => {
    dispatch(getAllCampaignsAction());
    dispatch(getAllLeadsAction());
    dispatch(getLeadsFullDescriptionAction());
    dispatch(getCountryAction());
    dispatch(getAssignedCampaignsAction());
    dispatch(getlastCrawledDateAction());
    dispatch(getBlockedCompaniesListAction());
  }, []);

  useEffect(() => {
    let ActiveCount = 0;
    let ActivePer = 0;
    let TotalCount = leadData.length;
    let TotalPer = 0;
    let leadCount = 0;
    let Today = 0;
    let Weekly = 0;
    let Yesterday = 0;
    let TodayPer = 0;
    let WeeklyPer = 0;
    let YesterdayPer = 0;
    let leadExtracted = 0;
    let currentDate = moment().format("MM/DD/YYYY");

    if (TotalCount === 0) {
      TotalPer = 0;
    } else {
      TotalPer = (TotalCount / (Math.ceil(TotalCount / 100) * 100)) * 100;
    }

    if (leadData !== []) {
      leadData.forEach((ele) => {
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
      genratedLeadData.forEach((ele) => {
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

    for (let i = 0; i < leadData.length; i++) {
      for (let j = 0; j < genratedLeadData.length; j++) {
        if (genratedLeadData[j].campaignId === leadData[i].id) {
          leadCount++;
        }
      }
    }
    if (leadCount === 0) {
      leadExtracted = 0;
    } else {
      leadExtracted = (leadCount / (Math.ceil(leadCount / 100) * 100)) * 100;
    }
    if (Today === 0) {
      TodayPer = 0;
    } else {
      TodayPer = (Today / (Math.ceil(Today / 100) * 100)) * 100;
    }
    if (Yesterday === 0) {
      YesterdayPer = 0;
    } else {
      YesterdayPer = (Yesterday / (Math.ceil(Yesterday / 100) * 100)) * 100;
    }
    if (Weekly === 0) {
      WeeklyPer = 0;
    } else {
      WeeklyPer = (Weekly / (Math.ceil(Weekly / 100) * 100)) * 100;
    }

    setTotalCamp(TotalCount);
    setActiveCamp(ActiveCount);
    setLeadsExtracted(leadCount);
    setYesterdaysLeads(Yesterday);
    setTodaysLeads(Today);
    setWeeklyLeads(Weekly);
    setTotalCampPer(TotalPer);
    setActiveCampPer(ActivePer);
    setLeadsExtractedPer(leadExtracted);
    setTodaysLeadsPer(TodayPer);
    setYesterdaysLeadsPer(YesterdayPer);
    setWeeklyLeadsPer(WeeklyPer);
  });

  return (
    <>
      <Box component="div" className="dshboard-content">
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",

            marginBottom: "5px",
            paddingTop: "15px",
          }}
        ></Box>
        <Outlet />
        {window.location.pathname === "/" ? (
          <>
            <Box className="dash-box">
              <Box sx={{ boxshadow: 3 }} className="dash-lead-box">
                <Circular
                  value={totalCampPer}
                  barColor={"#3575FF"}
                  barName={"TOTAL"}
                  innerColor={"#EFECFF"}
                />
                <div style={{ marginLeft: "10px" }}>
                  <h3 className="dash-card-head">{totalCamp}</h3>
                  <p className="dash-card-subhead">Total Campaigns</p>
                </div>
              </Box>
              <Box sx={{ boxshadow: 3 }} className="dash-lead-box">
                <Circular
                  value={activeCampPer}
                  barColor={"#20C997"}
                  barName={"ACTIVE"}
                  innerColor={"#EFECFF"}
                />
                <div style={{ marginLeft: "10px" }}>
                  <h3 className="dash-card-head">{activeCamp}</h3>
                  <p className="dash-card-subhead">Active Campaigns</p>
                </div>
              </Box>
              <Box sx={{ boxshadow: 3 }} className="dash-lead-box">
                <Circular
                  value={leadsExtractedPer}
                  barColor={"#F36643"}
                  barName={"LEADS"}
                  innerColor={"#FFF3F0"}
                />
                <div style={{ marginLeft: "10px" }}>
                  <h3 className="dash-card-head">{leadsExtracted}</h3>
                  <p className="dash-card-subhead">Leads Extracted</p>
                </div>
              </Box>

              <Box sx={{ boxshadow: 3 }} className="dash-lead-box">
                <CircularChart
                  Todays={todaysLeadsPer}
                  Yesterdays={yesterdaysLeadsPer}
                  Weeklys={weeklyLeadsPer}
                />

                <div
                  style={{
                    marginLeft: "10px",
                    display: "flex",
                    paddingBottom: "16px",
                    paddingTop: "9px",
                  }}
                >
                  <div
                    className="dash-card-subhead-wrapper"
                    style={{ marginRight: "45px" }}
                  >
                    <h3 className="dash-card-head">{todaysLeads}</h3>

                    <span
                      className="dash-card-bullet"
                      style={{
                        backgroundColor: "#20C997",
                      }}
                    ></span>
                    <span className="dash-card-subhead">Today</span>
                  </div>
                  <div
                    className="dash-card-subhead-wrapper"
                    style={{ marginRight: "45px" }}
                  >
                    <h3 className="dash-card-head">{yesterdaysLeads}</h3>
                    <span
                      className="dash-card-bullet"
                      style={{
                        backgroundColor: "#FF7049",
                      }}
                    ></span>

                    <span className="dash-card-subhead">Yesterday</span>
                  </div>
                  <div className="dash-card-subhead-wrapper">
                    <h3 className="dash-card-head">{weeklyLeads}</h3>
                    <span
                      className="dash-card-bullet"
                      style={{
                        backgroundColor: "#563BFF",
                      }}
                    ></span>

                    <span className="dash-card-subhead">Weekly</span>
                  </div>
                </div>
              </Box>
            </Box>
            <Box
              sx={{ boxshadow: 3, backgroundColor: "#FFFFFF" }}
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
    </>
  );
};

export default Dashboard;
