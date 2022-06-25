import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Divider, Box, Switch } from "@mui/material";
import moment from "moment";
import { alpha, styled } from "@mui/material/styles";
import { green, red } from "@mui/material/colors";
import * as campaignActions from "../../../../redux/actions/campaignActions";
import { get_a_feild_in_a_document } from "../../../../services/api/campaign";
import { openAlertAction } from "../../../../redux/actions/alertActions";
import CampaignButtonActions from "../CampaignButtonActions";
import { Timestamp } from "firebase/firestore";
import AssignCampaign from "../AssignCampaign";
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

const CampaignDescription = ({
  campaignDoc,
  campgaignId,
  leadsList,
  allUsers,
  countryList,
}) => {
  const dispatch = useDispatch();
  const [campaignDocValue, setCampaignDocValue] = useState(campaignDoc);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    setCampaignDocValue(campaignDoc);
  }, [campaignDoc]);

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
    queryURL: "",
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
    country,
    queryURL,
  } = addCampaignDetails;

  const [tags, setTags] = useState([]);
  const [onGoing, setOnGoing] = useState(false);

  const onInputChangeHandler = (event) => {
    const { name, value } = event.target;
    setAddCampaignDetails({ ...addCampaignDetails, [name]: value });
  };

  const tagInputChange = (event) => {
    const newarrayValue = event.target.value;
    setTags(newarrayValue.split(","));
  };

  const onOngoing = (event) => {
    setOnGoing(event.target.checked);
  };
  const statusUpdate = async (event, a__campgaignId) => {
    try {
      if (event.target.checked) {
        await get_a_feild_in_a_document(a__campgaignId, { status: 1 });
      } else {
        await get_a_feild_in_a_document(a__campgaignId, { status: 0 });
      }
      await dispatch(campaignActions.getACampaignAction(a__campgaignId));
    } catch (error) {
      dispatch(openAlertAction(`${error.message}`, true, "error"));
    }
  };

  //assigning campaign to a user
  const onChangeOption = (e, option) => {
    setSelectedUsers(option);
  };

  const assignUsers = () => {
    if (campaignDocValue.id.length > 0 && selectedUsers.length > 0) {
      let arr = [];
      selectedUsers &&
        selectedUsers.forEach((e) => {
          arr.push(e.userId);
        });
      dispatch(
        campaignActions.assignCampaignToUsersAction([campaignDocValue.id], arr)
      );
      setSelectedUsers([]);
    }
  };

  let sourceType = "";

  if (campaignDocValue && campaignDocValue.source === "seek_aus") {
    sourceType = "Seek Australia";
  } else if (campaignDocValue && campaignDocValue.source === "indeed_aus") {
    sourceType = "Indeed Australia";
  } else if (campaignDocValue && campaignDocValue.source === "indeed_ca") {
    sourceType = "Indeed Canada";
  } else if (campaignDocValue && campaignDocValue.source === "indeed_uk") {
    sourceType = "Indeed United";
  } else if (campaignDocValue && campaignDocValue.source === "indeed_il") {
    sourceType = "Indeed Italy";
  } else if (campaignDocValue && campaignDocValue.source === "indeed_ae") {
    sourceType = "Indeed UAE";
  } else if (campaignDocValue && campaignDocValue.source === "indeed_fi") {
    sourceType = "Indeed Finland";
  } else if (campaignDocValue && campaignDocValue.source === "indeed_ch") {
    sourceType = "Indeed China";
  } else if (campaignDocValue && campaignDocValue.source === "indeed_pt") {
    sourceType = "Indeed Portugal";
  } else if (campaignDocValue && campaignDocValue.source === "indeed_sg") {
    sourceType = "Indeed Singapore";
  } else {
    sourceType = "LinkedIn";
  }

  useEffect(() => {
    if (campgaignId !== undefined && campgaignId !== "") {
      setAddCampaignDetails({
        name: campaignDocValue.name,
        source: campaignDocValue.source,
        frequency: parseInt(campaignDocValue.frequency),
        start_date: moment
          .unix(campaignDocValue.start_date.seconds)
          .format("YYYY-MM-DD"),
        start_time: campaignDocValue.start_time,
        end_date: moment
          .unix(campaignDocValue.end_date.seconds)
          .format("YYYY-MM-DD"),
        end_time: campaignDocValue.end_time,
        location: campaignDocValue.location,
        country: campaignDocValue.country,
        status: parseInt(campaignDocValue.status),
        queryURL:
          campaignDocValue.queryURL !== "" ? campaignDocValue.queryURL : "NA",
      });
      setTags([...campaignDocValue.tags]);
      setOnGoing(campaignDocValue.onGoing);
    }
  }, [campgaignId]);

  // Campaign Update form action
  let minStartTime;
  let maxStartTime;
  let todaysDate = moment().format("YYYY-MM-DD");
  const difference = moment(start_date).diff(todaysDate, "days");
  const minTimeDiff = moment(start_time, "HH:mm").add(5, "m").format("HH:mm");
  const currentTime = moment().format("HH:mm");
  const difference_startDate_endDate = moment(end_date).diff(
    start_date,
    "days"
  );

  if (difference === 0) {
    minStartTime = currentTime;
    maxStartTime = "24:00";
  } else {
    minStartTime = "00:00";
    maxStartTime = "24:00";
  }

  const campaignUpdateForm = async (event) => {
    event.preventDefault();
    console.log("Hello");
    // try {
    if (source === "seek_aus") {
      if (tags.length > 1) {
        alert(
          "For SEEK only 1 tag is permitted. Tags are seperated by comma's"
        );
        return;
      }
    } else if (
      source === "indeed_aus" ||
      source === "indeed_ca" ||
      source === "indeed_uk" ||
      source === "indeed_il" ||
      source === "indeed_fi" ||
      source === "indeed_ch" ||
      source === "indeed_pt" ||
      source === "indeed_sg" ||
      source === "indeed_ae"
    ) {
      if (tags.length > 10) {
        alert(
          "For Indeed only 10 tags is permitted. Tags are seperated by comma's"
        );
        return;
      }
    } else if (source === "linkedin_aus") {
      if (tags.length > 1) {
        alert(
          "For LinkedIn only 1 tag is permitted. Tags are seperated by comma's"
        );
        return;
      }
    }
    const updateDetails = {
      ...addCampaignDetails,
      frequency: parseInt(frequency),
      tags,
      onGoing,
      end_date: Timestamp.fromDate(new Date(end_date)),
      start_date: Timestamp.fromDate(new Date(start_date)),
      last_crawled_date: Timestamp.fromDate(new Date(start_date)),
      owner: "Mithun Dominic",
    };

    await dispatch(
      campaignActions.updateCampaignsAction(campgaignId, updateDetails)
    );
    dispatch(campaignActions.campaignIDAction(""));
  };

  return (
    <React.Fragment>
      <Box
        component={"div"}
        className={
          campgaignId
            ? "campaign-description-container-edit"
            : "campaign-description-container"
        }
      >
        <Box component={"div"} className="campaign-description-container1">
          <form id="campaignUpdate-form" onSubmit={campaignUpdateForm}>
            <Box component={"div"} className="campaign-description-header">
              <Box component={"div"} className="left-section">
                <Box component={"div"} className="title">
                  {campgaignId ? (
                    <React.Fragment>
                      <span
                        style={{
                          fontStyle: "normal",
                          fontWeight: "600",
                          fontSize: "14px",
                          lineHeight: "17px",
                          color: "#1f4173",
                          opacity: "0.6",
                        }}
                      >
                        Campaign Name
                      </span>
                      <input
                        type="text"
                        id="campaign-name"
                        className="addCampaign-inputs"
                        name="name"
                        value={name}
                        onChange={onInputChangeHandler}
                        autoComplete="off"
                        required
                        style={{ marginLeft: "10px", width: "auto" }}
                      />
                    </React.Fragment>
                  ) : (
                    campaignDocValue && campaignDocValue.name
                  )}
                </Box>
              </Box>
              <Box component={"div"} className="right-section">
                <Box component={"div"} className="subtitle">
                  <span style={{ marginRight: "5px" }}>Tag:</span>
                  {campgaignId ? (
                    <input
                      type="text"
                      className="addCampaign-inputs"
                      name="tags"
                      value={tags}
                      onChange={tagInputChange}
                      autoComplete="off"
                      required
                      style={{ marginLeft: "92px", width: "auto" }}
                    />
                  ) : (
                    campaignDocValue.tags && campaignDocValue.tags.toString()
                  )}
                </Box>

                <Box component={"div"} className="subtitle">
                  <span className="status-text">
                    {campaignDocValue && campaignDocValue.status
                      ? "Active"
                      : "In-Active"}
                  </span>
                  <GreenSwitch
                    className="toggleSwitch"
                    checked={
                      campaignDocValue && campaignDocValue.status ? true : false
                    }
                    onClick={(event) =>
                      statusUpdate(event, campaignDocValue.id)
                    }
                  />
                </Box>
                <Box component={"div"} className="addCampaign-checkbox">
                  {campgaignId ? (
                    <React.Fragment>
                      <input
                        type="checkbox"
                        name="onGoing"
                        value={onGoing}
                        checked={onGoing}
                        onChange={onOngoing}
                      />
                      <label
                        className="addCampaign-labels"
                        style={{ marginLeft: "7px" }}
                      >
                        On going
                      </label>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <input
                        type="checkbox"
                        name="onGoing"
                        checked={
                          campaignDocValue && campaignDocValue.onGoing
                            ? true
                            : false
                        }
                        disabled={true}
                        readOnly
                      />

                      <label
                        className="addCampaign-labels"
                        style={{
                          width: "52px",
                          height: "16px",
                          fontStyle: "normal",
                          fontWeight: "600",
                          fontSize: "13px",
                          lineHeight: "16px",
                          color: "#1F4173",
                          opacity: "0.3",
                          marginLeft: "7px",
                        }}
                      >
                        On going
                      </label>
                    </React.Fragment>
                  )}
                </Box>
              </Box>
            </Box>
            <Divider
              variant="middle"
              light={true}
              sx={{
                height: "1px",
                background: "#1F4173",
                opacity: "0.15",
              }}
            />
            <Box
              component={"div"}
              className={
                campgaignId
                  ? "campaign-description-container1_2-edit"
                  : "campaign-description-container1_2"
              }
            >
              <Box
                component={"div"}
                className={
                  campgaignId
                    ? "campaign-description-body1-edit"
                    : "campaign-description-body1"
                }
              >
                <Box
                  className={
                    campgaignId
                      ? "campaign-description-left-sec-edit"
                      : "campaign-description-left-sec"
                  }
                >
                  <div className="header-item">
                    <span className="header-key">Source Type</span>
                    <span className="header-value">
                      {campgaignId ? (
                        <select
                          className="addCampaign-selects"
                          name="source"
                          value={source}
                          onChange={onInputChangeHandler}
                          autoComplete="off"
                          // style={{ width: "max-content" }}
                          required
                        >
                          <option value="" disabled defaultValue>
                            Select the source
                          </option>
                          <option value="seek_aus">Seek Australia</option>
                          <option value="indeed_aus">Indeed Australia</option>
                          <option value="indeed_ca">Indeed Canada</option>
                          <option value="indeed_uk">
                            Indeed United Kingdom
                          </option>
                          <option value="indeed_il">Indeed Italy</option>
                          <option value="indeed_ae">Indeed UAE</option>
                          <option value="indeed_fi">Indeed Finland</option>
                          <option value="indeed_ch">Indeed China</option>
                          <option value="indeed_pt">Indeed Portugal</option>
                          <option value="indeed_sg">Indeed Singapore</option>
                          <option value="linkedin">LinkedIn</option>
                        </select>
                      ) : (
                        campaignDocValue && sourceType
                      )}
                    </span>
                  </div>
                  <div className="header-item">
                    <span className="header-key">Start Date</span>
                    <span className="header-value">
                      {campgaignId ? (
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
                      ) : (
                        campaignDocValue?.start_date &&
                        moment
                          .unix(
                            campaignDocValue.start_date.seconds,
                            campaignDocValue.start_date.nanoseconds
                          )
                          .format("MM/DD/YYYY")
                      )}
                    </span>
                  </div>
                  <div className="header-item">
                    <span className="header-key">End Date</span>
                    <span className="header-value">
                      {campgaignId ? (
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
                      ) : (
                        <React.Fragment>
                          {campaignDocValue?.end_date &&
                            moment
                              .unix(
                                campaignDocValue.end_date.seconds,
                                campaignDocValue.end_date.nanoseconds
                              )
                              .format("MM/DD/YYYY")}
                        </React.Fragment>
                      )}
                    </span>
                  </div>
                  <div className="header-item">
                    <span className="header-key">Country</span>
                    <span className="header-value">
                      {campgaignId && campaignDocValue.country ? (
                        <select
                          className="addCampaign-selects"
                          name="country"
                          value={country}
                          onChange={onInputChangeHandler}
                          autoComplete="off"
                          required
                        >
                          <option value="" disabled defaultValue>
                            Select the Country
                          </option>
                          {countryList.map((country) => (
                            <option
                              key={country.id}
                              value={country.country_name}
                            >
                              {country.country_name}
                            </option>
                          ))}
                        </select>
                      ) : campaignDocValue && campaignDocValue.country ? (
                        campaignDocValue.country
                      ) : (
                        "NA"
                      )}
                    </span>
                  </div>

                  <div className="header-item">
                    <span className="header-key">Location</span>
                    <span className="header-value">
                      {campgaignId ? (
                        <input
                          type="text"
                          className="addCampaign-inputs"
                          name="location"
                          value={location}
                          onChange={onInputChangeHandler}
                          autoComplete="off"
                          // style={{ width: "max-content" }}
                          required
                        />
                      ) : (
                        campaignDocValue && campaignDocValue.location
                      )}
                    </span>
                  </div>
                </Box>
                <Box
                  className={
                    campgaignId
                      ? "campaign-description-rigth-sec-edit"
                      : "campaign-description-rigth-sec"
                  }
                >
                  <div className="header-item">
                    <span className="header-key">Frequency</span>
                    <span className="header-value">
                      {campgaignId ? (
                        <input
                          type="number"
                          className="addCampaign-inputs"
                          style={{ width: "120px" }}
                          name="frequency"
                          value={frequency}
                          onChange={onInputChangeHandler}
                          autoComplete="off"
                          required
                          min={1}
                          max={15}
                        />
                      ) : (
                        campaignDocValue && campaignDocValue.frequency
                      )}
                    </span>
                  </div>
                  <div className="header-item">
                    <span className="header-key">Parsing Start Time</span>
                    <span className="header-value">
                      {campgaignId ? (
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
                      ) : (
                        campaignDocValue && campaignDocValue.start_time
                      )}
                    </span>
                  </div>
                  <div className="header-item">
                    <span className="header-key">Parsing End Time</span>
                    <span className="header-value">
                      {campgaignId ? (
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
                      ) : (
                        campaignDocValue && campaignDocValue.end_time
                      )}
                    </span>
                  </div>
                  <div className="header-item">
                    <span className="header-key">Created By</span>
                    <span
                      className="header-value"
                      style={{ marginLeft: "40px" }}
                    >
                      {campaignDocValue && campaignDocValue.owner}
                    </span>
                  </div>
                  <div className="header-item">
                    <span className="header-key">Last Crawled Date</span>
                    <span
                      className="header-value"
                      style={{ marginLeft: "40px" }}
                    >
                      {campaignDocValue && campaignDocValue?.last_crawled_date
                        ? moment
                            .unix(
                              campaignDocValue.last_crawled_date.seconds,
                              campaignDocValue.last_crawled_date.nanoseconds
                            )
                            .format("MM/DD/YYYY")
                        : "NA"}
                    </span>
                  </div>
                </Box>
              </Box>
              <Box
                component={"div"}
                className={
                  campgaignId
                    ? "campaign-description-body2-edit"
                    : "campaign-description-body2"
                }
              >
                <div className="header-item">
                  <span className="header-key">Query URL</span>
                  <span className="header-value">
                    {campgaignId ? (
                      <input
                        type="url"
                        className="addCampaign-inputs"
                        placeholder="Paste your URL here"
                        name="queryURL"
                        value={queryURL}
                        onChange={onInputChangeHandler}
                        autoComplete="off"
                        required
                        style={{ width: "100%" }}
                      />
                    ) : campaignDocValue && campaignDocValue?.queryURL ? (
                      campaignDocValue.queryURL
                    ) : (
                      "NA"
                    )}
                  </span>
                </div>
              </Box>
            </Box>
          </form>
        </Box>
        <Box component={"div"} className="campaign-description-container2">
          <Box component={"div"} className="section campaign-actions">
            <Box className="autocomplete-container">
              <Box
                className="autocomplete-title"
                style={{
                  width: "75px",
                  height: "17px",
                  fontStyle: "normal",
                  fontWeight: "600",
                  fontSize: "14px",
                  lineHeight: "17px",
                  color: "rgba(31, 65, 115, 0.7)",
                  marginBottom: "12px",
                }}
              >
                Assign To
              </Box>
              <AssignCampaign
                options={allUsers}
                onChangeOption={onChangeOption}
                assignUsers={assignUsers}
                selectedUsers={selectedUsers}
              />
            </Box>
            <Box component={"div"} className="action-buttons">
              <CampaignButtonActions
                campaignDoc={campaignDoc}
                campgaignId={campgaignId}
                leadsList={leadsList}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default CampaignDescription;
