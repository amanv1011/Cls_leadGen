import React from "react";
import { Dialog, DialogActions, DialogContent } from "@mui/material";
import "./IModal.scss";
import IButton from "../../button";
import IAutocomplete from "../../autocomplete/autocomplete";

export default function IModal(
  {
    setOpenAssignModel,
    open,
    options,
    onChangeOption,
    assignUsers,
    selectedUsers,
  },
  props
) {
  const closeModal = () => {
    setOpenAssignModel(false);
  };
  return (
    <Dialog
      onClose={closeModal}
      open={open}
      sx={{ backdropFilter: "blur(3px)" }}
      PaperProps={{
        style: {
          borderRadius: 10,
          padding: "10px",
          width: "auto",
          height: "fit-content",
          minHeight: "40%",
          minWidth: "40%",
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
              overflow: "auto",
            }}
          >
            {
              <IAutocomplete
                options={options}
                onChangeOption={onChangeOption}
                assignUsers={assignUsers}
                selectedUsers={selectedUsers}
                width={180}
              />
            }
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
