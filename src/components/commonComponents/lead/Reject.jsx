import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import LinkedIn from "./LinkedIn";
import moment from "moment";
import React from "react";
import Cards from "./Cards";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getRejectCount } from "../../../redux/actions/approveRejectcount";
import { getUnderreviewCount } from "../../../redux/actions/approveRejectcount";
import { getApproveCount } from "../../../redux/actions/approveRejectcount";
import PopupBox from "./PopupBox";
import "./lead.scss";
const Reject = () => {
  const dispatch = useDispatch();
  const genratedLeadData = useSelector((state) => state.allLeads.leadsList);
  const rejectList = genratedLeadData.filter((ele) => ele.status === -1);
  const rejectCount = rejectList.length;
  const underReviewList = genratedLeadData.filter((ele) => ele.status === 0);
  const underReviewCount = underReviewList.length;
  const approveList = genratedLeadData.filter((ele) => ele.status === 1);
  const approveCount = approveList.length;
  const popupStatus = useSelector((state) => state.popupStatus.popupStatus);
  const popupData = useSelector((state) => state.popupStatus.popupData);

  useEffect(() => {
    dispatch(getApproveCount(approveCount));
    dispatch(getUnderreviewCount(underReviewCount));
    dispatch(getRejectCount(rejectCount));
  });
  return (
    <>
      {popupStatus ? <PopupBox data={popupData} /> : null}
      <Cards leadData={rejectList} />
    </>
  );
};

export default Reject;
