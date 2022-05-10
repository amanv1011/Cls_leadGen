import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import DateModal from "./DateModal";
import DownArrow from "./DownArrow";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import IconButton from "@mui/material/IconButton";
import CancelIcon from '@mui/icons-material/Cancel';
import Stack from "@mui/material/Stack";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import "./leadsHeader.scss";
import {
  leadsFilterCampaignName,
  leadsFilterOwnerName,
  leadsFilterSearch,
  clearFilters,
} from "../../../redux/actions/leadsFilter";

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
    fontSize: "14px",
    fontWeight: "600",
    borderRadius: "8px",
  },
}));

const LeadsHeader = () => {
  const dispatch = useDispatch();
  const SearchInput = useRef("");
  const [clearSearch, setClearSearch] = useState(false);
  const leadData = useSelector((state) => state.allCampaigns.campaignList);
  const campaignNameFilter = useSelector(
    (state) => state.leadsFilter.campaignName
  );
  const ownerNameFilter = useSelector((state) => state.leadsFilter.ownerName);

  const [allCampgainsMenu, setAllCampgainsMenu] = React.useState(null);
  const [allCampaignsFilter, setAllCampgainsFilter] = useState("All Campgains");
  const [allOwnersFilter, setAllOwnersFilter] = useState("All Owners");
  const openAllCampgainsMenu = Boolean(allCampgainsMenu);
  const handleClickAllCampgainsMenu = (event) => {
    setAllCampgainsMenu(event.currentTarget);
  };

  const uniqueOwner = [];

  leadData.forEach((c) => {
    if (!uniqueOwner.includes(c.owner)) {
      uniqueOwner.push(c.owner);
    }
  });

  useEffect(() => {
    setAllCampgainsFilter(campaignNameFilter);
    setAllOwnersFilter(ownerNameFilter);
    setAllCampgainsMenu(null);
  }, [campaignNameFilter, ownerNameFilter]);

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
    dispatch(leadsFilterSearch(SearchInput.current.value));
    setClearSearch(true);
  };

    const handleClearSearch = () => {
    SearchInput.current.value=""
    dispatch(leadsFilterSearch(SearchInput.current.value));
    setClearSearch(false);
  }

  const clearFilterTab = () => {
    dispatch(clearFilters());
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
          <div
            style={{
              display: "flex",
              backgroundColor: "#E7E7E7",
              flexWrap: "wrap",
              height: "40px",
              borderRadius: "10px",
            }}
          >
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
                fontWeight: "600",
                color: "rgba(92, 117,154)",
                fontSize: "14px",
                paddingLeft: "10px",
              }}
            />
            {clearSearch ? (
              <div
                style={{ paddingTop: "8px", paddingRight: "4px" }}
                onClick={handleClearSearch}
              >
                <CancelIcon />
              </div>
            ) : null}
            <div
              className="search-icon"
              onClick={handleSearch}
              style={{ paddingTop: "9px", paddingRight: "4px" }}
            >
              <SearchIcon />
            </div>
          </div>

          <div>
            <Button
              id="basic-button"
              aria-controls={openAllCampgainsMenu ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openAllCampgainsMenu ? "true" : undefined}
              onClick={handleClickAllCampgainsMenu}
              style={{
                textTransform: "none",
                height: "40px",
                minWidth: "181px",
                justifyContent: "space-between",
                padding: "10px",
                fontWeight: "600",
                borderRadius: "10px",
                marginLeft: "10px",
                backgroundColor: "#E7E7E7",
                color: "rgba(92, 117,154)",
              }}
            >
              {allCampaignsFilter}
              <span style={{ paddingLeft: "45px", paddingBottom: "3px" }}>
                <DownArrow />
              </span>
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={allCampgainsMenu}
              PaperProps={{
                style: {
                  width: "auto",
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
              <MenuItem
                sx={{
                  fontSize: "14px",
                  fontWeight: "600",
                }}
                onClick={handleCloseAllCampgainsMenu}
              >
                All Campaigns
              </MenuItem>
              {leadData.map((ele) => {
                return (
                  <React.Fragment key={ele.id}>
                    <MenuItem
                      data-id={ele.id}
                      sx={{
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                      onClick={handleCloseAllCampgainsMenu}
                    >
                      {ele.name}
                    </MenuItem>
                  </React.Fragment>
                );
              })}
            </Menu>
          </div>
        </div>
        <div style={{ display: "flex", paddingRight:"27px" }}>
          <DateModal />
          <Button
            id="basic-button"
            aria-controls={openOwnerMenu ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openOwnerMenu ? "true" : undefined}
            onClick={handleClickOwnerMenu}
            style={{
              textTransform: "none",
              height: "40px",
              minWidth: "181px",
              justifyContent: "space-between",
              padding: "10px",
              fontWeight: "600",
              borderRadius: "10px",
              marginLeft: "10px",
              backgroundColor: "#E7E7E7",
              color: "rgba(92, 117,154)",
            }}
          >
            {allOwnersFilter}
            <span style={{ paddingLeft: "70px", paddingBottom: "3px" }}>
              <DownArrow />
            </span>
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={ownerMenu}
            PaperProps={{
              style: {
                width: "auto",
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
                fontSize: "14px",
                fontWeight: "600",
              }}
              onClick={handleCloseOwnerMenu}
            >
              All Owners
            </MenuItem>
            {uniqueOwner.map((ele) => {
              return (
                <React.Fragment key={ele.id}>
                  <MenuItem
                    data-id={ele.id}
                    sx={{
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                    onClick={handleCloseOwnerMenu}
                  >
                    {ele}
                  </MenuItem>
                </React.Fragment>
              );
            })}
          </Menu>
          <div className="filter-icon">
            <Stack direction="row" alignItems="center" spacing={1}>
              <Tooltip  title="Filter" placement="top-start">
              <IconButton
                onClick={clearFilterTab}
                aria-label="filter"
                size="small"
              >
                <FilterAltOffIcon sx={{ color: "#8A99B7" }} />
              </IconButton>
              </Tooltip>
            </Stack>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeadsHeader;
