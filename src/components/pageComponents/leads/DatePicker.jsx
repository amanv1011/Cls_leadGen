import React from "react";
import DateRangePicker from "react-daterange-picker";
import "react-daterange-picker/dist/css/react-calendar.css";
import originalMoment from "moment";
import { extendMoment } from "moment-range";
import "./DatePicker.scss";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { leadsFilterDate } from "../../../redux/actions/leadsFilter";
import { connect } from "react-redux";
import { openDateModal, closeDateModal} from '../../../redux/actions/dateModalAction';

const moment = extendMoment(originalMoment);

class BasicDateRangePicker extends React.Component {
  constructor(props, context) {
    super(props, context);

    const today = moment();

    this.state = {
      isOpen: true,
      value: moment.range(today.clone().subtract(5, "days"), today.clone()),
    };
  }

  onSelect = (value, states) => {
    this.setState({ value, states });
  };

  applyDate = () => {
    this.props.leadsFilterDate(this.state.value);
    this.props.closeDateModal()
    
  }
  closeModal = () => {
    this.props.closeDateModal()
  }

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
            <Button onClick={this.closeModal}
              style={{
                fontFamily: "Segoe UI",
                textTransform: "none",
                height: "40px",
                width: "80px",
                fontWeight: "600",
                padding: "10px",
                borderRadius: "10px",
                marginLeft: "5px",
                backgroundColor: "#FFC65F",
                color: "white",
              }}
            >
              Cancel
            </Button>
            <Button onClick={this.applyDate}
              style={{
                fontFamily: "Segoe UI",
                textTransform: "none",
                height: "40px",
                width: "80px",
                fontWeight: "600",
                padding: "10px",
                borderRadius: "10px",
                marginLeft: "5px",
                backgroundColor: "#44A98B",
                color: "white",

              }}
            >
              Apply
            </Button>
          </Typography>

        </div>
      </>

    );
  }
}
const mapDispatchToProps = { leadsFilterDate , openDateModal , closeDateModal };
export default connect(null, mapDispatchToProps)(BasicDateRangePicker);
