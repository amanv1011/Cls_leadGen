import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
} from "@mui/material";
import closeIcon from "../../../../assets/icons/closeIcon.png";
import "./notesPopup.scss";
import Textarea from "../../textarea/textarea";
import IButton from "../../button";

export default function NotesPopup({
  addNotesFunction,
  open,
  setShowNotesState,
  displayLeadData,
  value,
  setValue,
}) {
  const closeModal = () => {
    setShowNotesState(false);
  };
  return (
    <Dialog
      onClose={closeModal}
      open={open}
      sx={{ backdropFilter: "blur(3px)" }}
      PaperProps={{
        style: {
          borderRadius: 15,
          width: "50%",
          height: "fit-content",
        },
      }}
      className="dialoge-box"
    >
      <DialogTitle className="dialoge-title">
        <div className="title-header">Notes</div>
        <IconButton aria-label="close" onClick={closeModal} sx={{}}>
          <img src={closeIcon} alt="close" />
        </IconButton>
      </DialogTitle>
      <DialogContent className={"dialoge-content"}>
        <div className="body-area">
          {displayLeadData &&
          displayLeadData.notes &&
          displayLeadData.notes.length > 0 ? (
            displayLeadData.notes.map((ele, idx) => {
              return (
                <React.Fragment key={idx}>
                  <div className="notes-container">
                    <div className="note-box">{ele.note}</div>
                    <div className="note-user">
                      <span>{`By - ${ele.userName}`}</span>
                      <span className="note-timestamp">{ele.createdAt}</span>
                    </div>

                    {idx !== displayLeadData.notes.length - 1 ? (
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
            <h5 className="note-unavailable">Notes not available!</h5>
          )}
        </div>
      </DialogContent>
      <DialogActions className="dialoge-action">
        <Textarea value={value} setValue={setValue} />
        <IButton
          type="apply"
          name="apply"
          children={"Apply"}
          onclick={addNotesFunction}
          disabled={value.length === 0 ? true : false}
        />
      </DialogActions>
    </Dialog>
  );
}
