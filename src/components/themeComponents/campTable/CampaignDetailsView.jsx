import React from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import "./CampaignDetailsView.scss";

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function CampaignDetailsView({
  openDialog,
  setOpenDialog,
  viewDetails,
}) {
  const handleClose = () => {
    setOpenDialog(false);
  };
  //added custom classname to override mui css
  return (
    <React.Fragment>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openDialog}
        className="camapignDetailsViewModal"
        PaperProps={{
          style: {
            maxWidth: "100%",
            borderRadius: "10px",
          },
        }}
      >
        {viewDetails.map((viewDetail) => {
          let sourceType = "";

          if (viewDetail.viewDetails.source.stringValue === "seek_aus") {
            sourceType = "Seek Australia";
          } else if (
            viewDetail.viewDetails.source.stringValue === "indeed_aus"
          ) {
            sourceType = "Indeed Australia";
          } else if (
            viewDetail.viewDetails.source.stringValue === "indeed_ca"
          ) {
            sourceType = "Indeed Canada";
          } else if (
            viewDetail.viewDetails.source.stringValue === "indeed_uk"
          ) {
            sourceType = "Indeed United";
          } else if (
            viewDetail.viewDetails.source.stringValue === "indeed_il"
          ) {
            sourceType = "Indeed Italy";
          } else if (
            viewDetail.viewDetails.source.stringValue === "indeed_ae"
          ) {
            sourceType = "Indeed UAE";
          } else if (
            viewDetail.viewDetails.source.stringValue === "indeed_fi"
          ) {
            sourceType = "Indeed Finland";
          } else if (
            viewDetail.viewDetails.source.stringValue === "indeed_ch"
          ) {
            sourceType = "Indeed China";
          } else if (
            viewDetail.viewDetails.source.stringValue === "indeed_pt"
          ) {
            sourceType = "Indeed Portugal";
          } else if (
            viewDetail.viewDetails.source.stringValue === "indeed_sg"
          ) {
            sourceType = "Indeed Singapore";
          } else {
            sourceType = "Linkedin";
          }
          return (
            <React.Fragment key={viewDetail.id}>
              <BootstrapDialogTitle
                id="customized-dialog-title"
                onClose={handleClose}
                className={"view-dialoge-title"}
              >
                {viewDetail.viewDetails.name.stringValue}
              </BootstrapDialogTitle>
              <DialogContent dividers className="view-dialoge-content">
                <div className="main-container">
                  <div className="label-container">
                    <div
                      className="label-campaign-view"
                      style={{ marginTop: 0 }}
                    >
                      Source Type
                    </div>
                    <div className="grid-campaign-view">
                      <div className="campaign-text">{sourceType}</div>
                    </div>
                  </div>

                  <div className="label-container">
                    <div
                      className="label-campaign-view"
                      style={{ marginTop: 0 }}
                    >
                      Tag(s)
                    </div>
                    <div className="grid-campaign-view">
                      <div className="campaign-text">
                        {viewDetail.viewDetails.tags.arrayValue.values.map(
                          (item) => `${item.stringValue} `
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="label-container">
                    <div
                      className="label-campaign-view"
                      style={{ marginTop: 0 }}
                    >
                      Frequency
                    </div>
                    <div className="grid-campaign-view">
                      <div className="campaign-text">
                        {viewDetail.viewDetails.frequency.integerValue}
                      </div>
                    </div>
                  </div>

                  <div className="label-container">
                    <div className="label-campaign-view">Start Date</div>
                    <div className="grid-campaign-view">
                      <div className="campaign-text">
                        {viewDetail.viewDetails.start_date.timestampValue
                          .toString()
                          .slice(0, 10)}
                      </div>
                    </div>
                  </div>

                  <div className="label-container">
                    <div className="label-campaign-view">Start Time</div>
                    <div className="grid-campaign-view">
                      <div className="campaign-text">
                        {viewDetail.viewDetails.start_time.stringValue}
                      </div>
                    </div>
                  </div>

                  <div className="label-container">
                    <div className="label-campaign-view">End date</div>
                    <div className="grid-campaign-view">
                      <div className="campaign-text">
                        {viewDetail.viewDetails.end_date.timestampValue
                          .toString()
                          .slice(0, 10)}
                      </div>
                    </div>
                  </div>

                  <div className="label-container">
                    <div className="label-campaign-view">End Time</div>
                    <div className="grid-campaign-view">
                      <div className="campaign-text">
                        {viewDetail.viewDetails.end_time.stringValue}
                      </div>
                    </div>
                  </div>

                  <div className="label-container">
                    <div className="label-campaign-view">Location</div>
                    <div className="grid-campaign-view">
                      <div className="campaign-text">
                        {viewDetail.viewDetails.location.stringValue}
                      </div>
                    </div>
                  </div>

                  <div className="label-container">
                    <div className="label-campaign-view">
                      Extract No. Of Pages(s)
                    </div>
                    <div className="grid-campaign-view">
                      <div className="campaign-text">
                        {viewDetail.viewDetails.pages.integerValue}
                      </div>
                    </div>
                  </div>

                  <div className="label-container">
                    <div className="label-campaign-view">
                      Status of the campaign
                    </div>
                    <div className="grid-campaign-view">
                      <div className="campaign-text">
                        {parseInt(viewDetail.viewDetails.status.integerValue)
                          ? "Active"
                          : "In-Active"}
                      </div>
                    </div>
                  </div>

                  <div className="label-container">
                    <div className="label-campaign-view">Created By</div>
                    <div className="grid-campaign-view">
                      <div className="campaign-text">
                        {viewDetail.viewDetails.owner.stringValue}
                      </div>
                    </div>
                  </div>

                  <div className="label-container">
                    <div className="label-campaign-view">Last crawled Date</div>
                    <div className="grid-campaign-view">
                      <div className="campaign-text">
                        {viewDetail.viewDetails.last_crawled_date.timestampValue
                          .toString()
                          .slice(0, 10)}
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </React.Fragment>
          );
        })}
      </Dialog>
    </React.Fragment>
  );
}
