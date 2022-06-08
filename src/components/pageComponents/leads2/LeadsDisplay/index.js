import React, { useState, useEffect } from "react";
import LeadsCheckbox from "../LeadsCheckbox";
import "./leadsDisplay.scss";
import { useDispatch } from "react-redux";
import { getPopupEnable } from "../../../../redux/actions/PopupAction";
import LeadsMenu from "../LeadsMenu";

const LeadsDisplay = ({ leadsList, selectedLeadIdFun, selectedLeadId }) => {
  const dispatch = useDispatch();

  const [leadsListData, setLeadsListData] = useState([]);
  const [selectedArray, setselectedArray] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setLeadsListData(leadsList);
  }, [leadsList]);

  const handleClick = (leadId) => {
    let leadsIdData = leadsList.filter((ele) => ele.id === leadId);
    selectedLeadIdFun(leadsIdData[0].id);
    dispatch(getPopupEnable(leadsIdData));
  };

  const handleOnCheckboxChange = (event) => {
    if (event.target.checked) {
      setselectedArray([...selectedArray, event.target.value]);
    } else {
      const filtered = selectedArray.filter(
        (item) => item != event.target.value
      );
      setselectedArray(filtered);
    }
    // event.target.checked = true;
    // const { name, checked } = event.target;
    // if (name === "allCheck")
    //   let tempLeadsArray = leadsListData.map((lead) => ({
    //     ...lead,
    //     isChecked: checked,
    //   }));
    //   setLeadsListData(tempLeadsArray);
    // } else {
    //   let tempLeadsArray = leadsListData.map((lead) =>
    //     lead.id === name ? { ...lead, isChecked: checked } : lead
    //   );
    //   setLeadsListData(tempLeadsArray);
    // }
  };
  console.log(selectedArray);
  const handleAllCheck = (e) => {
    setIsChecked(!isChecked);
    if (e.target.checked) {
      let arr = [];
      leadsList.forEach((element) => {
        arr.push(element.id);
      });
      setselectedArray(arr);
    } else {
      setselectedArray([]);
    }
  };
  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <input
            type="checkbox"
            name="allCheck"
            // checked={
            //   leadsListData.filter((lead) => lead?.isChecked !== true).length <
            //   1
            // }
            checked={isChecked}
            onChange={handleAllCheck}
          />
          <label>All</label>
        </div>
        <LeadsMenu />
      </div>
      <div className="lead-display-container">
        {leadsList &&
          leadsList.map((lead) => (
            <div
              className={`lead-display-subcontainers ${
                selectedLeadId === lead.id ? "selected" : ""
              } `}
              onClick={() => handleClick(lead.id)}
              key={lead.id}
            >
              <div className="lead-display-check">
                {/* <LeadsCheckbox /> */}
                <input
                  type="checkbox"
                  name={lead.id}
                  value={lead.id}
                  checked={
                    selectedArray &&
                    selectedArray.filter((it) => it === lead.id).length > 0
                      ? true
                      : false
                  }
                  onChange={handleOnCheckboxChange}
                />
              </div>
              <div
                className={`lead-display-subcontainer1 ${
                  selectedLeadId === lead.id ? "selected" : ""
                }`}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    className={`lead-display-btn-textl ${
                      selectedLeadId === lead.id ? "selected" : ""
                    }`}
                  >
                    {lead.title.slice(0, 15)}
                  </span>
                  <span
                    className={`lead-display-timestamp ${
                      selectedLeadId === lead.id ? "selected-sub" : ""
                    } `}
                  >
                    3 Sec ago
                  </span>
                </div>

                <div
                  className={`lead-display-subcontainer2 ${
                    selectedLeadId === lead.id ? "selected-sub" : ""
                  }`}
                >
                  <p>{lead.companyName === null ? "NA" : lead.companyName}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </React.Fragment>
  );
};

export default LeadsDisplay;
