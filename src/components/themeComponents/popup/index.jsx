import React, { useEffect, useState } from "react";
import * as campaignActions from "../../../redux/actions/campaignActions";
import { useSelector, useDispatch } from "react-redux";
import { Box, Modal, Button, Divider, Grid } from "@mui/material";
import { Timestamp } from "firebase/firestore";
import "./popup.scss";
import moment from "moment";
import SearchIcon from "./SearchIcon";
import PlusIcon from "./PlusIcon";

function AddCampaginModal() {
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

  const dispatch = useDispatch();
  const statesInReduxStore = useSelector((state) => state);

  const isModalOpen = statesInReduxStore.allCampaigns.isModalVisible;
  const a__campgaignId = statesInReduxStore.allCampaigns.a__campgaign__Id;

  const [addCampaignDetails, setAddCampaignDetails] = useState({
    name: "",
    source: "",
    frequency: 0,
    location: "",
    start_date: moment().format("L"),
    start_time: "",
    last_crawled_date: moment().format("L"),
    end_date: moment().format("L"),
    end_time: "",
    pages: 0,
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
    setTags(newarrayValue.split("," || ""));
  };

  console.log("addCampaignDetails--->", addCampaignDetails);

  useEffect(() => {
    if (source === "seek_aus") {
      if (tags.length > 1 || pages > 2) {
        alert("For SEEK only 1 tag and 2 pages are permitted");
        setTags([]);
        setAddCampaignDetails({ pages: 0 });
      }
    } else if (source === "indeed_aus") {
      if (tags.length > 15 || pages > 15) {
        alert("For Indeed only 15 tags and 15 pages are permitted");
        setTags([]);
        setAddCampaignDetails({ pages: 0 });
      }
    } else if (source === "linkedin_aus") {
      if (tags.length > 1 || pages > 1) {
        alert("For Linkedin only 1 tag and 1 page is permitted");
        setTags([]);
        setAddCampaignDetails({ pages: 0 });
      }
    }
  }, [source, tags.length, pages]);

  useEffect(() => {
    if (a__campgaignId !== undefined && a__campgaignId !== "") {
      detailsForEdit();
    }
  }, [a__campgaignId]);

  const detailsForEdit = async () => {
    try {
      const campaignSingle = await dispatch(
        campaignActions.getACampaignAction(a__campgaignId)
      );
      console.log(
        "campaignSingle",
        campaignSingle.payload._document.data.value.mapValue.fields
      );

      setAddCampaignDetails({
        name: campaignSingle.payload._document.data.value.mapValue.fields.name
          .stringValue,

        source:
          campaignSingle.payload._document.data.value.mapValue.fields.source
            .stringValue,

        frequency: parseInt(
          campaignSingle.payload._document.data.value.mapValue.fields.frequency
            .integerValue
        ),

        start_date:
          campaignSingle.payload._document.data.value.mapValue.fields.start_date.timestampValue
            .toString()
            .slice(0, 10),

        start_time:
          campaignSingle.payload._document.data.value.mapValue.fields.start_time
            .stringValue,

        end_date:
          campaignSingle.payload._document.data.value.mapValue.fields.end_date.timestampValue
            .toString()
            .slice(0, 10),

        end_time:
          campaignSingle.payload._document.data.value.mapValue.fields.end_time
            .stringValue,

        location:
          campaignSingle.payload._document.data.value.mapValue.fields.location
            .stringValue,

        pages: parseInt(
          campaignSingle.payload._document.data.value.mapValue.fields.pages
            .integerValue
        ),
      });
      setTags([
        campaignSingle.payload._document.data.value.mapValue.fields.tags.arrayValue.values.map(
          (item) => item.stringValue
        ),
      ]);
    } catch (error) {
      console.log("Error while fetching the a campaign", error);
    }
  };

  const onSubmitEventhandler = (event) => {
    event.preventDefault();
    const newCampaign = {
      ...addCampaignDetails,
      frequency: parseInt(frequency),
      tags,
      pages: parseInt(pages),
      end_date: Timestamp.fromDate(new Date(end_date)),
      start_date: Timestamp.fromDate(new Date(start_date)),
      last_crawled_date: Timestamp.fromDate(new Date(start_date)),
      owner: "Mithun Dominic",
      status: 0,
    };

    if (a__campgaignId) {
      dispatch(
        campaignActions.updateCampaignsAction(a__campgaignId, newCampaign)
      );
      dispatch(campaignActions.getAllCampaignsAction());
      dispatch(campaignActions.campaignIDAction(""));
      console.log("Updating", a__campgaignId);
    } else {
      dispatch(campaignActions.postCampaignsAction(newCampaign));
      dispatch(campaignActions.getAllCampaignsAction());
      console.log("posting 1st time", a__campgaignId);
    }

    console.log("Event submitted");
    dispatch(campaignActions.handleClose());
    setAddCampaignDetails({});
    setTags([]);
  };

  return (
    <React.Fragment>
      <input
        type="text"
        placeholder="Search"
        className="addCampaignModal-inputs search-box"
        onChange={(event) => {
          dispatch(campaignActions.searchInputValueAction(event.target.value));
        }}
      />

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
                  fontSize: "18px",
                  lineHeight: "22px",
                  color: "#1F4173",
                  fontWeight: 600,
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
                  placeholder="Resources"
                  name="name"
                  value={name}
                  onChange={onInputChangeHandler}
                  required
                  autoComplete="off"
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
                  required
                  autoComplete="off"
                >
                  <option value=""></option>
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
                  <option value="linkedin">Linkedin</option>
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
                  required
                  autoComplete="off"
                />
              </Grid>

              <Grid item xs={4}>
                <label className="addCampaignModal-labels">
                  No. of times the campaign run per day
                </label>
                <br />
                <input
                  type="number"
                  className="addCampaignModal-inputs"
                  placeholder="frequency"
                  name="frequency"
                  value={frequency}
                  onChange={onInputChangeHandler}
                  required
                  autoComplete="off"
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
                  required
                  autoComplete="off"
                />
              </Grid>

              <Grid item xs={4}>
                <label className="addCampaignModal-labels">Start Time</label>
                <br />
                <input
                  type="time"
                  className="addCampaignModal-datePicker "
                  name="start_time"
                  value={start_time}
                  onChange={onInputChangeHandler}
                  required
                  autoComplete="off"
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
                  required
                  autoComplete="off"
                />
              </Grid>

              <Grid item xs={4}>
                <label className="addCampaignModal-labels">End Time</label>
                <br />
                <input
                  type="time"
                  className="addCampaignModal-datePicker"
                  name="end_time"
                  value={end_time}
                  onChange={onInputChangeHandler}
                  required
                  autoComplete="off"
                />
              </Grid>

              <Grid item xs={4}>
                <label className="addCampaignModal-labels">Location</label>
                <br />
                <input
                  type="text"
                  className="addCampaignModal-inputs"
                  placeholder={"eg:Calcutta, Delhi, etc.,"}
                  name="location"
                  value={location}
                  onChange={onInputChangeHandler}
                  required
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}>
                <label className="addCampaignModal-labels">
                  Extract No. Of Pages(s)
                </label>
                <br />
                <input
                  className="addCampaignModal-inputs"
                  type="number"
                  placeholder="Resources"
                  name="pages"
                  value={pages}
                  onChange={onInputChangeHandler}
                  required
                  autoComplete="off"
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
                      fontFamily: "Segoe UI",
                      textTransform: "none",
                      fontWeight: "600",
                      opacity: 0.5,
                    }}
                    onClick={() => dispatch(campaignActions.handleClose())}
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
                      fontFamily: "Segoe UI",
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
}
export default AddCampaginModal;
