import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import { Popover } from "@mui/material";
import * as campaignActions from "../../../../redux/actions/campaignActions";
import { openAlertAction } from "../../../../redux/actions/alertActions";
import DownArrow from "../../../../assets/jsxIcon/DownArrow";
import * as commonFunctions from "../commonFunctions";
import * as leadsFilterActions from "../../../../redux/actions/leadsFilter";
import { Link } from "react-router-dom";
import CampaignPopup from "../../../themeComponents/popup/CampaignPopup";
import ActivePopUp from "../../../themeComponents/popup/CampaignPopup/ActivePopUp";
import DeActivatePopUp from "../../../themeComponents/popup/CampaignPopup/DeActivatePopUp";
import CampaignMenu from "../CampaignMenu";
import * as campaignCountActions from "../../../../redux/actions/campaignCountActions";
import AssignPopUp from "../../../themeComponents/popup/CampaignPopup/AssignPopUp";
import "./campaignDisplay.scss";

const CampaignDisplay = ({
  campaignsListData,
  campaignsList,
  setCampaignsListData,
  campgaignId,
  searchedCampaignList,
  campaignLoader,
  campaignDocument,
  leadsList,
  countryFilterValue,
  ownerFilterValue,
  campaignStateFilterValue,
  options,
  assignedCampaigns,
  campaignViewStatus,
  selectedArray,
  setselectedArray,
  allCamapignsCount,
  activeCamapignsCount,
  inActiveCamapignsCount,
  searchValue,
}) => {
  const dispatch = useDispatch();

  const [isChecked, setIsChecked] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openCampaignPopup, setOpenCampaignPopup] = useState(false);
  const [disableApplyBtn, setDisableApplyBtn] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [openCampaignPopupActive, setOpenCampaignPopupActive] = useState(false);
  const [openCampaignPopupDeActivate, setOpenCampaignPopupDeActivate] =
    useState(false);
  const [openAssignModel, setOpenAssignModel] = useState(false);

  const ownerNameFilterId = options.filter(
    (user) => user.name === ownerFilterValue
  );

  useEffect(() => {
    campaignsListData.length !== 0 &&
      dispatch(campaignActions.getACampaignAction(campaignsListData[0].id));
  }, [campaignsListData]);

  const keysInJSON = ["name", "location", "owner"];

  const searchingTable = (searchTerm) => {
    const lowerCasedValue = searchTerm.toLowerCase().trim();
    let filteredDataArray = campaignsList.filter((item) => {
      return keysInJSON.some((key) =>
        item[key].toString().toLowerCase().includes(lowerCasedValue)
      );
    });
    return filteredDataArray;
  };

  useEffect(() => {
    if (
      countryFilterValue === "Country" &&
      ownerFilterValue === "Owner" &&
      searchValue === ""
    ) {
      dispatch(campaignCountActions.getAllCampaignsCountAction(campaignsList));
      dispatch(
        campaignCountActions.getActiveCampaignsCountAction(
          campaignsList.filter((campaign) => campaign?.status === 1)
        )
      );
      dispatch(
        campaignCountActions.getInActiveCampaignsCountAction(
          campaignsList.filter((campaign) => campaign?.status === 0)
        )
      );
      if (campaignStateFilterValue === "AllCampaigns") {
        setCampaignsListData(campaignsList);
      }
      if (campaignStateFilterValue === "activeCampaigns") {
        const activeCampaigns = campaignsList.filter(
          (campaign) => campaign?.status === 1
        );
        setCampaignsListData(activeCampaigns);
      }
      if (campaignStateFilterValue === "inActiveCampaigns") {
        const inActiveCampaigns = campaignsList.filter(
          (campaign) => campaign?.status === 0
        );
        setCampaignsListData(inActiveCampaigns);
      }
    } else if (
      countryFilterValue !== "Country" &&
      ownerFilterValue === "Owner" &&
      searchValue === ""
    ) {
      const filteredCampaigns = campaignsList.filter(
        (campaign) => campaign?.country === countryFilterValue
      );

      dispatch(
        campaignCountActions.getAllCampaignsCountAction(filteredCampaigns)
      );
      dispatch(
        campaignCountActions.getActiveCampaignsCountAction(
          filteredCampaigns.filter((campaign) => campaign?.status === 1)
        )
      );
      dispatch(
        campaignCountActions.getInActiveCampaignsCountAction(
          filteredCampaigns.filter((campaign) => campaign?.status === 0)
        )
      );
      if (campaignStateFilterValue === "AllCampaigns") {
        setCampaignsListData(filteredCampaigns);
      } else if (campaignStateFilterValue === "activeCampaigns") {
        const activeCampaigns = filteredCampaigns.filter(
          (campaign) => campaign?.status === 1
        );
        setCampaignsListData(activeCampaigns);
      } else if (campaignStateFilterValue === "inActiveCampaigns") {
        const inActiveCampaigns = filteredCampaigns.filter(
          (campaign) => campaign?.status === 0
        );
        setCampaignsListData(inActiveCampaigns);
      }
    } else if (
      countryFilterValue !== "Country" &&
      ownerFilterValue !== "Owner" &&
      searchValue === ""
    ) {
      const filteredCampaigns = campaignsList.filter(
        (campaign) =>
          campaign?.country === countryFilterValue &&
          campaign?.owner === ownerFilterValue
      );
      dispatch(
        campaignCountActions.getAllCampaignsCountAction(filteredCampaigns)
      );
      dispatch(
        campaignCountActions.getActiveCampaignsCountAction(
          filteredCampaigns.filter((campaign) => campaign?.status === 1)
        )
      );
      dispatch(
        campaignCountActions.getInActiveCampaignsCountAction(
          filteredCampaigns.filter((campaign) => campaign?.status === 0)
        )
      );
      if (campaignStateFilterValue === "AllCampaigns") {
        setCampaignsListData(filteredCampaigns);
      } else if (campaignStateFilterValue === "activeCampaigns") {
        const activeCampaigns = filteredCampaigns.filter(
          (campaign) => campaign?.status === 1
        );
        setCampaignsListData(activeCampaigns);
      } else if (campaignStateFilterValue === "inActiveCampaigns") {
        const inActiveCampaigns = filteredCampaigns.filter(
          (campaign) => campaign?.status === 0
        );
        setCampaignsListData(inActiveCampaigns);
      }
    } else if (
      countryFilterValue !== "Country" &&
      ownerFilterValue !== "Owner" &&
      searchValue !== ""
    ) {
      const searchCampaigns = searchingTable(searchValue);

      const filteredCampaigns = searchCampaigns.filter(
        (campaign) =>
          campaign &&
          campaign?.country === countryFilterValue &&
          campaign?.owner === ownerFilterValue
      );
      dispatch(
        campaignCountActions.getAllCampaignsCountAction(filteredCampaigns)
      );
      dispatch(
        campaignCountActions.getActiveCampaignsCountAction(
          filteredCampaigns.filter((campaign) => campaign?.status === 1)
        )
      );
      dispatch(
        campaignCountActions.getInActiveCampaignsCountAction(
          filteredCampaigns.filter((campaign) => campaign?.status === 0)
        )
      );

      if (campaignStateFilterValue === "AllCampaigns") {
        setCampaignsListData(filteredCampaigns);
      } else if (campaignStateFilterValue === "activeCampaigns") {
        const activeCampaigns = filteredCampaigns.filter(
          (campaign) => campaign?.status === 1
        );
        setCampaignsListData(activeCampaigns);
      } else if (campaignStateFilterValue === "inActiveCampaigns") {
        const inActiveCampaigns = filteredCampaigns.filter(
          (campaign) => campaign?.status === 0
        );
        setCampaignsListData(inActiveCampaigns);
      }
    } else if (
      countryFilterValue === "Country" &&
      ownerFilterValue !== "Owner" &&
      searchValue === ""
    ) {
      const filteredCampaigns = campaignsList.filter(
        (campaign) => campaign && campaign?.owner === ownerFilterValue
      );
      dispatch(
        campaignCountActions.getAllCampaignsCountAction(filteredCampaigns)
      );
      dispatch(
        campaignCountActions.getActiveCampaignsCountAction(
          filteredCampaigns.filter((campaign) => campaign?.status === 1)
        )
      );
      dispatch(
        campaignCountActions.getInActiveCampaignsCountAction(
          filteredCampaigns.filter((campaign) => campaign?.status === 0)
        )
      );

      if (campaignStateFilterValue === "AllCampaigns") {
        setCampaignsListData(filteredCampaigns);
      } else if (campaignStateFilterValue === "activeCampaigns") {
        const activeCampaigns = filteredCampaigns.filter(
          (campaign) => campaign?.status === 1
        );
        setCampaignsListData(activeCampaigns);
      } else if (campaignStateFilterValue === "inActiveCampaigns") {
        const inActiveCampaigns = filteredCampaigns.filter(
          (campaign) => campaign?.status === 0
        );
        setCampaignsListData(inActiveCampaigns);
      }
    } else if (
      countryFilterValue === "Country" &&
      ownerFilterValue === "Owner" &&
      searchValue !== ""
    ) {
      const lowerCasedValue = searchValue.toLowerCase().trim();

      if (lowerCasedValue === "") {
        setCampaignsListData(campaignsList);
        dispatch(campaignActions.getSearchedCampaignList(campaignsList));
        dispatch(
          campaignCountActions.getAllCampaignsCountAction(campaignsList)
        );
        dispatch(
          campaignCountActions.getActiveCampaignsCountAction(
            campaignsList.filter((campaign) => campaign?.status === 1)
          )
        );
        dispatch(
          campaignCountActions.getInActiveCampaignsCountAction(
            campaignsList.filter((campaign) => campaign?.status === 0)
          )
        );
      } else {
        const filteredData = campaignsList.filter((item) => {
          return keysInJSON.some((key) =>
            item[key].toString().toLowerCase().includes(lowerCasedValue)
          );
        });
        setCampaignsListData(filteredData);
        dispatch(campaignCountActions.getAllCampaignsCountAction(filteredData));
        dispatch(
          campaignCountActions.getActiveCampaignsCountAction(
            filteredData.filter((campaign) => campaign?.status === 1)
          )
        );
        dispatch(
          campaignCountActions.getInActiveCampaignsCountAction(
            filteredData.filter((campaign) => campaign?.status === 0)
          )
        );
        dispatch(campaignActions.getSearchedCampaignList(filteredData));
        if (campaignStateFilterValue === "AllCampaigns") {
          setCampaignsListData(filteredData);
        } else if (campaignStateFilterValue === "activeCampaigns") {
          const activeCampaigns = filteredData.filter(
            (campaign) => campaign?.status === 1
          );
          setCampaignsListData(activeCampaigns);
        } else if (campaignStateFilterValue === "inActiveCampaigns") {
          const inActiveCampaigns = filteredData.filter(
            (campaign) => campaign?.status === 0
          );
          setCampaignsListData(inActiveCampaigns);
        }
      }

      // const filteredCampaigns = campaignsList.filter(
      //   (campaign) =>
      //     campaign?.country === countryFilterValue &&
      //     campaign?.owner === ownerFilterValue
      // );
      // dispatch(
      //   campaignCountActions.getAllCampaignsCountAction(filteredCampaigns)
      // );
      // dispatch(
      //   campaignCountActions.getActiveCampaignsCountAction(
      //     filteredCampaigns.filter((campaign) => campaign?.status === 1)
      //   )
      // );
      // dispatch(
      //   campaignCountActions.getInActiveCampaignsCountAction(
      //     filteredCampaigns.filter((campaign) => campaign?.status === 0)
      //   )
      // );
    } else if (
      countryFilterValue === "Country" &&
      ownerFilterValue !== "Owner" &&
      searchValue !== ""
    ) {
      const searchCampaigns = searchingTable(searchValue);

      const filteredCampaigns = searchCampaigns.filter(
        (campaign) => campaign && campaign?.owner === ownerFilterValue
      );
      dispatch(
        campaignCountActions.getAllCampaignsCountAction(filteredCampaigns)
      );
      dispatch(
        campaignCountActions.getActiveCampaignsCountAction(
          filteredCampaigns.filter((campaign) => campaign?.status === 1)
        )
      );
      dispatch(
        campaignCountActions.getInActiveCampaignsCountAction(
          filteredCampaigns.filter((campaign) => campaign?.status === 0)
        )
      );

      if (campaignStateFilterValue === "AllCampaigns") {
        setCampaignsListData(filteredCampaigns);
      } else if (campaignStateFilterValue === "activeCampaigns") {
        const activeCampaigns = filteredCampaigns.filter(
          (campaign) => campaign?.status === 1
        );
        setCampaignsListData(activeCampaigns);
      } else if (campaignStateFilterValue === "inActiveCampaigns") {
        const inActiveCampaigns = filteredCampaigns.filter(
          (campaign) => campaign?.status === 0
        );
        setCampaignsListData(inActiveCampaigns);
      }
    } else if (
      countryFilterValue !== "Country" &&
      ownerFilterValue === "Owner" &&
      searchValue !== ""
    ) {
      const searchCampaigns = searchingTable(searchValue);

      const filteredCampaigns = searchCampaigns.filter(
        (campaign) => campaign?.country === countryFilterValue
      );
      dispatch(
        campaignCountActions.getAllCampaignsCountAction(filteredCampaigns)
      );
      dispatch(
        campaignCountActions.getActiveCampaignsCountAction(
          filteredCampaigns.filter((campaign) => campaign?.status === 1)
        )
      );
      dispatch(
        campaignCountActions.getInActiveCampaignsCountAction(
          filteredCampaigns.filter((campaign) => campaign?.status === 0)
        )
      );

      if (campaignStateFilterValue === "AllCampaigns") {
        setCampaignsListData(filteredCampaigns);
      } else if (campaignStateFilterValue === "activeCampaigns") {
        const activeCampaigns = filteredCampaigns.filter(
          (campaign) => campaign?.status === 1
        );
        setCampaignsListData(activeCampaigns);
      } else if (campaignStateFilterValue === "inActiveCampaigns") {
        const inActiveCampaigns = filteredCampaigns.filter(
          (campaign) => campaign?.status === 0
        );
        setCampaignsListData(inActiveCampaigns);
      }
    }

    if (
      countryFilterValue === "Country" &&
      ownerNameFilterId.length > 0 &&
      searchValue === ""
    ) {
      const arr = [];
      assignedCampaigns &&
        ownerNameFilterId &&
        assignedCampaigns.forEach((campaign) => {
          if (campaign.userId.includes(ownerNameFilterId[0]?.userId)) {
            arr.push(campaign.campaignId);
          }
        });
      const filtered = [];
      arr.forEach((assignedCampaign) => {
        campaignsList.forEach((campaign) => {
          if (campaign.id === assignedCampaign) {
            filtered.push(campaign);
          }
        });
      });
      dispatch(campaignCountActions.getAllCampaignsCountAction(filtered));
      dispatch(
        campaignCountActions.getActiveCampaignsCountAction(
          filtered.filter((campaign) => campaign?.status === 1)
        )
      );
      dispatch(
        campaignCountActions.getInActiveCampaignsCountAction(
          filtered.filter((campaign) => campaign?.status === 0)
        )
      );
      if (campaignStateFilterValue === "AllCampaigns") {
        setCampaignsListData(filtered);
      } else if (campaignStateFilterValue === "activeCampaigns") {
        const activeCampaigns = filtered.filter(
          (campaign) => campaign?.status === 1
        );
        setCampaignsListData(activeCampaigns);
      } else if (campaignStateFilterValue === "inActiveCampaigns") {
        const inActiveCampaigns = filtered.filter(
          (campaign) => campaign?.status === 0
        );
        setCampaignsListData(inActiveCampaigns);
      }
    }

    if (countryFilterValue !== "Country" && ownerNameFilterId.length > 0) {
      const arr = [];
      assignedCampaigns &&
        ownerNameFilterId &&
        assignedCampaigns.forEach((campaign) => {
          if (campaign.userId.includes(ownerNameFilterId[0]?.userId)) {
            arr.push(campaign.campaignId);
          }
        });
      const filtered = [];
      arr.forEach((assignedCampaign) => {
        campaignsList.forEach((campaign) => {
          if (campaign.id === assignedCampaign) {
            filtered.push(campaign);
          }
        });
      });
      const finalFiltered = filtered.filter(
        (campaign) => campaign?.country === countryFilterValue
      );
      dispatch(campaignCountActions.getAllCampaignsCountAction(finalFiltered));
      dispatch(
        campaignCountActions.getActiveCampaignsCountAction(
          finalFiltered.filter((campaign) => campaign?.status === 1)
        )
      );
      dispatch(
        campaignCountActions.getInActiveCampaignsCountAction(
          finalFiltered.filter((campaign) => campaign?.status === 0)
        )
      );
      if (campaignStateFilterValue === "AllCampaigns") {
        setCampaignsListData(finalFiltered);
      } else if (campaignStateFilterValue === "activeCampaigns") {
        const activeCampaigns = finalFiltered.filter(
          (campaign) => campaign?.status === 1
        );
        setCampaignsListData(activeCampaigns);
      } else if (campaignStateFilterValue === "inActiveCampaigns") {
        const inActiveCampaigns = finalFiltered.filter(
          (campaign) => campaign?.status === 0
        );
        setCampaignsListData(inActiveCampaigns);
      }
    }
    if (
      countryFilterValue === "Country" &&
      ownerNameFilterId.length > 0 &&
      searchValue !== ""
    ) {
      const searchCampaigns = searchingTable(searchValue);
      const arr = [];
      assignedCampaigns &&
        ownerNameFilterId &&
        assignedCampaigns.forEach((campaign) => {
          if (campaign.userId.includes(ownerNameFilterId[0]?.userId)) {
            arr.push(campaign.campaignId);
          }
        });
      const filtered = [];
      arr.forEach((assignedCampaign) => {
        searchCampaigns.forEach((campaign) => {
          if (campaign.id === assignedCampaign) {
            filtered.push(campaign);
          }
        });
      });
      dispatch(campaignCountActions.getAllCampaignsCountAction(filtered));
      dispatch(
        campaignCountActions.getActiveCampaignsCountAction(
          filtered.filter((campaign) => campaign?.status === 1)
        )
      );
      dispatch(
        campaignCountActions.getInActiveCampaignsCountAction(
          filtered.filter((campaign) => campaign?.status === 0)
        )
      );
      if (campaignStateFilterValue === "AllCampaigns") {
        setCampaignsListData(filtered);
      } else if (campaignStateFilterValue === "activeCampaigns") {
        const activeCampaigns = filtered.filter(
          (campaign) => campaign?.status === 1
        );
        setCampaignsListData(activeCampaigns);
      } else if (campaignStateFilterValue === "inActiveCampaigns") {
        const inActiveCampaigns = filtered.filter(
          (campaign) => campaign?.status === 0
        );
        setCampaignsListData(inActiveCampaigns);
      }
    }
    if (
      countryFilterValue !== "Country" &&
      ownerNameFilterId.length > 0 &&
      searchValue !== ""
    ) {
      const searchCampaigns = searchingTable(searchValue);

      const filteredCampaigns = searchCampaigns.filter(
        (campaign) => campaign?.country === countryFilterValue
      );
      const arr = [];
      assignedCampaigns &&
        ownerNameFilterId &&
        assignedCampaigns.forEach((campaign) => {
          if (campaign.userId.includes(ownerNameFilterId[0]?.userId)) {
            arr.push(campaign.campaignId);
          }
        });
      const filtered = [];
      arr.forEach((assignedCampaign) => {
        filteredCampaigns.forEach((campaign) => {
          if (campaign.id === assignedCampaign) {
            filtered.push(campaign);
          }
        });
      });
      dispatch(campaignCountActions.getAllCampaignsCountAction(filtered));
      dispatch(
        campaignCountActions.getActiveCampaignsCountAction(
          filtered.filter((campaign) => campaign?.status === 1)
        )
      );
      dispatch(
        campaignCountActions.getInActiveCampaignsCountAction(
          filtered.filter((campaign) => campaign?.status === 0)
        )
      );
      if (campaignStateFilterValue === "AllCampaigns") {
        setCampaignsListData(filtered);
      } else if (campaignStateFilterValue === "activeCampaigns") {
        const activeCampaigns = filtered.filter(
          (campaign) => campaign?.status === 1
        );
        setCampaignsListData(activeCampaigns);
      } else if (campaignStateFilterValue === "inActiveCampaigns") {
        const inActiveCampaigns = filtered.filter(
          (campaign) => campaign?.status === 0
        );
        setCampaignsListData(inActiveCampaigns);
      }
    }
  }, [
    searchValue,
    countryFilterValue,
    ownerFilterValue,
    campaignStateFilterValue,
  ]);

  const getNumOfLeads = (id) => {
    const val = leadsList.filter((valID) => {
      return valID.campaignId === id;
    });
    return val.length;
  };

  const Viewed = async (campaignListItemId) => {
    try {
      await dispatch(campaignActions.getACampaignAction(campaignListItemId));
    } catch (error) {
      dispatch(openAlertAction(`${error.message}`, true, "error"));
    }
  };

  const handlePopClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleOnCheckboxChange = (event) => {
    if (event.target.checked) {
      setselectedArray([...selectedArray, event.target.value]);
    } else {
      const filtered = selectedArray.filter(
        (item) => item !== event.target.value
      );
      setselectedArray(filtered);
    }
  };

  const handleAllCheck = (e) => {
    setIsChecked(!isChecked);
    if (e.target.checked) {
      let arr = [];
      campaignsListData.forEach((element) => {
        arr.push(element.id);
      });
      setselectedArray(arr);
    } else {
      setselectedArray([]);
    }
  };

  // To download selected campaigns
  const downloadSelectedCampaigns = () => {
    // handleClickOpenCampaignPopup();
    const filteredcampaignsForDownload = campaignsListData.filter((campaign) =>
      selectedArray.find((item) => campaign.id === item)
    );
    let updatedcampaignListDataToDownload = [];

    filteredcampaignsForDownload.forEach((campaign) => {
      let sourceType = "";

      if (campaign.source === "seek_aus") {
        sourceType = "Seek Australia";
      } else if (campaign.source === "indeed_aus") {
        sourceType = "Indeed Australia";
      } else if (campaign.source === "indeed_ca") {
        sourceType = "Indeed Canada";
      } else if (campaign.source === "indeed_uk") {
        sourceType = "Indeed United";
      } else if (campaign.source === "indeed_il") {
        sourceType = "Indeed Italy";
      } else if (campaign.source === "indeed_ae") {
        sourceType = "Indeed UAE";
      } else if (campaign.source === "indeed_fi") {
        sourceType = "Indeed Finland";
      } else if (campaign.source === "indeed_ch") {
        sourceType = "Indeed China";
      } else if (campaign.source === "indeed_pt") {
        sourceType = "Indeed Portugal";
      } else if (campaign.source === "indeed_sg") {
        sourceType = "Indeed Singapore";
      } else {
        sourceType = "LinkedIn";
      }

      let campaignListDataToDownload = {
        "Campaign Name": campaign.name,
        Location: campaign.location,
        "Start Date": moment
          .unix(campaign.start_date.seconds, campaign.start_date.nanoseconds)
          .format("MM/DD/YYYY"),
        "Start Time": moment(campaign.start_time, ["HH:mm"]).format("hh:mm A"),
        "End Date": moment
          .unix(campaign.end_date.seconds, campaign.end_date.nanoseconds)
          .format("MM/DD/YYYY"),
        "End Time": moment(campaign.end_time, ["HH:mm"]).format("hh:mm A"),
        "Number of times the campign runs per day": campaign.frequency,
        "Number of leads generated": getNumOfLeads(campaign.id),
        "Campaign created by": campaign.owner,
        "Source of the campaign": sourceType,
        "Status of the campaign":
          campaign.status && campaign.status === 1 ? "Active" : "In-Active",
        Tags: campaign.tags.toString(),
      };
      updatedcampaignListDataToDownload = [
        ...updatedcampaignListDataToDownload,
        campaignListDataToDownload,
      ];
    });
    commonFunctions.downloadInExcel(
      updatedcampaignListDataToDownload,
      "List of Campigns"
    );
  };

  const handleClickOpenCampaignPopup = () => {
    setOpenCampaignPopup(true);
  };
  const handleCloseCampaignPopup = () => {
    setOpenCampaignPopup(false);
  };
  const handleClickOpenCampaignPopupActive = () => {
    setOpenCampaignPopupActive(true);
  };
  const handleCloseCampaignPopupActive = () => {
    setOpenCampaignPopupActive(false);
  };
  const handleClickOpenCampaignPopupDeActivate = () => {
    setOpenCampaignPopupDeActivate(true);
  };
  const handleCloseCampaignPopupDeActivate = () => {
    setOpenCampaignPopupDeActivate(false);
  };

  const onDeleteMulitpleCampaign = () => {
    handleClickOpenCampaignPopup();

    selectedArray.map((selectedCampaign) => {
      if (getNumOfLeads(selectedCampaign)) {
        setDisableApplyBtn(true);
        return;
      } else {
        setDisableApplyBtn(false);
        return;
      }
    });
  };

  const onAssignMulitpleCampaign = () => {
    setOpenAssignModel(true);
  };

  const assignBatchUsers = async (e, option) => {
    setSelectedUsers(option);
    if (selectedArray.length > 0 && selectedUsers.length > 0) {
      let arr = [];
      option &&
        option.forEach((e) => {
          arr.push(e.userId);
        });

      await dispatch(
        campaignActions.assignCampaignToUsersAction(selectedArray, arr)
      );
      await dispatch(campaignActions.getAssignedCampaignsAction());
    }
  };

  const onActivateMulitpleCampaign = () => {
    handleClickOpenCampaignPopupActive();
  };

  const onDeActivateMulitpleCampaign = () => {
    handleClickOpenCampaignPopupDeActivate();
  };

  useEffect(() => {
    campaignViewStatus &&
      campaignsListData &&
      campaignsListData.forEach((e) => {
        if (e.id === campaignViewStatus.campaignId) {
          e.campaignSeen = campaignViewStatus.campaignSeen;
        }
      });
  }, [campaignViewStatus]);

  const campaignViewUpdate = (campgaignId) => {
    let campaignIdData = campaignsListData.filter(
      (campaign) => campaign.id === campgaignId
    );
    if (
      (campaignIdData[0] && campaignIdData[0].campaignSeen !== true) ||
      undefined
    ) {
      dispatch(campaignActions.updateCampaignViewStatusAction(campgaignId));
    }
  };

  if (
    campaignLoader === false &&
    campaignsListData &&
    campaignsListData.length === 0
  ) {
    return (
      <React.Fragment>
        <div className="campaign-checkbox-menu-container">
          <div className="campaign-checkbox-container">
            <input type="checkbox" disabled={true} />
            <label className="all-label">All</label>
          </div>
          <CampaignMenu
            campgaignId={campgaignId}
            campaignStateFilterValue={campaignStateFilterValue}
            allCamapignsCount={allCamapignsCount}
            activeCamapignsCount={activeCamapignsCount}
            inActiveCamapignsCount={inActiveCamapignsCount}
          />
        </div>
        <div className="campaign-display-container">
          <div className="campaign-display-subcontainers">
            <div className="campaign-display-subcontainer1">
              <div className="display-count">
                <div className="campaign-display-btn-text searched-campaign-empty">
                  Campaign(s) not found
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <div className="campaign-checkbox-menu-container">
          <div className="campaign-checkbox-menu-container">
            <div className="campaign-checkbox-container">
              <div>
                <input
                  type="checkbox"
                  name="allCheck"
                  checked={
                    selectedArray.length !== campaignsListData.length
                      ? false
                      : true
                  }
                  onChange={handleAllCheck}
                  className="campaign-checkbox"
                  disabled={campgaignId ? true : false}
                  style={
                    campgaignId
                      ? {
                          pointerEvents: "auto",
                          cursor: "not-allowed",
                        }
                      : {}
                  }
                />
              </div>
              {selectedArray.length === 0 ? (
                <label className="all-label">All</label>
              ) : (
                <div
                  className="campaign-display-actions"
                  onClick={handlePopClick}
                >
                  Action
                  <DownArrow />
                </div>
              )}
            </div>
            <CampaignMenu
              campgaignId={campgaignId}
              campaignStateFilterValue={campaignStateFilterValue}
              allCamapignsCount={allCamapignsCount}
              activeCamapignsCount={activeCamapignsCount}
              inActiveCamapignsCount={inActiveCamapignsCount}
            />
          </div>

          <div>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              PaperProps={{
                boxshadow: "0px 6px 10px rgba(180, 180, 180, 0.35)",
                borderRadius: "10px",
              }}
            >
              <div className="popover-body-campaign">
                <button
                  className="campaign-btn download-btn"
                  onClick={downloadSelectedCampaigns}
                >
                  <span className="campaign-btn-text">Download</span>
                </button>

                <button
                  className="campaign-btn delete-btn"
                  onClick={onDeleteMulitpleCampaign}
                >
                  <span className="campaign-btn-text">Delete</span>
                </button>
                <button
                  className="campaign-btn assign-btn"
                  onClick={onAssignMulitpleCampaign}
                >
                  <span className="campaign-btn-text">Assign</span>
                </button>
                <button
                  className="campaign-btn activate-btn"
                  onClick={onActivateMulitpleCampaign}
                >
                  <span className="campaign-btn-text">Activate</span>
                </button>
                <button
                  className="campaign-btn deActivate-btn"
                  onClick={onDeActivateMulitpleCampaign}
                >
                  <span className="campaign-btn-text ">De-Activate</span>
                </button>
              </div>
            </Popover>
          </div>
        </div>
        <div className="campaign-display-container">
          {campaignsListData.length !== 0 &&
            campaignsListData.map((campaign) => (
              <button
                key={campaign.id}
                onClick={(event) => {
                  Viewed(campaign.id);
                  campaignViewUpdate(campaign.id);
                }}
                disabled={campgaignId ? true : false}
                style={
                  campgaignId
                    ? {
                        pointerEvents: "auto",
                        cursor: "not-allowed",
                      }
                    : {}
                }
                className={`campaign-display-subcontainers ${
                  campaignDocument.id === campaign.id ? "selected" : ""
                } ${campaign?.campaignSeen === true ? "campaign-seen" : ""}`}
              >
                <div className="campaign-display-check">
                  <input
                    type="checkbox"
                    name={campaign.id}
                    value={campaign.id}
                    checked={
                      selectedArray &&
                      selectedArray.filter((it) => it === campaign.id).length >
                        0
                        ? true
                        : false
                    }
                    onChange={handleOnCheckboxChange}
                    disabled={campgaignId ? true : false}
                    style={
                      campgaignId
                        ? {
                            pointerEvents: "auto",
                            cursor: "not-allowed",
                          }
                        : {}
                    }
                  />
                </div>
                <div
                  className={`campaign-display-subcontainer1 ${
                    campaignDocument.id === campaign.id ? "selected" : ""
                  }`}
                >
                  <div className="display-count">
                    <div
                      className={`campaign-display-btn-text ${
                        campaignDocument.id === campaign.id ? "selected" : ""
                      } ${
                        campaign?.campaignSeen === true ? "campaign-seen" : ""
                      }`}
                    >
                      {campaign.name}
                    </div>
                    <div
                      onClick={() => {
                        if (getNumOfLeads(campaign.id)) {
                          dispatch(
                            leadsFilterActions.leadsFilterCampaignName(
                              campaign.name
                            )
                          );
                          dispatch(
                            leadsFilterActions.leadsFilterOwnerName(
                              campaign.owner
                            )
                          );
                        } else {
                          dispatch(
                            leadsFilterActions.leadsFilterCampaignName(
                              "All Campaigns"
                            )
                          );
                          dispatch(
                            leadsFilterActions.leadsFilterOwnerName(
                              "All Owners"
                            )
                          );
                        }
                      }}
                    >
                      <Link
                        to={getNumOfLeads(campaign.id) ? "/leads" : false}
                        style={
                          getNumOfLeads(campaign.id) === 0
                            ? {
                                pointerEvents: "auto",
                                cursor: "not-allowed",
                                color: "var(--rs-text-link)",
                                textDecoration: "none",
                                fontSize: "12px",
                              }
                            : {}
                        }
                      >
                        <span
                          className={`${
                            campaign?.campaignSeen === true
                              ? "campaign-seen"
                              : ""
                          } ${
                            campaignDocument.id === campaign.id
                              ? "selected"
                              : ""
                          }`}
                        >
                          {getNumOfLeads(campaign.id)
                            ? `${getNumOfLeads(campaign.id)} leads`
                            : "No Leads"}
                        </span>
                      </Link>
                    </div>
                  </div>

                  <div
                    className={`campaign-display-subcontainer2 ${
                      campaignDocument.id === campaign.id ? "selected-sub" : ""
                    }`}
                  >
                    <p className="location-text">
                      {campaign.location === null ? "NA" : campaign.location}
                    </p>
                    <span>
                      {campaignDocument?.campaignCreatedAt
                        ? moment
                            .unix(
                              campaign.campaignCreatedAt.seconds,
                              campaign.campaignCreatedAt.nanoseconds
                            )
                            .fromNow()
                        : "long back"}
                    </span>
                  </div>
                </div>
              </button>
            ))}
        </div>

        <CampaignPopup
          openCampaignPopup={openCampaignPopup}
          handleClickOpen={handleClickOpenCampaignPopup}
          handleClose={handleCloseCampaignPopup}
          disableApplyBtn={disableApplyBtn}
          selectedArray={selectedArray}
          setselectedArray={setselectedArray}
        />
        <AssignPopUp
          open={openAssignModel}
          setOpenAssignModel={setOpenAssignModel}
          options={options}
          onChangeOption={assignBatchUsers}
          selectedUsers={selectedUsers}
          setselectedArray={setselectedArray}
        />
        <ActivePopUp
          openCampaignPopupActive={openCampaignPopupActive}
          handleClickOpen={handleClickOpenCampaignPopupActive}
          handleClose={handleCloseCampaignPopupActive}
          selectedArray={selectedArray}
          handleClosePopover={handleClose}
          setselectedArray={setselectedArray}
        />
        <DeActivatePopUp
          openCampaignPopupDeActivate={openCampaignPopupDeActivate}
          handleClickOpen={handleClickOpenCampaignPopupDeActivate}
          handleClose={handleCloseCampaignPopupDeActivate}
          selectedArray={selectedArray}
          handleClosePopover={handleClose}
          setselectedArray={setselectedArray}
        />
      </React.Fragment>
    );
  }
};

export default CampaignDisplay;
