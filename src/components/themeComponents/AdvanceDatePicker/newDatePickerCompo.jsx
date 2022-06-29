import React from "react";
import { DateRangePicker} from "rsuite";
import "rsuite/dist/rsuite.min.css";
import moment from "moment";
import "./advanceDatePicker.scss";
import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { leadsFilterDate } from "../../../redux/actions/leadsFilter";
import { datePickerState } from "../../../redux/actions/leadsFilter";
import { clearFilters } from "../../../redux/actions/leadsFilter";
import { useState } from "react";
const today = moment();

const NewDateRangePicker = (props) => {

  const dispatch = useDispatch();

  // const [clearDateFilter,setClearDateFilter]=useState();
  // const filterDate = useSelector((state) => state.leadsFilter.filterDate);
  // const datePlaceHolder = "Select Date Range";
  // console.log(filterDate,clearDateFilter);

  // const applyOkButton = (value1) => {
  //        setClearDateFilter(value1);
  //   const calender1 =
  //     props.leadsFilter.datePickerState === 0
  //       ? moment.range(today.clone(), today.clone())
  //       : moment.range(value1[0], value1[1]);
  //   props.leadsFilterDate(calender1);
  //   props.datePickerState(1);
  //   console.log("Selected Date By User", value1[0], value1[1]);
  // };
   
//   const rangeFunc=(event)=>{
       
//    console.log(event.target,"HIIIIIIIIIII")
// }

 
    
  // const dateSelectedByUser=value1=>{
  //   if(value1!==""){
  //     console.log(value1===null)
  //   }
  // }

  // const rangeFunc=value1=>moment.range(value1[0].moment.format("MMM dd , yyyy HH:mm"),value1[1].moment.format("MMM dd , yyyy HH:mm"));
  //  console.log(rangeFunc());
  // var elements = document. getElementsByClassName("rs-picker-toggle-textbox").value;
  // console.log(elements);

  // const renderSelectionValue = () => {
  //   return (
  //     <div>
  //       {filterDate.start.format("MMM DD, YYYY")}
  //       <span style={{ padding: "5px" }}>{"to"}</span>
  //       {filterDate.end.format("MMM DD, YYYY")}
  //     </div>
  //   );
  // };

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

// const mapDispatchToProps = {
//   leadsFilterDate,
//   datePickerState,
//   clearFilters
// };
// const mapStateToProps = (state) => {
//   return { leadsFilter: state.leadsFilter };
// };
// export default connect(mapStateToProps, mapDispatchToProps)(NewDateRangePicker);

export default NewDateRangePicker;

// const DateRangePickerCustomToolbar = props => (
//     <div className="field">
//       <DateRangePicker
//         ranges={[
//           {
//             label: 'Yesterday',
//             value: [format.addDays(new Date(), -1), format.addDays(new Date(), -1)]
//           },
//           {
//             label: 'Today',
//             value: [new Date(), new Date()]
//           },
//           {
//             label: 'Tomorrow',
//             value: [format.addDays(new Date(), 1), format.addDays(new Date(), 1)]
//           },
//           {
//             label: 'Last 7 days',
//             value: [format.subDays(new Date(), 6), new Date()]
//           }
//         ]}
//       />
//     </div>
//   );

//   export default DateRangePickerCustomToolbar;
