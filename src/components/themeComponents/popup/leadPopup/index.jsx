import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
} from "@mui/material";
import "./Ipopup.scss";
import IButton from "../../button";
import closeIcon from "../../../../assets/icons/closeIcon.png";

export default function IPopup(props) {
  return (
    <Dialog
      onClose={props.closePopupFunction}
      open={props.open}
      PaperProps={{
        style: {
          background: "#FFFFFF",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.07)",
          borderRadius: "15px",
          height: "240px",
          width: "460px",
        },
      }}
      className="dialoge"
    >
      <DialogTitle
        style={{
          display: "flex",
          padding: "12px 20px",
          alignItems: "center",
          justifyContent: "space-between",
          height: "60px",
          background: "#FAFAFA",
          boxShadow: "inset 0px -1px 3px rgba(0, 0, 0, 0.05)",
          borderRadius: "15px 15px 0px 0px",
        }}
      >
        <div
          style={{
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: "18px",
            lineHeight: "22px",
            color: "#1F4173",
            height: "100%",
            display: "flex",
            alignItems: "inherit",
          }}
        >
          Update Lead Status
        </div>
        <IconButton aria-label="close" onClick={props.onClosePopup}>
          <img src={closeIcon} alt="close" />
        </IconButton>
      </DialogTitle>
      <DialogContent className={"dialoge-content"} style={{ padding: "10px" }}>
        <div className="title_area" style={{ marginBottom: "10px" }}>
          {props.title ? (
            <>
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
        <div
          className={"model_body"}
          style={{
            height: "80px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            className="body-area"
            style={{
              fontStyle: "normal",
              fontWeight: 400,
              fontSize: "18px",
              lineHeight: "26px",
              color: "#1F4173",
              textAlign: "justify",
              overflow: "auto",
            }}
          >
            {props.body ? (
              props.body
            ) : props.status === -1 ? (
              <>
                <label
                  style={{
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: "18px",
                    lineHeight: "26px",
                    color: "#1F4173",
                    textAlign: "justify",
                    overflow: "auto",
                    display: "block",
                    padding: "4px 0px",
                  }}
                  className="reject-label"
                >
                  Reason for rejecting lead:
                </label>
                <input
                  style={{
                    fontStyle: "normal",
                    fontWeight: 600,
                    fontSize: "14px",
                    textAlign: "justify",
                    overflow: "auto",
                    display: "block",
                    width: "420px",
                    height: "40px",
                    outline: "none",
                    padding: "3px 6px",
                    background: "rgba(248, 248, 249, 0.8)",
                    border: "1px solid rgba(31, 65, 115, 0.2)",
                    borderRadius: "10px",
                  }}
                  placeholder="Reason"
                  className="reject-reason-inpt"
                  value={props.reason}
                  required
                  onChange={(e) => props.setReason(e.target.value)}
                />
              </>
            ) : (
              "Are you sure you want to perform this action ?"
            )}
          </div>
        </div>
      </DialogContent>
      <DialogActions
        className={`dialog-action ${
          props.dialogAction ? props.dialogAction : ""
        }`}
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px 20px",
        }}
      >
        <IButton
          type="apply"
          name="apply"
          children={"Apply"}
          onclick={props.handleApply}
          disabled={
            props.status === -1 && props.reason.length === 0 ? true : false
          }
        />
      </DialogActions>
    </Dialog>
  );
}
