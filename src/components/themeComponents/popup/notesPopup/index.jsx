import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, Divider } from "@mui/material";
import "./IModal.scss";
import IButton from "../../button";

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
          padding: "10px",
          width: "50%",
          height: "fit-content",
          minHeight: "55%",
        },
      }}
      className="dialoge"
    >
      <DialogContent className={"dialoge-content"} style={{ padding: "10px" }}>
        <div
          className={"model_body"}
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            padding: "5px",
          }}
        >
          <div
            className="body-area"
            style={{
              fontStyle: "normal",
              fontWeight: 600,
              fontSize: "15px",
              lineHeight: "26px",
              color: "#1f4173",
              opacity: 0.8,
              textAlign: "justify",
              overflowY: "auto",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              padding: "15px",
            }}
          >
            {props.displayLeadData &&
              props.displayLeadData.notes &&
              props.displayLeadData.notes.length > 0 &&
              props.displayLeadData.notes.map((ele) => {
                return (
                  <div
                    style={{
                      width: "100%",
                      height: "auto",
                      background: "#f5f7fb",
                      marginBottom: "2px",
                      whiteSpace: "wrap",
                    }}
                  >
                    {ele}
                  </div>
                );
              })}
          </div>
        </div>
      </DialogContent>
      <DialogActions
        className={`dialog-action ${
          props.dialogAction ? props.dialogAction : ""
        }`}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <IButton
          type="cancel"
          name="cancel"
          children={"Cancel"}
          onclick={closeModal}
        />
        {/* <IButton
          type="apply"
          name="apply"
          children={"Apply"}
          onclick={handleApply}
        /> */}
      </DialogActions>
    </Dialog>
  );
}
