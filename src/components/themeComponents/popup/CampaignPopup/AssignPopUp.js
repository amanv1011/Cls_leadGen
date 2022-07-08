import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import "./assignPopUp.scss";
import IButton from "../../button";
import IAutocomplete from "../../autocomplete/autocomplete";
import closeIcon from "../../../../assets/icons/closeIcon.png";

export default function AssignPopUp(
  {
    setOpenAssignModel,
    open,
    options,
    onChangeOption,
    assignUsers,
    selectedUsers,
    setselectedArray,
    handleClosePopover,
  },
  props
) {
  const closeModal = () => {
    setOpenAssignModel(false);
    // setselectedArray([]);
    handleClosePopover();
  };
  return (
    <Dialog
      onClose={closeModal}
      open={open}
      sx={{ backdropFilter: "blur(3px)" }}
      PaperProps={{
        style: {
          borderRadius: 15,
          width: "auto",
          height: "fit-content",
          minHeight: "50%",
          minWidth: "35%",
          overflow: "hidden",
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
            fontWeight: 700,
            fontSize: "22px",
            color: "rgba(31, 65, 115, 1)",
          }}
        >
          Assign
        </div>
        <IconButton aria-label="close" onClick={closeModal}>
          <img src={closeIcon} alt="close" />
        </IconButton>
      </DialogTitle>
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
      ></DialogActions>
    </Dialog>
  );
}
