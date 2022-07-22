import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Lead from "../../commonComponents/lead";
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
import { getCountryAction } from "../../../redux/actions/countryActions";
import { ownerAndAssignedCampaigns } from "../../commonComponents/lead/filterLeads";
import { roles } from "../../../utils/constants";

const Leads = ({ userRole }) => {
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
  const assignedLeads = useSelector(
    (state) => state.getAssignedLeadsReducer.assignedLeads
  );
  useEffect(() => {
    dispatch(getAssignedLeadsAction());
    dispatch(getAllCampaignsAction());
    dispatch(getAllLeadsAction());
    dispatch(getLeadsFullDescriptionAction());
    dispatch(getCountryAction());
    dispatch(getAssignedCampaignsAction());
  }, []);

  useEffect(() => {
    if (roles && !roles.all.includes(userRole)) {
      const filteredCampaign = campaignList?.filter((ele) =>
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
  }, [campaignList, loggedInUser, assignedCampaigns, assignedLeads]);

  return (
    <React.Fragment>
      {/* {leadsDropDownFilter === "AllLeads" ? (
        <>
          <Lead campaign={campaign} {} />
        </>
      ) : leadsDropDownFilter === "ApprovedLeads" ? (
        <>
          <Leads campaign={campaign} />
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
      ) : null} */}
      <Lead
        campaign={campaign}
        option={leadsDropDownFilter}
        userRole={userRole}
        assignedCampaigns={assignedCampaigns}
        campaignList={campaignList}
        assignedLeads={assignedLeads}
      />
    </React.Fragment>
  );
};

export default Leads;
