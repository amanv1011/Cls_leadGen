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
import * as campaignCountActions from "../../../../redux/actions/campaignCountActions";
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
  campaignDocument,
  searchedCampaignList,
  campgaignId,
  leadsList,
  countryList,
  allUsers,
  selectedUsers,
  onChangeOption,
  lastCrawledDateList,
  selectedArray,
  campaignsListData,
  setcampaignsListData,
  countryFilterValue,
  ownerFilterValue,
  campaignStateFilterValue,
  assignedCampaigns,
  campaignsList,
  options,
  campaignSateStatus,
}) => {
  const dispatch = useDispatch();

  const [addCampaignDetails, setAddCampaignDetails] = useState({
    name: "",
    source: "",
    frequency: "",
    location: "",
    start_date: "",
    start_time: "",
    end_date: "",
    end_time: "",
    queryURL: "",
    status: 1,
    campaignSeen: false,
    campaignCreatedAt: "",
    country: "",
    owner: "",
    last_crawled_date: "",
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

  const statusUpdate = (event, a__campgaignId) => {
    try {
      if (event.target.checked) {
        dispatch(campaignActions.updateCampaignStatusAction(a__campgaignId, 1));
      } else {
        dispatch(campaignActions.updateCampaignStatusAction(a__campgaignId, 0));
      }
    } catch (error) {
      dispatch(openAlertAction(`${error.message}`, true, "error"));
    }
  };

  let sourceType = "";

  if (campaignDocument && campaignDocument.source === "seek_aus") {
    sourceType = "Seek Australia";
  } else if (campaignDocument && campaignDocument.source === "indeed_aus") {
    sourceType = "Indeed Australia";
  } else if (campaignDocument && campaignDocument.source === "indeed_ca") {
    sourceType = "Indeed Canada";
  } else if (campaignDocument && campaignDocument.source === "indeed_uk") {
    sourceType = "Indeed United";
  } else if (campaignDocument && campaignDocument.source === "indeed_il") {
    sourceType = "Indeed Italy";
  } else if (campaignDocument && campaignDocument.source === "indeed_ae") {
    sourceType = "Indeed UAE";
  } else if (campaignDocument && campaignDocument.source === "indeed_fi") {
    sourceType = "Indeed Finland";
  } else if (campaignDocument && campaignDocument.source === "indeed_ch") {
    sourceType = "Indeed China";
  } else if (campaignDocument && campaignDocument.source === "indeed_pt") {
    sourceType = "Indeed Portugal";
  } else if (campaignDocument && campaignDocument.source === "indeed_sg") {
    sourceType = "Indeed Singapore";
  } else {
    sourceType = "LinkedIn";
  }

  useEffect(() => {
    if (campgaignId !== undefined && campgaignId !== "") {
      setAddCampaignDetails({
        name: campaignDocument.name,
        source: campaignDocument.source,
        frequency: parseInt(campaignDocument.frequency),
        start_date: moment
          .unix(campaignDocument.start_date.seconds)
          .format("YYYY-MM-DD"),
        start_time: campaignDocument.start_time,
        end_date: moment
          .unix(campaignDocument.end_date.seconds)
          .format("YYYY-MM-DD"),
        end_time: campaignDocument.end_time,
        location: campaignDocument.location,
        country: campaignDocument.country,
        status: parseInt(campaignDocument.status),
        queryURL:
          campaignDocument.queryURL !== "" ? campaignDocument.queryURL : "NA",
        owner: campaignDocument.owner,
      });
      setTags([...campaignDocument.tags]);
      setOnGoing(campaignDocument.onGoing);
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
  const endLessDate = moment().add(5, "Y").format("YYYY-MM-DD");

  if (difference === 0) {
    minStartTime = currentTime;
    maxStartTime = "24:00";
  } else {
    minStartTime = "00:00";
    maxStartTime = "24:00";
  }

  const campaignUpdateForm = async (event) => {
    event.preventDefault();
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
      campaignSeen: true,
      campaignCreatedAt: campaignDocument.campaignCreatedAt,
      end_date: onGoing
        ? Timestamp.fromDate(new Date(endLessDate))
        : Timestamp.fromDate(new Date(end_date)),
      start_date: Timestamp.fromDate(new Date(start_date)),
      end_time: onGoing ? "23:59" : end_time,
    };

    await dispatch(
      campaignActions.updateCampaignsAction(campgaignId, updateDetails)
    );
    await dispatch(campaignActions.campaignIDAction(""));
  };

  // getting last crawled date
  // const getLastCrawledDate = (campaignId) => {
  //   const lastCrawledDate = lastCrawledDateList.filter(
  //     (lastCrawledDateCampaignId) => {
  //       return lastCrawledDateCampaignId.campaign_id === campaignId;
  //     }
  //   );
  // return descNow.length !== 0 ? descNow.map((wow) => wow.descData) : "";
  // };

  if (
    searchedCampaignList.length === 0 ||
    campaignsListData.length === 0 ||
    Object.keys(campaignDocument).length === 0
  ) {
    return <></>;
  } else {
    return (
      <React.Fragment>
        {campaignDocument?.name && (
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
                              fontSize: "13px",
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
                        campaignDocument && campaignDocument.name
                      )}
                    </Box>
                  </Box>
                  <Box component={"div"} className="right-section">
                    <Box component={"div"} className="subtitle">
                      <span
                      // style={{ marginRight: "5px" }}
                      >
                        Tag:
                      </span>
                      {campgaignId ? (
                        <input
                          type="text"
                          className="addCampaign-inputs"
                          name="tags"
                          value={tags}
                          onChange={tagInputChange}
                          autoComplete="off"
                          required
                          style={{ marginLeft: "90px", width: "auto" }}
                        />
                      ) : (
                        <span style={{ marginLeft: "10px" }}>
                          {campaignDocument.tags &&
                            campaignDocument.tags.toString()}
                        </span>
                      )}
                    </Box>
                    <Box component={"div"} className="subtitle">
                      <span className="status-text">
                        {campaignDocument && campaignDocument.status
                          ? "Active"
                          : "In-Active"}
                      </span>
                      <GreenSwitch
                        className="toggleSwitch"
                        checked={
                          campaignDocument && campaignDocument.status
                            ? true
                            : false
                        }
                        onClick={(event) =>
                          statusUpdate(event, campaignDocument.id)
                        }
                      />
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
                              <option value="indeed_aus">
                                Indeed Australia
                              </option>
                              <option value="indeed_ca">Indeed Canada</option>
                              <option value="indeed_uk">
                                Indeed United Kingdom
                              </option>
                              <option value="indeed_il">Indeed Italy</option>
                              <option value="indeed_ae">Indeed UAE</option>
                              <option value="indeed_fi">Indeed Finland</option>
                              <option value="indeed_ch">Indeed China</option>
                              <option value="indeed_pt">Indeed Portugal</option>
                              <option value="indeed_sg">
                                Indeed Singapore
                              </option>
                              <option value="linkedin">LinkedIn</option>
                            </select>
                          ) : (
                            campaignDocument && sourceType
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
                              min={todaysDate}
                              pattern="(?:((?:0[1-9]|1[0-9]|2[0-9])\/(?:0[1-9]|1[0-2])|(?:30)\/(?!02)(?:0[1-9]|1[0-2])|31\/(?:0[13578]|1[02]))\/(?:19|20)[0-9]{2})"
                            />
                          ) : (
                            campaignDocument?.start_date &&
                            moment
                              .unix(
                                campaignDocument.start_date.seconds,
                                campaignDocument.start_date.nanoseconds
                              )
                              .format("MM/DD/YYYY")
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
                              disabled={start_date ? false : true}
                              style={
                                start_date
                                  ? {}
                                  : {
                                      pointerEvents: "auto",
                                      cursor: "not-allowed",
                                    }
                              }
                              onChange={onInputChangeHandler}
                              autoComplete="off"
                              min={minStartTime}
                              max={maxStartTime}
                              required
                            />
                          ) : (
                            campaignDocument &&
                            moment(campaignDocument.start_time, [
                              "HH:mm",
                            ]).format("hh:mm A")
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
                              required
                            />
                          ) : (
                            campaignDocument && campaignDocument.location
                          )}
                        </span>
                      </div>
                      <div className="header-item">
                        <span className="header-key">Created By</span>
                        <span className="header-value">
                          {campgaignId ? (
                            <input
                              type="text"
                              className="addCampaign-inputs"
                              name="location"
                              value={
                                campaignDocument && campaignDocument.owner
                                  ? campaignDocument && campaignDocument.owner
                                  : "NA"
                              }
                              autoComplete="off"
                              disabled
                            />
                          ) : campaignDocument && campaignDocument.owner ? (
                            campaignDocument && campaignDocument.owner
                          ) : (
                            "NA"
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
                              name="frequency"
                              value={frequency}
                              onChange={onInputChangeHandler}
                              autoComplete="off"
                              required
                              min={1}
                              max={15}
                            />
                          ) : (
                            campaignDocument && campaignDocument.frequency
                          )}
                        </span>
                      </div>

                      <div className="header-item">
                        <span className="header-key">End Date</span>
                        <span className="header-value">
                          {campgaignId ? (
                            <>
                              <input
                                type="date"
                                className="addCampaign-datePicker"
                                name="end_date"
                                value={
                                  onGoing
                                    ? Timestamp.fromDate(new Date(endLessDate))
                                    : end_date
                                }
                                onChange={onInputChangeHandler}
                                autoComplete="off"
                                disabled={onGoing ? true : false}
                                required={onGoing ? false : true}
                                min={start_date}
                              />

                              <div
                                style={{
                                  marginLeft: "5px",
                                  marginTop: "5px",
                                }}
                              >
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
                              </div>
                            </>
                          ) : (
                            <React.Fragment>
                              {campaignDocument &&
                              campaignDocument.onGoing === true ? (
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
                                  }}
                                >
                                  On going
                                </label>
                              ) : (
                                campaignDocument?.end_date &&
                                moment
                                  .unix(
                                    campaignDocument.end_date.seconds,
                                    campaignDocument.end_date.nanoseconds
                                  )
                                  .format("MM/DD/YYYY")
                              )}
                            </React.Fragment>
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
                              value={onGoing ? "23:59" : end_time}
                              onChange={onInputChangeHandler}
                              min={
                                onGoing
                                  ? ""
                                  : difference_startDate_endDate
                                  ? ""
                                  : minTimeDiff
                              }
                              autoComplete="off"
                              disabled={onGoing ? true : false}
                              required={onGoing ? false : true}
                            />
                          ) : campaignDocument.onGoing &&
                            campaignDocument.end_time ? (
                            "NA"
                          ) : (
                            moment(campaignDocument.end_time, ["HH:mm"]).format(
                              "hh:mm A"
                            )
                          )}
                        </span>
                      </div>
                      <div className="header-item">
                        <span className="header-key">Country</span>
                        <span className="header-value">
                          {campgaignId && campaignDocument.country ? (
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
                          ) : campaignDocument && campaignDocument.country ? (
                            campaignDocument.country
                          ) : (
                            "NA"
                          )}
                        </span>
                      </div>

                      <div className="header-item">
                        <span className="header-key">Last Crawled Date</span>
                        <span
                          className="header-value"
                          style={{ marginLeft: "40px" }}
                        >
                          {campgaignId ? (
                            <input
                              type="text"
                              className="addCampaign-inputs"
                              name="lastCrawledDate"
                              value={
                                lastCrawledDateList?.campaignDocument &&
                                campaignDocument?.last_crawled_date
                                  ? moment
                                      .unix(
                                        campaignDocument.last_crawled_date
                                          .seconds,
                                        campaignDocument.last_crawled_date
                                          .nanoseconds
                                      )
                                      .format("MM/DD/YYYY")
                                  : "NA"
                              }
                              autoComplete="off"
                              disabled
                            />
                          ) : campaignDocument?.last_crawled_date ? (
                            moment
                              .unix(
                                campaignDocument.last_crawled_date.seconds,
                                campaignDocument.last_crawled_date.nanoseconds
                              )
                              .format("MM/DD/YYYY")
                          ) : (
                            "NA"
                          )}
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
                            type="text"
                            className="addCampaign-inputs"
                            placeholder="Paste your query here"
                            name="queryURL"
                            value={queryURL}
                            onChange={onInputChangeHandler}
                            autoComplete="off"
                            style={{ width: "100%" }}
                          />
                        ) : campaignDocument &&
                          campaignDocument?.queryURL !== "" ? (
                          campaignDocument.queryURL
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
                      width: "120px",
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
                    selectedUsers={selectedUsers}
                    selectedArray={selectedArray}
                    width={145}
                  />
                </Box>
                <Box component={"div"} className="action-buttons">
                  <CampaignButtonActions
                    campaignDocument={campaignDocument}
                    campgaignId={campgaignId}
                    leadsList={leadsList}
                    selectedArray={selectedArray}
                    campaignsListData={campaignsListData}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </React.Fragment>
    );
  }
};

export default CampaignDescription;
