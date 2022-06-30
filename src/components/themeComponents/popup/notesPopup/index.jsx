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
import "./IModal.scss";
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
      className="dialoge"
    >
      <DialogTitle
        style={{
          display: "flex",
          padding: "20px",
          alignItems: "center",
          justifyContent: "space-between",
          height: "50px",
          background: "#FAFAFA",
          boxShadow: "inset 0px -1px 3px rgba(0, 0, 0, 0.05)",
          borderRadius: "15px 15px 0px 0px",
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
          <img src={closeIcon} alt="close" />
        </IconButton>
      </DialogTitle>
      <DialogContent
        className={"dialoge-content"}
        style={{ padding: "10px 20px" }}
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
            maxHeight: "200px",
            gridGap: "6px",
            minHeight: "100px",
          }}
        >
          {displayLeadData &&
          displayLeadData.notes &&
          displayLeadData.notes.length > 0 ? (
            displayLeadData.notes.map((ele, idx) => {
              return (
                <React.Fragment key={idx}>
                  <div
                    style={{
                      width: "100%",
                      height: "auto",
                      whiteSpace: "wrap",
                      borderRadius: "10px",
                      paddingRight: "6px",
                      boxSizing: "border-box",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        opacity: 0.7,
                        fontWeight: 500,
                        fontSize: "15px",
                      }}
                    >
                      {ele.note}
                    </div>
                    <div
                      style={{
                        opacity: 0.8,
                        fontWeight: 600,
                        fontSize: "11px",
                        color: "#545555",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>{`By - ${ele.userName}`}</span>
                      <span
                        style={{
                          fontSize: "11px",
                          opacity: 0.9,
                          fontWeignt: 500,
                        }}
                      >
                        {ele.createdAt}
                      </span>
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
            <h5
              style={{
                width: "100%",
                height: "auto",
                marginBottom: "2px",
                whiteSpace: "wrap",
                fontWeight: 500,
                textAlign: "center",
                color: "rgb(31, 65, 115)",
              }}
            >
              Notes not available!
            </h5>
          )}
        </div>
      </DialogContent>
      <DialogActions
        style={{
          width: "100%",
          boxSizing: "border-box",
          height: "60px",
          padding: "4px 20px 5px 20px",
          boxShadow: "rgb(0 0 0 / 20%) 0px -4px 6px -6px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
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
