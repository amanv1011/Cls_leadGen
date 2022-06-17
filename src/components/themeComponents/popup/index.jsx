import React, { useEffect, useState } from "react";
import * as campaignActions from "../../../redux/actions/campaignActions";
import { useSelector, useDispatch } from "react-redux";
import { Box, Modal, Button, Divider, Grid } from "@mui/material";
import { Timestamp } from "firebase/firestore";
import "./popup.scss";
import PlusIcon from "./PlusIcon";
import moment from "moment";
import { openAlertAction } from "../../../redux/actions/alertActions";

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
};

const AddCampaginModal = () => {
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
  console.log("addCampaignDetails", addCampaignDetails);

  const tagInputChange = (event) => {
    const newarrayValue = event.target.value;
    setTags(newarrayValue.split(","));
  };

  useEffect(() => {
    if (source === "seek_aus") {
      if (tags.length > 1 || pages > 2) {
        alert("For SEEK only 1 tag and 2 pages are permitted");
        setTags([]);
        setAddCampaignDetails({ pages: 1 });
      }
    } else if (source === "indeed_aus") {
      if (tags.length > 15 || pages > 15) {
        alert("For Indeed only 10 tags and 10 pages are permitted");
        setTags([]);
        setAddCampaignDetails({ pages: 1 });
      }
    } else if (source === "linkedin_aus") {
      if (tags.length > 1 || pages > 1) {
        alert("For LinkedIn only 1 tag and 1 page is permitted");
        setTags([]);
        setAddCampaignDetails({ pages: 1 });
      }
    }
  }, [source, tags.length, pages]);

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

  const onSubmitEventhandler = (event) => {
    event.preventDefault();

    try {
      const newCampaign = {
        ...addCampaignDetails,
        frequency: parseInt(frequency),
        tags,
        pages: parseInt(pages),
        end_date: Timestamp.fromDate(new Date(end_date)),
        start_date: Timestamp.fromDate(new Date(start_date)),
        last_crawled_date: Timestamp.fromDate(new Date(start_date)),
        owner: "Mithun Dominic",
        campaignCreatedAt: Timestamp.fromDate(new Date()),
      };

      if (a__campgaignId) {
        dispatch(
          campaignActions.updateCampaignsAction(a__campgaignId, newCampaign)
        );
        dispatch(campaignActions.campaignIDAction(""));
      } else {
        dispatch(campaignActions.postCampaignAction(newCampaign));
      }
      if (
        errorFromStore === null ||
        errorFromStore === undefined ||
        errorFromStore === ""
      ) {
        dispatch(campaignActions.handleClose());
      } else {
        dispatch(campaignActions.showModal());
      }
      setAddCampaignDetails({
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
      setTags([]);
    } catch (error) {
      dispatch(
        openAlertAction(
          `${error.message}. Please provide a valid date`,
          true,
          "error"
        )
      );
    }
  };

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
  console.log("difference", difference);
  console.log("difference_startDate_endDate", difference_startDate_endDate);

  if (difference === 0) {
    minStartTime = currentTime;
    maxStartTime = "24:00";
  } else {
    minStartTime = "00:00";
    maxStartTime = "24:00";
  }
  return (
    <React.Fragment>
      <Button
        onClick={() => {
          dispatch(campaignActions.showModal());
        }}
        style={{
          width: "160px",
          height: "40px",
          background: "#003AD2",
          borderRadius: "10px",
          marginLeft: "20px",
          marginRight: "10px",
        }}
      >
        <PlusIcon />
        <span
          style={{
            textTransform: "none",
            height: "17px",
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: "14px",
            lineHeight: "17px",
            color: " #FFFFFF",
          }}
        >
          Add Campagin
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
            <Grid container spacing={2}>
              <Grid
                item
                xs={4}
                style={{
                  marginTop: "10px",
                }}
              >
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

              <Grid
                item
                xs={4}
                style={{
                  marginTop: "10px",
                }}
              >
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
              </Grid>

              <Grid
                item
                xs={4}
                style={{
                  marginTop: "10px",
                }}
              >
                <label className="addCampaignModal-labels">Tag</label>
                <br />
                <input
                  type="text"
                  className="addCampaignModal-inputs"
                  placeholder="eg: JIRA, React Js, etc., "
                  name="tags"
                  value={tags}
                  onChange={tagInputChange}
                  autoComplete="off"
                  required
                />
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
                <label className="addCampaignModal-labels">Start Time</label>
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
                <label className="addCampaignModal-labels">End Date</label>
                <br />
                <input
                  type="date"
                  className="addCampaignModal-datePicker"
                  name="end_date"
                  value={end_date}
                  onChange={onInputChangeHandler}
                  autoComplete="off"
                  required
                  min={start_date}
                />
              </Grid>

              <Grid item xs={4}>
                <label className="addCampaignModal-labels">End Time</label>
                <br />
                <input
                  type="time"
                  className="addCampaignModal-timePicker"
                  name="end_time"
                  value={end_time}
                  min={difference_startDate_endDate ? "" : minTimeDiff}
                  onChange={onInputChangeHandler}
                  autoComplete="off"
                  required
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
                <label className="addCampaignModal-labels">
                  Extract No. Of Pages(s)
                </label>
                <br />
                <input
                  className="addCampaignModal-inputs"
                  type="number"
                  placeholder="Extract No. Of Pages(s)"
                  name="pages"
                  value={pages}
                  onChange={onInputChangeHandler}
                  autoComplete="off"
                  required
                  min={1}
                  max={100}
                  style={{
                    marginBottom: "10px",
                  }}
                />
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
                        last_crawled_date: "",
                        end_date: "",
                        end_time: "",
                        pages: "",
                        status: 1,
                      });
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
                    {a__campgaignId ? "Update Campaign" : "Add Campaign"}
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
