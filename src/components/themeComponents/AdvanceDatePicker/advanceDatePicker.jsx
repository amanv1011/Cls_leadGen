import React from "react";
import { FormControl } from "react-bootstrap";
import moment from "moment-timezone";
import DateTimeRangeContainer from "react-advanced-datetimerange-picker";
import "./advanceDatePicker.scss";
import { connect } from "react-redux";
import { leadsFilterDate } from "../../../redux/actions/leadsFilter";
import { datePickerState } from "../../../redux/actions/leadsFilter";
const today = moment();

class AdvanceDatePicker extends React.Component {
  constructor(props) {
    super(props);
    let start = moment(new Date(2022, 8, 20, 0, 0, 0, 0));
    let end = moment(start).add(5, "days").subtract(1, "second");
    this.state = {
      start: start,
      end: end,
      timezone: "America/Los_Angeles",
      secondDisplay: false,
    };

    this.onClick = this.onClick.bind(this);
    this.applyCallback = this.applyCallback.bind(this);
  }

  applyCallback(startDate, endDate) {
    this.setState({
      start: startDate,
      end: endDate,
    });
    const dateRangeCalc =
      this.props.leadsFilter.datePickerState === 0
        ? moment.range(today.clone(), today.clone())
        : moment.range(startDate, endDate);
    this.props.leadsFilterDate(dateRangeCalc);
    this.props.datePickerState(1);
  }

  rangeCallback(index, value) {
    // console.log(index, value);
  }

  onClick() {
    let newStart = moment(this.state.start).subtract(3, "days");
    this.setState({ start: newStart });
  }

  renderPickerAutoApplySmartModeDisabled(
    ranges,
    local,
    maxDate,
    descendingYears
  ) {
    let value = `${this.state.start.format(
      "MMM DD, YYYY HH:mm"
    )} to ${this.state.end.format("MMM DD, YYYY HH:mm")}`;
    return (
      <div id="DateTimeRangeContainerSmartModeDisabled">
        <br />
        <DateTimeRangeContainer
          ranges={ranges}
          start={this.state.start}
          end={this.state.end}
          local={local}
          maxDate={maxDate}
          applyCallback={this.applyCallback}
          rangeCallback={this.rangeCallback}
          autoApply
          descendingYears={descendingYears}
          years={[2018, 2028]}
        >
          <FormControl
            onClick={this.filterDate}
            id="formControlsTextB"
            className="datepickerInputStyle"
            type="text"
            label="Text"
            placeholder="Select Date Range"
            style={{ cursor: "pointer" }}
            disabled
            value={value}
          />
        </DateTimeRangeContainer>

        <br />
      </div>
    );
  }

  render() {
    let now = new Date();
    let now2 = moment();
    let thisMonth = now2.get("date");
    let start = moment(
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
    );
    let end = moment(start).add(1, "days").subtract(1, "seconds");

    let ranges = {
      "Today ": [moment(start), moment(end)],
      Yesterday: [
        moment(start).subtract(1, "days"),
        moment(end).subtract(1, "days"),
      ],
      "Last 7 Days": [moment(start).subtract(6, "days"), moment(end)],
      "Last 30 Days": [moment(start).subtract(29, "days"), moment(end)],
      "This Month": [
        moment(start).subtract(thisMonth - 1, "days"),
        moment(end),
      ],
      "Last Month": [moment(start).subtract(1, "months"), moment(end)],
      "Last 3 Months": [moment(start).subtract(3, "months"), moment(end)],
    };
    let local = {
      format: "DD-MM-YYYY HH:mm",
      sundayFirst: false,
    };
    let maxDate = moment(end).add(24, "hour");
    let pickersRender = (
      <div>
        <br />

        {this.renderPickerAutoApplySmartModeDisabled(
          ranges,
          local,
          maxDate,
          true
        )}
      </div>
    );
    let pickers;
    if (this.state.secondDisplay) {
      pickers = this.renderPickerAutoApplySmartModeDisabledSecondsIncluded(
        ranges,
        local,
        maxDate,
        true
      );
    } else if (this.state.timezoneDisplay) {
      pickers = this.renderTimezonePicker(ranges, local, maxDate);
    } else {
      pickers = pickersRender;
    }
    return <div className="container">{pickers}</div>;
  }
}

const mapDispatchToProps = {
  leadsFilterDate,
  datePickerState,
};
const mapStateToProps = (state) => {
  return { leadsFilter: state.leadsFilter };
};
export default connect(mapStateToProps, mapDispatchToProps)(AdvanceDatePicker);
