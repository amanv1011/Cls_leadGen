import React from "react";
import DateRangePicker from "react-daterange-picker";
import "react-daterange-picker/dist/css/react-calendar.css";
import originalMoment from "moment";
import { extendMoment } from "moment-range";
import "./DatePicker.scss";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {
  leadsFilterDate,
  datePickerState,
} from "../../../redux/actions/leadsFilter";
import { connect } from "react-redux";
import {
  openDateModal,
  closeDateModal,
} from "../../../redux/actions/dateModalAction";

const moment = extendMoment(originalMoment);

class BasicDateRangePicker extends React.Component {
  constructor(props, context) {
    super(props, context);

    const today = moment();

    this.state = {
      isOpen: true,
      value:
        this.props.leadsFilter.datePickerState === 0
          ? moment.range(today.clone().subtract(5, "days"), today.clone())
          : this.props.leadsFilter.filterDate,
    };
  }

  onSelect = (value, states) => {
    this.setState({ value, states });
  };

  applyDate = () => {
    this.props.leadsFilterDate(this.state.value);
    this.props.closeDateModal();
    this.props.datePickerState(1);
  };
  closeModal = () => {
    this.props.closeDateModal();
  };

  renderSelectionValue = () => {
    return (
      <div>
        {this.state.value.start.format("MMM DD, YYYY")}
        <span style={{ padding: "5px" }}>{"to"}</span>
        {this.state.value.end.format("MMM DD, YYYY")}
      </div>
    );
  };

  render() {
    return (
      <>
        <div>
          {this.state.isOpen && (
            <DateRangePicker
              value={this.state.value}
              onSelect={this.onSelect}
              singleDateRange={true}
            />
          )}
        </div>
        <div>
          <Typography className="button-calender">
            <Button className="button-cancel" onClick={this.closeModal}>
              Cancel
            </Button>
            <Button className="button-apply" onClick={this.applyDate}>
              Apply
            </Button>
          </Typography>
        </div>
      </>
    );
  }
}
const mapDispatchToProps = {
  leadsFilterDate,
  openDateModal,
  closeDateModal,
  datePickerState,
};
const mapStateToProps = (state) => {
  return { leadsFilter: state.leadsFilter };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BasicDateRangePicker);
