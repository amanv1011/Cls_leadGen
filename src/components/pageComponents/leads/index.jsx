import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Lead from "../../commonComponents/lead";
import Approve from "../../commonComponents/lead/Approve";
import Reject from "../../commonComponents/lead/Reject";
import UnderReview from "../../commonComponents/lead/UnderReview";
import Archive from "../../commonComponents/lead/Archive";
import "./leads.scss";
import "../../pageComponents/leads2/leads.scss";
import {
  getAllLeadsAction,
  getAssignedLeadsAction,
  getLeadsFullDescriptionAction,
} from "../../../redux/actions/leadActions";
import {
  getAllCampaignsAction,
  getAssignedCampaignsAction,
} from "../../../redux/actions/campaignActions";
import { getAllUsersAction } from "../../../redux/actions/usersAction";
import { getCountryAction } from "../../../redux/actions/countryActions";
import { getlastCrawledDateAction } from "../../../redux/actions/lastCrawledDateActions";
import { set } from "firebase/database";

const Leads = () => {
  const dispatch = useDispatch();
  const [campaign, setCampaign] = useState([]);

  const leadsDropDownFilter = useSelector(
    (state) => state.leadsFilter.leadsDropDownFilter
  );
  const campaignList = useSelector((state) => state.allCampaigns.campaignList);
  const loggedInUser = useSelector(
    (state) => state.getLoggedInUserAction.loggedInUser
  );
  const assignedCampaigns = useSelector(
    (state) => state.allCampaigns.assignedCampaigns
  );
  useEffect(() => {
    dispatch(getAssignedLeadsAction());
    dispatch(getAllCampaignsAction());
    dispatch(getAllLeadsAction());
    dispatch(getLeadsFullDescriptionAction());
    dispatch(getCountryAction());
    dispatch(getAssignedCampaignsAction());
  }, []);
  console.log(assignedCampaigns);
  useEffect(() => {
    const user = 2;
    console.log(loggedInUser);
    if (user === 2) {
      const filteredCampaign = campaignList.filter((ele) =>
        ele.owner.includes(`${loggedInUser.first_name}`)
      );
      const arr = [];
      assignedCampaigns &&
        assignedCampaigns.forEach((campaign) => {
          if (
            campaign.userId.length &&
            campaign.userId.includes(loggedInUser.id)
          ) {
            arr.push(campaign.campaignId);
          }
        });
      const filtered = [];
      arr.forEach((assignedCampaign) => {
        campaignList.forEach((campaign) => {
          if (campaign.id === assignedCampaign) {
            filtered.push(campaign);
          }
        });
      });
      const xyz = filteredCampaign.concat(filtered);
      setCampaign(xyz);
    } else {
      setCampaign(campaignList);
    }
  }, [campaignList, loggedInUser, assignedCampaigns]);
  console.log({ campaign });
  return (
    <React.Fragment>
      {leadsDropDownFilter === "AllLeads" ? (
        <>
          <Lead campaign={campaign} />
        </>
      ) : leadsDropDownFilter === "ApprovedLeads" ? (
        <>
          <Approve campaign={campaign} />
        </>
      ) : leadsDropDownFilter === "RejectedLeads" ? (
        <>
          <Reject campaign={campaign} />
        </>
      ) : leadsDropDownFilter === "RejectedLeads" ? (
        <>
          <Reject campaign={campaign} />
        </>
      ) : leadsDropDownFilter === "UnderReveiwLeads" ? (
        <>
          <UnderReview campaign={campaign} />
        </>
      ) : leadsDropDownFilter === "ArcheievdLeads" ? (
        <>
          <Archive campaign={campaign} />
        </>
      ) : null}
    </React.Fragment>
  );
};

export default Leads;
