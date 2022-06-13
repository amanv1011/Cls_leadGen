import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Divider, Box, Switch } from "@mui/material";
import moment from "moment";
import { alpha, styled } from "@mui/material/styles";
import { green, red } from "@mui/material/colors";
import * as campaignActions from "../../../../redux/actions/campaignActions";
import { get_a_feild_in_a_document } from "../../../../services/api/campaign";
import { openAlertAction } from "../../../../redux/actions/alertActions";
import { Timestamp } from "firebase/firestore";
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

const CampaignDescription = ({ campaignDoc, campgaignId }) => {
  const dispatch = useDispatch();

  const [addCampaignDetails, setAddCampaignDetails] = useState({
    name: "",
    source: "",
    frequency: "",
    location: "",
    start_date: "",
    start_time: "",
    last_crawled_date: "",
    end_date: "",
    end_time: "",
    pages: "",
    status: 1,
  });

  const {
    name,
    source,
    frequency,
    location,
    start_date,
    start_time,
    end_date,
    end_time,
    pages,
  } = addCampaignDetails;

  const [tags, setTags] = useState([]);

  const onInputChangeHandler = (event) => {
    const { name, value } = event.target;
    setAddCampaignDetails({ ...addCampaignDetails, [name]: value });
  };

  const tagInputChange = (event) => {
    const newarrayValue = event.target.value;
    setTags(newarrayValue.split(","));
  };

  const statusUpdate = async (event, a__campgaignId) => {
    try {
      if (event.target.checked) {
        await get_a_feild_in_a_document(a__campgaignId, { status: 1 });
      } else {
        await get_a_feild_in_a_document(a__campgaignId, { status: 0 });
      }
      dispatch(campaignActions.getAllCampaignsAction());
    } catch (error) {
      dispatch(openAlertAction(`${error.message}`, true, "error"));
    }
  };

  // console.log("campaignDoc", campaignDoc);
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

  useEffect(() => {
    if (campgaignId) {
      setAddCampaignDetails({
        name: campaignDoc.name,
        source: campaignDoc.source,
        frequency: parseInt(campaignDoc.frequency),
        start_date: moment
          .unix(campaignDoc.start_date.seconds)
          .format("YYYY-MM-DD"),
        start_time: campaignDoc.start_time,
        end_date: moment
          .unix(campaignDoc.end_date.seconds)
          .format("YYYY-MM-DD"),
        end_time: campaignDoc.end_time,
        location: campaignDoc.location,
        pages: parseInt(campaignDoc.pages),
        status: parseInt(campaignDoc.status),
      });
      setTags([...campaignDoc.tags]);
    }

    const updatedCampaignDetails = {
      ...addCampaignDetails,
      frequency: parseInt(frequency),
      tags,
      pages: parseInt(pages),
      end_date: Timestamp.fromDate(new Date(end_date)),
      start_date: Timestamp.fromDate(new Date(start_date)),
      last_crawled_date: Timestamp.fromDate(new Date(start_date)),
      owner: "Mithun Dominic",
    };

    // if (updatedCampaignDetails.frequency  isNaN()) {
    dispatch(
      campaignActions.gettingCampaignDetailsToUpdateAction(
        updatedCampaignDetails
      )
    );
    // }
  }, [campgaignId]);

  if (campgaignId) {
    return (
      <form>
        <Box component={"div"} className="campaign-description-container">
          <Box component={"div"} className="campaign-description-header">
            <Box component={"div"} className="left-section">
              <Box component={"div"} className="title">
                <input
                  type="text"
                  id="campaign-name"
                  className="addCampaign-inputs"
                  name="name"
                  value={name}
                  onChange={onInputChangeHandler}
                  autoComplete="off"
                  required
                />
              </Box>
              <Box component={"div"} className="subtitle">
                Tag:
                <input
                  type="text"
                  className="addCampaign-inputs"
                  name="tags"
                  value={tags}
                  onChange={tagInputChange}
                  autoComplete="off"
                  required
                />
              </Box>
            </Box>
            <Box component={"div"} className="right-section">
              <span className="status-text">
                {campaignDoc && campaignDoc.status ? "Active" : "In-Active"}
              </span>
              <GreenSwitch
                className="toggleSwitch"
                checked={campaignDoc && campaignDoc.status ? true : false}
                onClick={(event) => statusUpdate(event, campaignDoc.id)}
              />
            </Box>
          </Box>
          <Divider
            variant="middle"
            light={true}
            sx={{ height: "1px", background: "#1F4173", opacity: "0.15" }}
          />

          <Box className="campaign-description-body">
            <Box className="campaign-description-left-sec">
              <div className="header-item">
                <span className="header-key">Source Type</span>
                <span className="header-value">
                  <select
                    className="addCampaign-selects"
                    name="source"
                    value={source}
                    onChange={onInputChangeHandler}
                    autoComplete="off"
                    required
                  >
                    <option value="" disabled defaultValue>
                      Select the source
                    </option>
                    <option value="seek_aus">Seek Australia</option>
                    <option value="indeed_aus">Indeed Australia</option>
                    <option value="indeed_ca">Indeed Canada</option>
                    <option value="indeed_uk">Indeed United Kingdom</option>
                    <option value="indeed_il">Indeed Italy</option>
                    <option value="indeed_ae">Indeed UAE</option>
                    <option value="indeed_fi">Indeed Finland</option>
                    <option value="indeed_ch">Indeed China</option>
                    <option value="indeed_pt">Indeed Portugal</option>
                    <option value="indeed_sg">Indeed Singapore</option>
                    <option value="linkedin">LinkedIn</option>
                  </select>
                </span>
              </div>
              <div className="header-item">
                <span className="header-key">Start Date</span>
                <span className="header-value">
                  <input
                    type="date"
                    className="addCampaign-datePicker"
                    name="start_date"
                    value={start_date}
                    onChange={onInputChangeHandler}
                    autoComplete="off"
                    required
                    // min={todaysDate}
                    pattern="(?:((?:0[1-9]|1[0-9]|2[0-9])\/(?:0[1-9]|1[0-2])|(?:30)\/(?!02)(?:0[1-9]|1[0-2])|31\/(?:0[13578]|1[02]))\/(?:19|20)[0-9]{2})"
                  />
                </span>
              </div>
              <div className="header-item">
                <span className="header-key">End Date</span>
                <span className="header-value">
                  <input
                    type="date"
                    className="addCampaign-datePicker"
                    name="end_date"
                    value={end_date}
                    onChange={onInputChangeHandler}
                    autoComplete="off"
                    required
                    // min={start_date}
                  />
                </span>
              </div>
              <div className="header-item">
                <span className="header-key">Frequency</span>
                <span className="header-value">
                  <input
                    type="number"
                    className="addCampaign-inputs"
                    name="frequency"
                    value={frequency}
                    onChange={onInputChangeHandler}
                    autoComplete="off"
                    required
                    min={1}
                    max={15}
                  />
                </span>
              </div>
              <div className="header-item">
                <span className="header-key">Extract No. Of Page(s)</span>
                <span className="header-value">
                  <input
                    className="addCampaign-inputs"
                    type="number"
                    name="pages"
                    value={pages}
                    onChange={onInputChangeHandler}
                    autoComplete="off"
                    required
                    min={1}
                    max={100}
                  />
                </span>
              </div>
              <div className="header-item">
                <span className="header-key">Locaion</span>
                <span className="header-value">
                  <input
                    type="text"
                    className="addCampaign-inputs"
                    name="location"
                    value={location}
                    onChange={onInputChangeHandler}
                    autoComplete="off"
                    required
                  />
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
            </Box>
            <Box className="campaign-description-rigth-sec">
              <div className="header-item" style={{ marginBottom: "20px" }}>
                <span className="header-key">Start Time</span>
                <span className="header-value">
                  <input
                    type="time"
                    className="addCampaign-timePicker"
                    name="start_time"
                    value={start_time}
                    // disabled={start_date ? false : true}
                    // style={
                    //   start_date
                    //     ? {}
                    //     : {
                    //         pointerEvents: "auto",
                    //         cursor: "not-allowed",
                    //       }
                    // }
                    onChange={onInputChangeHandler}
                    autoComplete="off"
                    // min={minStartTime}
                    // max={maxStartTime}
                    required
                  />
                </span>
              </div>
              <div className="header-item">
                <span className="header-key">End Time</span>
                <span className="header-value">
                  <input
                    type="time"
                    className="addCampaign-timePicker"
                    name="end_time"
                    value={end_time}
                    onChange={onInputChangeHandler}
                    // min={minTimeDiff}
                    autoComplete="off"
                    required
                  />
                </span>
              </div>
            </Box>
          </Box>
        </Box>
      </form>
    );
  } else {
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
              onClick={(event) => statusUpdate(event, campaignDoc.id)}
            />
          </Box>
        </Box>
        <Divider
          variant="middle"
          light={true}
          sx={{ height: "1px", background: "#1F4173", opacity: "0.15" }}
        />

        <Box className="campaign-description-body">
          <Box className="campaign-description-left-sec">
            <div className="header-item">
              <span className="header-key">Source Type</span>
              <span className="header-value">{campaignDoc && sourceType}</span>
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
          </Box>
          <Box className="campaign-description-rigth-sec">
            <div className="header-item" style={{ marginBottom: "20px" }}>
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
    );
  }
};

export default CampaignDescription;
