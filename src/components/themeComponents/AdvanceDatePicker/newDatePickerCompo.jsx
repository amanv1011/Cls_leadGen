import React from "react";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import moment from "moment";
import "./advanceDatePicker.scss";
import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { leadsFilterDate } from "../../../redux/actions/leadsFilter";
import { datePickerState } from "../../../redux/actions/leadsFilter";
import { clearFilters } from "../../../redux/actions/leadsFilter";
const today = moment();

const NewDateRangePicker = (props) => {

  const dispatch = useDispatch();

  const filterDate = useSelector((state) => state.leadsFilter.filterDate);
  const datePlaceHolder = "Select Date Range";

  const applyOkButton = (value1) => {
    const calender1 =
      props.leadsFilter.datePickerState === 0
        ? moment.range(today.clone(), today.clone())
        : moment.range(value1[0], value1[1]);
    props.leadsFilterDate(calender1);
    props.datePickerState(1);
    console.log("Selected Date By User", value1[0], value1[1]);
  };

//   const clearAllSelectedDateRange = () => {
//     dispatch(props.clearFilters());
//     dispatch(props.datePickerState(0));
//   };

  return (
    <DateRangePicker
      format="MMM dd , yyyy HH:mm"
    //   placeholder={
    //     filterDate === "" ? datePlaceHolder : applyOkButton()
    //   }
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
      onOk={applyOkButton}
      character={" to "}
    //  onClean={clearAllSelectedDateRange}
    />
  );
};

const mapDispatchToProps = {
  leadsFilterDate,
  datePickerState,
  clearFilters
};
const mapStateToProps = (state) => {
  return { leadsFilter: state.leadsFilter };
};
export default connect(mapStateToProps, mapDispatchToProps)(NewDateRangePicker);

//export default NewDateRangePicker;

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
