import React from "react";
import DateRangePicker from "react-daterange-picker";
import "react-daterange-picker/dist/css/react-calendar.css";
import originalMoment from "moment";
import { extendMoment } from "moment-range";
import "./DatePicker.scss";
import { leadsFilterDate } from "../../../redux/actions/leadsFilter";
import { connect } from "react-redux";
const moment = extendMoment(originalMoment);

class BasicDateRangePicker extends React.Component {
  constructor(props, context) {
    super(props, context);

    const today = moment();

    this.state = {
      isOpen: true,
      value: moment.range(today.clone().subtract(7, "days"), today.clone()),
    };
  }

  onSelect = (value, states) => {
    this.setState({ value, states });
    this.props.leadsFilterDate(value);
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
      <div>
        {this.state.isOpen && (
          <DateRangePicker
            value={this.state.value}
            onSelect={this.onSelect}
            singleDateRange={true}
          />
        )}
      </div>
    );
  }
}
const mapDispatchToProps = { leadsFilterDate };
export default connect(null, mapDispatchToProps)(BasicDateRangePicker);
