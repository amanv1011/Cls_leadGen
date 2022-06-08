import React, { useState, useEffect } from "react";
// import LeadDescription from "../../commonComponents/leadDescription";
// import IButton from "../../themeComponents/button";
// import LeadsHeader from "../../themeComponents/header/leadsHeader/leadsHeader";
import "./leads.scss";
// import LeadsCheckbox from "./LeadsCheckbox";
// import LeadsDisplay from "./LeadsDisplay";
// import LeadsMenu from "./LeadsMenu";
// import LeadsSearch from "./LeadsSearch";
import { useSelector, useDispatch } from "react-redux";
// import { updateLeadStatus } from "../../../redux/actions/leadActions";
// import Lead from "../../commonComponents/lead";

const Leads2 = () => {
  //Onkar's Workspace
  // const [selectedLead, setselectedLead] = useState("");
  // //getting lead details on click of any lead
  // const LeadData = useSelector((state) => state.popupStatus.popupData[0]);
  // console.log(LeadData && LeadData.status && LeadData.status);

  // const approveButton = (event) => {
  //   dispatch(updateLeadStatus(selectedLead, 1));
  // };
  // const rejectButton = (event) => {
  //   dispatch(updateLeadStatus(selectedLead, -1));
  // };
  // const archieveButton = (event) => {
  //   dispatch(updateLeadStatus(selectedLead, 2));
  // };

  //Onkar's Workspace

  const dispatch = useDispatch();

  const leadsList = useSelector((state) => state.allLeads.leadsList);
  console.log("leadsList", leadsList);

  const [dataFromChild, setDataFromChild] = useState("");

  const dropDownFunc = (childData) => {
    setDataFromChild(childData);
    console.log("Child data: " + childData);
  };

  useEffect(() => {
    dropDownFunc("AllLeads");
  }, []);

  if (dataFromChild === "AllLeads") {
    console.log("AllLeads");
  }
  if (dataFromChild === "UnderReveiwLeads") {
    console.log("UnderReveiwLeads");
  }
  if (dataFromChild === "ApprovedLeads") {
    console.log("ApprovedLeads");
  }
  if (dataFromChild === "RejectedLeads") {
    console.log("RejectedLeads");
  }
  if (dataFromChild === "ArcheievdLeads") {
    console.log("ArcheievdLeads");
  }

  // return (
  //   <Box component="div" className="leads-container">
  //     <Box component={"div"} className="leads-header">
  //       <LeadsHeader />
  //     </Box>
  //     <Divider
  //       light={true}
  //       sx={{ height: "1px", background: "#1F4173", opacity: "0.15" }}
  //     />
  //     <Box component={"div"} className="leads-body">
  //       <Box component={"div"} className="section leads-list">
  //         <LeadsSearch />
  //         <Box component={"div"} className="section checkbox-menu">
  //           <LeadsCheckbox
  //             label={"All"}
  //             isChecked={isChecked}
  //             setIsChecked={setIsChecked}
  //             // onCheckboxChangeHandler={onCheckboxChangeHandler}
  //           />
  //           <LeadsMenu
  //             leadsList={leadsList}
  //             leadsAllCount={leadsAllCount}
  //             leadsAprrovedCount={leadsAprrovedCount}
  //             leadsUnderReviewCount={leadsUnderReviewCount}
  //             leadsRejectedCount={leadsRejectedCount}
  //             leadsArchievedCount={leadsArchievedCount}
  //             dropDownFunc={dropDownFunc}
  //           />
  //         </Box>
  //         <LeadsDisplay
  //           leadsList={leadsList}
  //           setselectedLead={setselectedLead}
  //         />
  //       </Box>
  //       <Box component={"div"} className="section leads-details">
  //         <LeadDescription
  //           leadsList={leadsList}
  //           setselectedLead={setselectedLead}
  //         />
  //       </Box>
  //       <Box component={"div"} className="section leads-actions">
  //         <Box component={"div"} className="action-title">
  //           Move To:
  //         </Box>
  //         <Box component={"div"} className="action-buttons">
  //           <IButton
  //             type={"green"}
  //             name={"Approve"}
  //             children="Approve"
  //             onclick={approveButton}
  //             disabled={
  //               LeadData && LeadData.status && LeadData.status === 1
  //                 ? true
  //                 : false
  //             }
  //           />
  //           <IButton
  //             type={"yellow"}
  //             name={"Archive"}
  //             children="Archive"
  //             onclick={archieveButton}
  //             disabled={
  //               LeadData && LeadData.status && LeadData.status === 2
  //                 ? true
  //                 : false
  //             }
  //           />
  //           <IButton
  //             type={"grey"}
  //             name={"Under Review"}
  //             children="Under Review"
  //             onclick={() => console.log("e")}
  //             disabled={true}
  //           />
  //           <IButton
  //             type={"pink"}
  //             name={"Reject"}
  //             children="Reject"
  //             disabled={
  //               LeadData && LeadData.status && LeadData.status === -1
  //                 ? true
  //                 : false
  //             }
  //             onclick={rejectButton}
  //           />
  //         </Box>
  //       </Box>
  //     </Box>
  //   </Box>
  // );
  return <h1>Hello</h1>;
};

export default Leads2;
