import * as React from "react";
import TextField from "@mui/material/TextField";
import DateRangePicker from "@mui/lab/DateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Box from "@mui/material/Box";
import { BorderAll, BorderClear } from "@mui/icons-material";
import "./leads.scss";
import { Input } from "@mui/material";
import Calendar from "./Calendar";
import DownArrow from "./DownArrow";

function BasicDateRangePicker() {
  const [value, setValue] = React.useState([null, null]);

  return (
    <Box
      style={{
        backgroundColor: "#E7E7E7",
        height: "31px",
        padding: "5px",
        borderRadius: "10px",
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateRangePicker
          startText=""
          endText=""
          value={value}
          label="Advanced keyboard"
          onChange={(newValue) => {
            setValue(newValue);
          }}
          // sx={{ height: "30px", width: "180px", padding: 0}}
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <div
                style={{
                  display: "flex",
                  backgroundColor: "#E7E7E7",
                  flexWrap: "wrap",
                  height: "30px",
                  width: "245px",
                  borderRadius: "10px",
                  justifyContent: "center",
                }}
              >
                <input
                  style={{
                    display: "flex",
                    color: "rgba(92, 117,154)",
                    fontSize: "14px",
                    width: "83px",
                    flexWrap: "wrap",
                    justifyContent: "flex-start",
                    fontFamily: "Segoe UI",
                    fontWeight: "600",
                    border: "none",
                    backgroundColor: "#E7E7E7",
                  }}
                  ref={startProps.inputRef}
                  {...startProps.inputProps}
                />
                <div style={{ paddingTop: "3px" }}>
                  <span
                    style={{
                      paddingBottom: "4px",
                      paddingLeft: "0",
                      display: "inline-block",
                      color: "rgba(92, 117,154)",
                      fontSize: "14px",
                      fontWeight: "600",
                      fontFamily: "Segoe UI",
                    }}
                  >
                    {" "}
                    to
                  </span>
                </div>

                <input
                  style={{
                    display: "flex",
                    color: "rgba(92, 117,154)",
                    fontSize: "14px",
                    width: "90px",
                    flexWrap: "wrap",
                    border: "none",
                    justifyContent: "flex-end",
                    fontFamily: "Segoe UI",
                    fontWeight: "600",
                    backgroundColor: "#E7E7E7",
                    padding: "3px",
                  }}
                  ref={endProps.inputRef}
                  {...endProps.inputProps}
                  {...(<Calendar />)}
                ></input>
                {/* <div style={{ paddingTop: "6px", paddingLeft: "1px"}} >
            
            <Calendar />

            </div> */}

                <div style={{ paddingBottom: "5px", marginLeft: "5px" }}>
                  <DownArrow />
                </div>
              </div>
            </React.Fragment>
          )}
        />
      </LocalizationProvider>
    </Box>
  );
}
export default BasicDateRangePicker;
