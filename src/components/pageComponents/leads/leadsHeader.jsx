import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import DateModal from './DateModal';
import DownArrow from "./DownArrow";
import SearchIcon from '@mui/icons-material/Search';
import "./leadsHeader.scss"
import {
  leadsFilterCampaignName,
  leadsFilterOwnerName,
  leadsFilterSearch,
} from "../../../redux/actions/leadsFilter";

const LeadsHeader = () => {
  const dispatch = useDispatch();

  const SearchInput = useRef("")
  const emptyString = ""

  const leadData = useSelector((state) => state.allCampaigns.campaignList);
  const genratedLeadData = useSelector((state) => state.allLeads.leadsList);

  const [allCampgainsMenu, setAllCampgainsMenu] = React.useState(null);
  const [allCampaignsFilter, setAllCampgainsFilter] = useState("All Campgains");
  const [allOwnersFilter, setAllOwnersFilter] = useState("All Owners");
  const openAllCampgainsMenu = Boolean(allCampgainsMenu);
  const handleClickAllCampgainsMenu = (event) => {
    setAllCampgainsMenu(event.currentTarget);
  };
  const handleCloseAllCampgainsMenu = (event) => {
    if (event.target.innerText === "") {
      dispatch(leadsFilterCampaignName("All Campaigns"));
      setAllCampgainsFilter("All Campaigns");
    } else {
      dispatch(leadsFilterCampaignName(event.target.innerText));
      setAllCampgainsFilter(event.target.innerText);
    }
    setAllCampgainsMenu(null);
  };

  const [ownerMenu, setOwnerMenu] = useState(null);
  const openOwnerMenu = Boolean(ownerMenu);
  const handleClickOwnerMenu = (event) => {
    setOwnerMenu(event.currentTarget);
  };
  const handleCloseOwnerMenu = (event) => {
    if (event.target.innerText === "") {
      dispatch(leadsFilterOwnerName("All Owners"));
      setAllOwnersFilter("All Owners");
    } else {
      dispatch(leadsFilterOwnerName(event.target.innerText));
      setAllOwnersFilter(event.target.innerText);
    }

    setOwnerMenu(null);
  };

  const handleSearch = () => {
    console.log(SearchInput.current.value);
    dispatch(leadsFilterSearch(SearchInput.current.value))
    SearchInput.current.value="";
    console.log(SearchInput.current.value);

  }

  useEffect(() =>{
    SearchInput.current.value="";
    dispatch(leadsFilterSearch(SearchInput.current.value))
  },)

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div style={{ display: "flex"}}>
          <div style={{ display: "flex", backgroundColor: "#E7E7E7", flexWrap:'wrap', height:"40px", borderRadius:'10px' }}>
          <input
            placeholder="Search"
            type="text"
            className="search-input-leads"
            ref={SearchInput}
            style={{
              width: "280px",
              height: "40px",
              borderRadius: "10px",
              backgroundColor: "#E7E7E7",
              border: "none",
              fontFamily: "Segoe UI",
              fontWeight: "600",
              color: "rgba(92, 117,154)",
              fontSize: "14px",
              paddingLeft:'10px'
            }}
            
          />
          <div className="search-icon" onClick={handleSearch} style={{paddingTop:'9px', paddingRight:'4px'}}><SearchIcon/></div>
          
          </div>

          <div>
            <Button
              id="basic-button"
              aria-controls={openAllCampgainsMenu ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openAllCampgainsMenu ? "true" : undefined}
              onClick={handleClickAllCampgainsMenu}
              style={{
                fontFamily: "Segoe UI",
                textTransform: "none",
                height: "40px",
                minWidth: "181px",
                justifyContent: "flex-start",
                padding: "10px",
                fontWeight: "600",
                borderRadius: "10px",
                marginLeft: "10px",
                backgroundColor: "#E7E7E7",
                color: "rgba(92, 117,154)",
              }}
            >
              {allCampaignsFilter}{" "}
              <span style={{ paddingLeft: "45px", paddingBottom: "3px" }}>
              <DownArrow />
            </span>
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={allCampgainsMenu}
              PaperProps={{
                style: {
                  width: "181px",
                  borderRadius: "10px",
                  marginTop: "3px",
                  boxShadow: "none",
                  backgroundColor: "#E7E7E7",
                  color: "rgba(92, 117,154)",
                },
              }}
              open={openAllCampgainsMenu}
              onClose={handleCloseAllCampgainsMenu}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {" "}
              <MenuItem
                sx={{
                  fontFamily: "Segoe UI",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
                onClick={handleCloseAllCampgainsMenu}
              >
                All Campaigns
              </MenuItem>
              {leadData.map((ele) => {
                return (
                  <>
                    <MenuItem
                      data-id={ele.id}
                      sx={{
                        fontFamily: "Segoe UI",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                      onClick={handleCloseAllCampgainsMenu}
                    >
                      {ele.name}
                    </MenuItem>
                  </>
                );
              })}
            </Menu>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <DateModal />
          <Button
            id="basic-button"
            aria-controls={openOwnerMenu ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openOwnerMenu ? "true" : undefined}
            onClick={handleClickOwnerMenu}
            style={{
              fontFamily: "Segoe UI",
              textTransform: "none",
              height: "40px",
              minWidth: "181px",
              justifyContent: "flex-start",
              padding: "10px",
              fontWeight: "600",
              borderRadius: "10px",
              marginLeft: "10px",
              backgroundColor: "#E7E7E7",
              color: "rgba(92, 117,154)",
            }}
          >
            {allOwnersFilter}{" "}
            <span style={{ paddingLeft: "70px", paddingBottom: "3px" }}>
              <DownArrow />
            </span>
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={ownerMenu}
            PaperProps={{
              style: {
                width: "181px",
                borderRadius: "10px",
                marginTop: "3px",
                boxShadow: "none",
                backgroundColor: "#E7E7E7",
                color: "rgba(92, 117,154)",
              },
            }}
            open={openOwnerMenu}
            onClose={handleCloseOwnerMenu}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              sx={{
                fontFamily: "Segoe UI",
                fontSize: "14px",
                fontWeight: "600",
              }}
              onClick={handleCloseOwnerMenu}
            >
              All Owners
            </MenuItem>
            {leadData.map((ele) => {
              return (
                <>
                  <MenuItem
                    data-id={ele.id}
                    sx={{
                      fontFamily: "Segoe UI",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                    onClick={handleCloseOwnerMenu}
                  >
                    {ele.owner}
                  </MenuItem>
                </>
              );
            })}
          </Menu>
        </div>
      </div>
    </>
  );
};

export default LeadsHeader;
