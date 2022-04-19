import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import IInput from "../../themeComponents/input";
import DownArrow from "./DownArrow";
import {
  leadsFilterCampaignName,
  leadsFilterOwnerName,
} from "../../../redux/actions/leadsFilter";

const LeadsHeader = () => {
  const dispatch = useDispatch();

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
      setAllCampgainsFilter("All Campaigns")
    } else {
      dispatch(leadsFilterCampaignName(event.target.innerText));
      setAllCampgainsFilter(event.target.innerText)
      
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
      setAllOwnersFilter("All Owners")
    } else {
      dispatch(leadsFilterOwnerName(event.target.innerText));
      setAllOwnersFilter(event.target.innerText)
    }

    setOwnerMenu(null);
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div style={{ display: "flex" }}>
          <IInput
            style={{ color: "rgba(92, 117,154)" }}
            placeholder={"Search"}
            isSearch={true}
          />
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
              <span style={{ marginLeft: "38px", paddingBottom: "5px" }}>
                {" "}
                {/* <DownArrow />{" "} */}
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
            <span style={{ marginLeft: "38px", paddingBottom: "5px" }}>
              {" "}
              {/* <DownArrow />{" "} */}
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
