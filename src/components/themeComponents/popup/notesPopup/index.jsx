import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./IModal.scss";

export default function NotesPopup(props) {
  const closeModal = () => {
    props.setShowNotesState(false);
  };
  return (
    <Dialog
      onClose={closeModal}
      open={props.open}
      sx={{ backdropFilter: "blur(3px)" }}
      PaperProps={{
        style: {
          borderRadius: 10,
          padding: "5px",
          width: "50%",
          height: "fit-content",
          minHeight: "55%",
        },
      }}
      className="dialoge"
    >
      <DialogTitle
        style={{
          display: "flex",
          padding: "12px 8px 0px 12px",
          alignItems: "center",
          justifyContent: "space-between",
          height: "50px",
        }}
      >
        <div
          style={{
            fontWeight: 700,
            fontSize: "22px",
            color: "rgba(31, 65, 115, 1)",
          }}
        >
          Notes
        </div>
        <IconButton aria-label="close" onClick={closeModal} sx={{}}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent
        className={"dialoge-content"}
        style={{ padding: "0px 12px 12px 12px" }}
      >
        <div
          className="body-area"
          style={{
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: "15px",
            lineHeight: "26px",
            color: "black",
            textAlign: "justify",
            overflowY: "auto",
            width: "100%",
            display: "grid",
            gridTemplateRows: "auto",
            maxHeight: "40vh",
            gridGap: "15px",
          }}
        >
          {props.displayLeadData &&
          props.displayLeadData.notes &&
          props.displayLeadData.notes.length > 0 ? (
            props.displayLeadData.notes.map((ele, idx) => {
              return (
                <React.Fragment key={idx}>
                  <div
                    style={{
                      width: "100%",
                      height: "auto",
                      whiteSpace: "wrap",
                      borderRadius: "10px",
                      paddingRight: "6px",
                    }}
                  >
                    <div
                      style={{
                        // opacity: 0.8,
                        fontWeight: 700,
                        fontSize: "15px",
                        color: "#545555",
                      }}
                    >{`${ele.createdAt}; By - ${ele.userName}`}</div>
                    <div
                      style={{
                        opacity: 0.7,
                        fontWeight: 500,
                        fontSize: "15px",
                      }}
                    >
                      {ele.note}
                    </div>
                    {idx !== props.displayLeadData.notes.length - 1 ? (
                      <Divider
                        light={true}
                        sx={{
                          height: "0px",
                          background: "#1F4173",
                          opacity: "0.15",
                          margin: "6px 0px 0px 0px",
                        }}
                      />
                    ) : null}
                  </div>
                </React.Fragment>
              );
            })
          ) : (
            <h5
              style={{
                width: "100%",
                height: "auto",
                marginBottom: "2px",
                whiteSpace: "wrap",
              }}
            >
              Notes not available!
            </h5>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
