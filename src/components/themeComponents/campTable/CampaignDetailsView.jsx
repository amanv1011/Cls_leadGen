import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  Grid,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import "./Table.scss";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 508,
  height: 480,
  bgcolor: "#E2E2E2",
  borderRadius: "15px",
  border: "none",
  outline: "none",
};

const CampaignDetailsView = ({ open, setOpen, setViewMode, viewDetails }) => {
  const [openLoader, setOpenLoader] = useState(true);
  const handleCloseLoader = () => {
    setOpenLoader(false);
  };

  const handleClose = () => {
    setOpen(false);
    setViewMode(false);
  };

  return (
    <React.Fragment>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openLoader}
        onClick={handleCloseLoader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Modal
        open={open}
        onClose={handleCloseLoader}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {viewDetails.map((viewDetail) => {
            return (
              <React.Fragment key={viewDetail.id}>
                <Box sx={{ flexGrow: 1 }} className="camapignDetailsViewModal">
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      Campaign Name: <br />
                      {viewDetail.viewDetails.name.stringValue}
                    </Grid>

                    <Grid item xs={4}>
                      Tag(s):
                      <br />
                      {viewDetail.viewDetails.tags.arrayValue.values.map(
                        (item) => `${item.stringValue} `
                      )}
                    </Grid>

                    <Grid item xs={4}>
                      Frequency: {viewDetail.viewDetails.frequency.integerValue}
                    </Grid>

                    <Grid item xs={4}>
                      Start Date:
                      <br />
                      {viewDetail.viewDetails.start_date.timestampValue
                        .toString()
                        .slice(0, 10)}
                    </Grid>

                    <Grid item xs={4}>
                      Start Time:
                      <br />
                      {viewDetail.viewDetails.start_time.stringValue}
                    </Grid>

                    <Grid item xs={4}>
                      End date:
                      <br />
                      {viewDetail.viewDetails.end_date.timestampValue
                        .toString()
                        .slice(0, 10)}
                    </Grid>

                    <Grid item xs={4}>
                      End Time: {viewDetail.viewDetails.end_time.stringValue}
                    </Grid>

                    <Grid item xs={4}>
                      Location: {viewDetail.viewDetails.location.stringValue}
                    </Grid>

                    <Grid item xs={4}>
                      Extract No. Of Pages(s):
                      <br />
                      {viewDetail.viewDetails.pages.integerValue}
                    </Grid>

                    <Grid item xs={4}>
                      Status of the campaign:
                      <br />
                      {parseInt(viewDetail.viewDetails.status.integerValue)
                        ? "Active"
                        : "In-Active"}
                    </Grid>

                    <Grid item xs={4}>
                      Created By: <br />
                      {viewDetail.viewDetails.owner.stringValue}
                    </Grid>

                    <Grid item xs={4}>
                      Last crawled Date :<br />
                      {viewDetail.viewDetails.last_crawled_date.timestampValue
                        .toString()
                        .slice(0, 10)}
                    </Grid>
                  </Grid>
                </Box>
              </React.Fragment>
            );
          })}

          <Button
            className="closeBtn"
            variant="primary"
            onClick={handleClose}
            style={{
              width: "44px",
              fontFamily: "Proxima Nova",
              fontStyle: "normal",
              fontWeight: 600,
              fontSize: "14px",
              lineHeight: "17px",
              textAlign: "center",
              color: "#FFFFFF",
              height: "40px",
              background: "#1f4173",
              borderRadius: "10px",
              marginBottom: "15px",
            }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default CampaignDetailsView;
