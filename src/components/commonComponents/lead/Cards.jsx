import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import LinkedIn from "./LinkedIn";
import moment from "moment";
import { getPopupEnable, getPopupDisable } from "../../../redux/actions/PopupAction";
import { useSelector, useDispatch } from "react-redux";
import React from "react";
import {updateLeadStatus} from '../../../redux/actions/leadActions'
import "./lead.scss";

const Cards = (props) => {
  const dispatch = useDispatch();




  var leadsData = props.leadData

  let approveButton = (event) =>{
    dispatch(updateLeadStatus(event.target.value,1))
  }
  let rejectButton = (event) =>{
    dispatch(updateLeadStatus(event.target.value,-1))
  }

  const openPopup = (e) => {
    e.preventDefault()

    let leadsId = e.currentTarget.id

    let leadsIdData = leadsData.filter((ele) => ele.id === leadsId)

    dispatch(getPopupEnable(leadsIdData))
  }

  return (


    <>
      {
        leadsData.map((ele) => {
          return (
            <>
              <Box   className="lead-container">
                <Box className="lead-header">
                  <Box onClick={openPopup} id={ele.id} className="lead-header-title">
                    <Typography  className="lead-header-title-component">
                      {ele.title}
                    </Typography>
                  </Box>
                  <Box className="lead-header-option">
                    <span className="Response-time"> {moment.unix(ele.leadGeneratedDate.seconds).fromNow()} </span>
                    <IconButton> < a href={ele.link}><LinkedIn /></a>  </IconButton>
                    <IconButton><MoreVertIcon /></IconButton>
                  </Box>

                </Box>
                <hr className="line" />
                <Box className="lead-body">
                  <div className="lead-body-row">
                    <div className="lead-body-column">
                      <div className="lead-body-column-card1">
                        <p className="head-body">Key Skills</p>
                        <p className="body-detail">Manual Testing, Tester, Postman etc.</p>

                      </div>
                    </div>

                    <div className="lead-body-column">
                      <div className="lead-body-column-card2">
                        <p className="head-body">Company</p>
                        <p className="body-detail">{ele.companyName}</p>

                      </div>
                    </div>

                    <div className="lead-body-column">
                      <div className="lead-body-column-card3">
                        <p className="head-body">Description</p>
                        <p className="body-detail">{(ele.summary).slice(0, 42)}</p>

                      </div>
                    </div>
                    <div className="lead-body-column">
                      <div className="lead-body-column-card4">
                        <p className="head-body">Experience</p>
                        <p className="body-detail">0</p>

                      </div>
                    </div>

                    <div className="bt">
                      <Button onClick={approveButton} value={ele.id} style={{ textTransform: 'none', height: "36px", width: "100px", borderRadius: "10px", marginRight: "10px", backgroundColor: "#E8F9E8", color: "#16C31E" }}>Approved</Button>
                      <Button onClick={rejectButton} value={ele.id} style={{ textTransform: 'none', height: "36px", width: "100px", borderRadius: "10px", backgroundColor: "#FFF0EF", color: "#FF6C5F" }}> Reject</Button>

                    </div>
                  </div>
                </Box>
              </Box>

            </>
          )
        })
      }

    </>

  );
};

export default Cards;
