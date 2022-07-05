import React from "react";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import "./advanceDatePicker.scss";
import { useDispatch } from "react-redux";

const NewDateRangePicker = (props) => {
  const dispatch = useDispatch();

  return (
    <DateRangePicker
      format="MMM dd , yyyy HH:mm"
      // placeholder={
      //   filterDate === "" ? "Select Date Range": "Select Date Range"
      // }
      placeholder="Select Date Range"
      showOneCalendar
      style={{
        width: "275px",
        color: "rgb(92, 117, 154)",
        border: "none",
        fontWeight: "600",
        backgroundColor: "rgb(233, 236, 241)",
        borderRadius: "10px",
        height: "40px",
        padding: "3px",
      }}
      value={props.clearDateFilter}
      onOk={props.applyOkButton}
      //  onChange={setValue}
      character={" to "}
      //  onClean={props.rangeFunc}
      //  onSelect={rangeFunc}
    />
  );
};

export default NewDateRangePicker;
