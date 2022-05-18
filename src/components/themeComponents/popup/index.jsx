import React, { useEffect, useState } from "react";
import * as campaignActions from "../../../redux/actions/campaignActions";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Modal,
  Button,
  Divider,
  Grid,
  useMediaQuery,
} from "@mui/material";
import { Timestamp } from "firebase/firestore";
import "./popup.scss";
import PlusIcon from "./PlusIcon";
import IInput from "../input/index";

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
  const matches = useMediaQuery("(max-width:1460px)");
  const statesInReduxStore = useSelector((state) => state);

  const isModalOpen = statesInReduxStore.allCampaigns.isModalVisible;
  const a__campgaignId = statesInReduxStore.allCampaigns.a__campgaign__Id;

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
    setTags(newarrayValue.split("," || ""));
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
        alert("For Linkedin only 1 tag and 1 page is permitted");
        setTags([]);
        setAddCampaignDetails({ pages: 1 });
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
      const documentSnapShot = await dispatch(
        campaignActions.getACampaignAction(a__campgaignId)
      );

      setAddCampaignDetails({
        name: documentSnapShot.payload.data().name,
        source: documentSnapShot.payload.data().source,
        frequency: parseInt(documentSnapShot.payload.data().frequency),
        start_date: formatDate(
          documentSnapShot.payload.data().start_date.toDate()
        ),
        start_time: documentSnapShot.payload.data().start_time,
        end_date: formatDate(documentSnapShot.payload.data().end_date.toDate()),
        end_time: documentSnapShot.payload.data().end_time,
        location: documentSnapShot.payload.data().location,
        pages: parseInt(documentSnapShot.payload.data().pages),
        status: parseInt(documentSnapShot.payload.data().status),
      });
      setTags([...documentSnapShot.payload.data().tags]);
    } catch (error) {}
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
    };

    if (a__campgaignId) {
      dispatch(
        campaignActions.updateCampaignsAction(a__campgaignId, newCampaign)
      );
      dispatch(campaignActions.getAllCampaignsAction());
      dispatch(campaignActions.campaignIDAction(""));
    } else {
      dispatch(campaignActions.postCampaignsAction(newCampaign));
      dispatch(campaignActions.getAllCampaignsAction());
    }
    dispatch(campaignActions.handleClose());
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
  };

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("-");
  }
  return (
    <React.Fragment>
      <div className="add" style={{ display: "-webkit-inline-box" }}>
        <IInput
          type={"text"}
          placeholder={"Search"}
          isSearch={true}
          onChangeInput={(event) => {
            dispatch(
              campaignActions.searchInputValueAction(event.target.value)
            );
          }}
          className="my-input"
          style={{
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: matches ? "12px" : "14px",
            lineHeight: "17px",
            color: "#1F4173",
          }}
          autoComplete="off"
        />
      </div>
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
            fontSize: matches ? "12px" : "14px",
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
                  <option value="" disabled selected>
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
                  onChange={onInputChangeHandler}
                  autoComplete="off"
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
}
export default AddCampaginModal;
