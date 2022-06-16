import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, Divider } from "@mui/material";
import "./Ipopup.scss";
import IButton from "../../button";

export default function IPopup(props) {
  return (
    <Dialog
      onClose={props.closePopupFunction}
      open={props.open}
      PaperProps={{
        style: { borderRadius: 10, padding: "10px" },
      }}
      className="dialoge"
    >
      <DialogContent className={"dialoge-content"} style={{ padding: "10px" }}>
        <div className="title_area" style={{ marginBottom: "10px" }}>
          {props.title ? (
            <>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: "22px",
                  color: "#1f4173",
                }}
                className={"model_title"}
              >
                {props.title}
              </div>
              {props.subtitle ? (
                <div
                  style={{
                    fontStyle: "normal",
                    fontWeight: 600,
                    fontSize: "12px",
                    lineHeight: "15px",
                    color: "rgba(31, 65, 115, 0.5)",
                    padding: "4px 0px",
                  }}
                  className={"model_subtitle"}
                >
                  {props.subtitle}
                </div>
              ) : null}
            </>
          ) : null}
        </div>
        <Divider
          variant="fullWidth"
          light={true}
          sx={{ height: "1px", background: "#1F4173", opacity: "0.15" }}
        />
        <div
          className={"model_body"}
          style={{
            height: "80px",
          }}
        >
          <div
            className="body-area"
            style={{
              fontStyle: "normal",
              fontWeight: 600,
              fontSize: "14px",
              lineHeight: "26px",
              color: "#1f4173",
              opacity: 0.8,
              textAlign: "justify",
              overflow: "auto",
            }}
          >
            {props.body
              ? props.body
              : "Are you sure you want to perform this action ?"}
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
        {/* <button onClick={props.onClosePopup}>Cancel</button> */}
        {/* <button onClick={props.onClosePopup}>Apply</button> */}
        <IButton
          type="cancel"
          name="cancel"
          children={"Cancel"}
          onclick={props.onClosePopup}
        />
        <IButton
          type="apply"
          name="apply"
          children={"Apply"}
          onclick={props.handleApply}
        />
      </DialogActions>
    </Dialog>
  );
}
