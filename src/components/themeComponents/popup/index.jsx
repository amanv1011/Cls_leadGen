import React, { useEffect, useState } from "react";
import * as campaignActions from "../../../redux/actions/campaignActions";
import { useSelector, useDispatch } from "react-redux";
import { Box, Modal, Button, Divider, Grid } from "@mui/material";
import { Timestamp } from "firebase/firestore";
import "./popup.scss";
import PlusIcon from "./PlusIcon";
import moment from "moment";
import { openAlertAction } from "../../../redux/actions/alertActions";
import * as commonFunctions from "../../pageComponents/campaign/commonFunctions";

const style = {
  position: "absolute",
  display: "flex",
  flexWrap: "wrap",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "910px",
  bgcolor: "#FFFFFF",
  borderRadius: "15px",
  border: "none",
  outline: "none",
  paddingTop: "0px",
};

const AddCampaginModal = ({ countryList }) => {
  const dispatch = useDispatch();

  const isModalOpen = useSelector((state) => state.allCampaigns.isModalVisible);
  const a__campgaignId = useSelector(
    (state) => state.allCampaigns.a__campgaign__Id
  );
  const errorFromStore = useSelector((state) => state.allCampaigns.error);

  const [addCampaignDetails, setAddCampaignDetails] = useState({
    name: "",
    source: "",
    frequency: "",
    location: "",
    start_date: "",
    start_time: "",
    end_date: "",
    end_time: "",
    status: 1,
    country: "",
    queryURL: "",
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

  useEffect(() => {
    if (
      errorFromStore === null ||
      errorFromStore === undefined ||
      errorFromStore === ""
    ) {
      dispatch(campaignActions.handleClose());
    } else {
      dispatch(campaignActions.showModal());
    }
  }, [errorFromStore]);

  let minStartTime;
  let maxStartTime;
  let todaysDate = moment().format("YYYY-MM-DD");
  const difference = moment(start_date).diff(todaysDate, "days");
  const minTimeDiff = moment(start_time, "HH:mm").add(60, "m").format("HH:mm");
  const currentTime = moment().format("HH:mm");
  const difference_startDate_endDate = moment(end_date).diff(
    start_date,
    "days"
  );
  const endLessDate = moment(start_date).add(5, "Y").format("YYYY-MM-DD");
  if (difference === 0) {
    minStartTime = currentTime;
    maxStartTime = "24:00";
  } else {
    minStartTime = "00:00";
    maxStartTime = "24:00";
  }

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

  const onSubmitEventhandler = async (event) => {
    event.preventDefault();

    try {
      let alertMessage = "";
      if (
        name.trim().length === 0 ||
        tags.length === 0 ||
        location.trim().length === 0
      ) {
        if (name.trim().length === 0) {
          alertMessage = "Campaign name cannot be empty";
        }
        if (location.trim().length === 0) {
          alertMessage = "Location cannot be empty";
        }

        alert(alertMessage);
        return;
      }

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
        source === "indeed_ae" ||
        source === "indeed_se" ||
        source === "indeed_usa"
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

      const newCampaign = {
        ...addCampaignDetails,
        frequency: parseInt(frequency),
        name: name.trim(),
        location: location.trim(),
        queryURL: queryURL?.trim(),
        tags,
        onGoing,
        start_date: Timestamp.fromDate(new Date(start_date)),
        end_date: onGoing
          ? Timestamp.fromDate(new Date(endLessDate))
          : Timestamp.fromDate(new Date(end_date)),
        owner: localStorage.getItem("userName")
          ? localStorage.getItem("userName")
          : "NA",
        campaignCreatedAt: Timestamp.fromDate(new Date()),
        campaignSeen: false,
        end_time: onGoing ? "23:59" : end_time,
      };

      if (a__campgaignId === "") {
        await dispatch(campaignActions.postCampaignAction(newCampaign));
      }

      if (
        errorFromStore === null ||
        errorFromStore === undefined ||
        errorFromStore === ""
      ) {
        await dispatch(campaignActions.handleClose());
        setAddCampaignDetails({
          name: "",
          source: "",
          frequency: "",
          location: "",
          start_date: "",
          start_time: "",
          end_date: "",
          end_time: "",
          status: 1,
          country: "",
          queryURL: "",
        });
        setOnGoing(false);
        setTags([]);
      } else {
        dispatch(campaignActions.showModal());
      }
    } catch (error) {
      await dispatch(
        openAlertAction(
          `${error.message}. Please provide a valid input`,
          true,
          "error"
        )
      );
    }
  };

  return (
    <React.Fragment>
      <Button
        disabled={a__campgaignId ? true : false}
        style={
          a__campgaignId
            ? {
                pointerEvents: "auto",
                cursor: "not-allowed",
                width: "160px",
                height: "40px",
                background: "#003AD2",
                borderRadius: "10px",
                marginLeft: "10px",
                marginRight: "10px",
              }
            : {
                width: "160px",
                height: "40px",
                background: "#003AD2",
                borderRadius: "10px",
                marginLeft: "10px",
                marginRight: "10px",
              }
        }
        onClick={() => {
          dispatch(campaignActions.showModal());
        }}
      >
        <PlusIcon />
        <span
          style={{
            textTransform: "none",
            height: "17px",
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: "12px",
            lineHeight: "17px",
            color: " #FFFFFF",
          }}
        >
          Add Campaign
        </span>
      </Button>
      <Modal
        open={isModalOpen}
        onClose={() => dispatch(campaignActions.handleClose())}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ width: "100%" }}>
            <div className="addCampaignModal-title-span">
              <p
                style={{
                  paddingLeft: "18px",
                  paddingTop: "24px",
                  fontSize: "18px",
                  width: " fit-content",
                  height: "22px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "22px",
                  color: "#1F4173",
                }}
              >
                Add New Campaign
              </p>
            </div>
          </div>
          <form onSubmit={onSubmitEventhandler} style={{ margin: "20px" }}>
            <Grid container>
              <Grid item xs={4}>
                <label
                  style={{ fontSize: "14px" }}
                  className="addCampaignModal-labels"
                >
                  Campaign Name
                </label>
                <br />
                <input
                  type="text"
                  id="campaign-name"
                  className="addCampaignModal-inputs"
                  placeholder="Campaign Name"
                  name="name"
                  value={name}
                  onChange={onInputChangeHandler}
                  autoComplete="off"
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <label className="addCampaignModal-labels">Source Type</label>
                <br />
                <select
                  className="addCampaignModal-selects"
                  name="source"
                  value={source}
                  onChange={onInputChangeHandler}
                  autoComplete="off"
                  required
                >
                  <option value="" disabled defaultValue>
                    Select the source
                  </option>
                  {commonFunctions.typesOfSource.map((source) => (
                    <React.Fragment key={source.value}>
                      <option value={source.value}>{source.sourceName}</option>
                    </React.Fragment>
                  ))}
                </select>
              </Grid>
              <Grid item xs={4}>
                <label className="addCampaignModal-labels">Tag</label>
                <br />
                <input
                  type="text"
                  className="addCampaignModal-inputs"
                  placeholder="eg: React/Node developer,etc., "
                  name="tags"
                  value={tags}
                  onChange={tagInputChange}
                  autoComplete="off"
                  required
                  style={{ marginBottom: "0px" }}
                />
                <div className="TagQueryNote">
                  Note: Use exact tag names like{" "}
                  <span>React developer, Node developer, etc.,</span>
                </div>
              </Grid>
              <Grid item xs={4}>
                <label className="addCampaignModal-labels">
                  No. of times campaign runs per day
                </label>
                <br />
                <input
                  type="number"
                  className="addCampaignModal-inputs"
                  placeholder="frequency"
                  name="frequency"
                  value={frequency}
                  onChange={onInputChangeHandler}
                  autoComplete="off"
                  required
                  min={1}
                  max={15}
                />
              </Grid>
              <Grid item xs={4}>
                <label className="addCampaignModal-labels">Start Date</label>
                <br />
                <input
                  type="date"
                  className="addCampaignModal-datePicker "
                  name="start_date"
                  value={start_date}
                  onChange={onInputChangeHandler}
                  autoComplete="off"
                  required
                  min={todaysDate}
                  pattern="(?:((?:0[1-9]|1[0-9]|2[0-9])\/(?:0[1-9]|1[0-2])|(?:30)\/(?!02)(?:0[1-9]|1[0-2])|31\/(?:0[13578]|1[02]))\/(?:19|20)[0-9]{2})"
                />
              </Grid>
              <Grid item xs={4}>
                <label className="addCampaignModal-labels">
                  Parsing Start Time
                </label>
                <br />
                <input
                  type="time"
                  className="addCampaignModal-timePicker"
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
              </Grid>
              <Grid item xs={4}>
                <label
                  className="addCampaignModal-labels"
                  style={{
                    marginRight: "5px",
                  }}
                >
                  End Date
                </label>
                <span>( </span>
                <input
                  type="checkbox"
                  name="onGoing"
                  style={{ marginRight: "5px" }}
                  onChange={onOngoing}
                  value={onGoing}
                  disabled={start_date ? false : true}
                />
                <label className="addCampaignModal-labels">On going</label>
                <span> )</span>
                <br />
                <input
                  type="date"
                  className="addCampaignModal-datePicker"
                  name="end_date"
                  value={onGoing ? endLessDate : end_date}
                  onChange={onInputChangeHandler}
                  autoComplete="off"
                  disabled={start_date ? (onGoing ? true : false) : true}
                  required={onGoing ? false : true}
                  min={start_date}
                />
              </Grid>
              <Grid item xs={4}>
                <label className="addCampaignModal-labels">
                  Parsing End Time
                </label>
                <br />
                <input
                  type="time"
                  className="addCampaignModal-timePicker"
                  name="end_time"
                  disabled={onGoing ? true : false}
                  value={onGoing ? "23:59" : end_time}
                  min={
                    onGoing
                      ? ""
                      : difference_startDate_endDate
                      ? ""
                      : minTimeDiff
                  }
                  onChange={onInputChangeHandler}
                  autoComplete="off"
                  required={onGoing ? false : true}
                />
              </Grid>
              <Grid item xs={4}>
                <label className="addCampaignModal-labels">Location</label>
                <br />
                <input
                  type="text"
                  className="addCampaignModal-inputs"
                  placeholder="Location"
                  name="location"
                  value={location}
                  onChange={onInputChangeHandler}
                  autoComplete="off"
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <label className="addCampaignModal-labels">Country</label>
                <select
                  className="addCampaignModal-selects"
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
                    <option key={country.id} value={country.country_name}>
                      {country.country_name}
                    </option>
                  ))}
                </select>
              </Grid>
              <Grid item xs={8}>
                <label
                  style={{ fontSize: "14px" }}
                  className="addCampaignModal-labels"
                >
                  Query URL
                </label>
                <br />
                <input
                  type="text"
                  className="addCampaignModal-inputs"
                  placeholder="Paste your query here"
                  name="queryURL"
                  value={queryURL}
                  onChange={onInputChangeHandler}
                  autoComplete="off"
                  style={{ width: "100%", marginBottom: "0px" }}
                />
                <div className="TagQueryNote">
                  Note: Copy and paste part of filter query string like
                  <span style={{ opacity: "1" }}>
                    {" "}
                    "&fansw&sca03Aattr(0SQF7/38&sortdate"
                  </span>
                  .
                </div>
              </Grid>
              <Grid item xs={12}>
                <Divider style={{ marginBottom: "30px" }} />
              </Grid>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "flex-end",
                }}
              >
                <div
                  style={{
                    marginRight: "10px",
                  }}
                >
                  <Button
                    variant="contained"
                    style={{
                      borderRadius: "10px",
                      background: "#1F4173",
                      textTransform: "none",
                      fontWeight: "600",
                      opacity: 0.5,
                    }}
                    onClick={() => {
                      dispatch(campaignActions.handleClose());
                      dispatch(campaignActions.campaignIDAction(""));
                      setAddCampaignDetails({
                        name: "",
                        source: "",
                        frequency: "",
                        location: "",
                        start_date: "",
                        start_time: "",
                        end_date: "",
                        end_time: "",
                        status: 1,
                        country: "",
                      });
                      setOnGoing(false);
                      setTags([]);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
                <div>
                  <Button
                    type="submit"
                    variant="contained"
                    style={{
                      borderRadius: "10px",
                      background: "#003AD2",
                      textTransform: "none",
                      fontWeight: "600",
                    }}
                  >
                    Add Campaign
                  </Button>
                </div>
              </div>
            </Grid>
          </form>
        </Box>
      </Modal>
    </React.Fragment>
  );
};
export default AddCampaginModal;
