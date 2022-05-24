import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CircularProgress,
  IconButton,
  Switch,
  Backdrop,
  Tooltip,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { green, red } from "@mui/material/colors";
import Status from "./Status";
import StatusInActive from "./StatusInActive";
import "./Table.scss";
import Download from "./Download";
import Edit from "./Edit";
import View from "./View";
import Delete from "./Delete";
import Down from "./Down";
import * as XLSX from "xlsx";
import * as campaignActions from "../../../redux/actions/campaignActions";
import * as laedActions from "../../../redux/actions/leadActions";
import { get_a_feild_in_a_document } from "../../../services/api/campaign";
import CampaignDetailsView from "./CampaignDetailsView";
import { Link } from "react-router-dom";
import * as leadsFilterActions from "../../../redux/actions/leadsFilter";
import AlertBeforeAction from "./AlertBeforeAction";
import PaginationComponent from "../../commonComponents/PaginationComponent";
import * as paginationActions from "../../../redux/actions/paginationActions";

const GreenSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase": {
    color: red[600],
    "&:hover": {
      backgroundColor: alpha(red[600], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase + .MuiSwitch-track": {
    backgroundColor: red[600],
  },
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: green[600],
    "&:hover": {
      backgroundColor: alpha(green[600], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: green[600],
  },
}));

const Table = () => {
  const dispatch = useDispatch();

  const campaignList = useSelector((state) => state.allCampaigns.campaignList);
  const campaignsLoader = useSelector((state) => state.allCampaigns.loading);
  const leadsList = useSelector((state) => state.allLeads.leadsList);
  const initialSearchValue = useSelector(
    (state) => state.allCampaigns.initialSearchValue
  );

  const currentPage = useSelector((state) => state.paginationStates.activePage);
  const dataPerPage = useSelector(
    (state) => state.paginationStates.dataPerPage
  );

  const [campaignListData, setCampaignListData] = useState([]);
  const [leadsListData, setLeadsListData] = useState([]);
  const [order, setOrder] = useState("descendingOrder");
  const [viewDetails, setViewDetails] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [idForDelete, setIdForDelete] = useState("");
  const [campaignName, setCampaignName] = useState("");

  useEffect(() => {
    dispatch(campaignActions.getAllCampaignsAction());
    dispatch(laedActions.getAllLeadsAction());
  }, []);

  useEffect(() => {
    campaignList.forEach((element) => {
      let leadsCount = 0;
      leadsList.map((ele) => {
        if (element.id === ele.campaignId) {
          leadsCount++;
        }
      });
      element.leadsNo = leadsCount;
    });

    const initialSort = campaignList.sort((a, b) =>
      a.status < b.status ? 1 : -1
    );

    setCampaignListData(initialSort);
    dispatch(campaignActions.getSearchedCampaignList(initialSort));
    setLeadsListData(leadsList);
  }, [campaignList, leadsList]);

  useEffect(() => {
    searchingTable(initialSearchValue);
    dispatch(paginationActions.setActivePage(1));
  }, [initialSearchValue]);

  const getNumOfLeads = (id) => {
    const val = leadsListData.filter((valID) => {
      return valID.campaignId === id;
    });
    return val.length;
  };

  const forDownloading = (campaignListId, campaignListItemName) => {
    const val = leadsListData.filter((valID) => {
      return valID.campaignId === campaignListId;
    });

    let updatedleadsListDataToDownload = [];
    val.forEach((lead) => {
      let campaignListDataToDownload = {
        "Company name": lead.companyName !== null ? lead.companyName : "NA",
        Location: lead.location !== "No location" ? "lead.location" : "NA",
        "Lead generated date": formatDate(lead.leadGeneratedDate.toDate()),
        "Lead posted date": formatDate(lead.leadPostedDate),
        Link: lead.link,
        Summary: lead.summary !== "No summary" ? lead.summary : "NA",
        Title: lead.title,
        "Status of the lead":
          lead.status === 1
            ? "Approved"
            : lead.status === -1
            ? "Rejected"
            : lead.status === 2
            ? "Archived"
            : "Under review",
      };
      updatedleadsListDataToDownload = [
        ...updatedleadsListDataToDownload,
        campaignListDataToDownload,
      ];
    });

    let workBook = XLSX.utils.book_new();
    let workSheet = XLSX.utils.json_to_sheet(updatedleadsListDataToDownload);
    XLSX.utils.book_append_sheet(
      workBook,
      workSheet,
      `${campaignListItemName} sheet`
    );
    XLSX.writeFile(workBook, `${campaignListItemName} leads list.xlsx`);
  };

  const Viewed = async (campaignListItemId) => {
    setOpenDialog(true);
    const camapignDetails = await dispatch(
      campaignActions.getACampaignAction(campaignListItemId)
    );
    setViewDetails([
      {
        viewDetails:
          camapignDetails.payload._document.data.value.mapValue.fields,
        id: camapignDetails.payload.id,
      },
    ]);
  };

  const sortingTable = (col) => {
    const dataToSort = [...campaignListData];
    if (order === "ascendingOrder") {
      let sortedData = dataToSort.sort((a, b) =>
        a[col] === b[col] ? 0 : a[col] < b[col] ? 1 : -1
      );
      setCampaignListData(sortedData);
      setOrder("descendingOrder");
    } else {
      let sortedData = dataToSort.sort((a, b) =>
        a[col] === b[col] ? 0 : a[col] > b[col] ? 1 : -1
      );
      setCampaignListData(sortedData);
      setOrder("ascendingOrder");
    }
  };

  const keysInJSON = ["name", "location", "owner"];
  const searchingTable = (searchTerm) => {
    const lowerCasedValue = searchTerm.toLowerCase().trim();
    let filteredData = [];
    if (lowerCasedValue === "") {
      setCampaignListData(campaignList);
      dispatch(campaignActions.getSearchedCampaignList(campaignList));
    } else {
      filteredData = campaignList.filter((item) => {
        return keysInJSON.some((key) =>
          item[key].toString().toLowerCase().includes(lowerCasedValue)
        );
      });
      setCampaignListData(filteredData);
      dispatch(campaignActions.getSearchedCampaignList(filteredData));
    }
  };

  const statusUpdate = async (event, a__campgaignId) => {
    if (event.target.checked) {
      await get_a_feild_in_a_document(a__campgaignId, { status: 1 });
    } else {
      await get_a_feild_in_a_document(a__campgaignId, { status: 0 });
    }
    dispatch(campaignActions.getAllCampaignsAction());
  };

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [month, day, year].join("/");
  }

  const indexOfLastLead = currentPage * dataPerPage;
  const indexOfFirstLead = indexOfLastLead - dataPerPage;
  const currentCampaigns = campaignListData.slice(
    indexOfFirstLead,
    indexOfLastLead
  );

  if (campaignsLoader === false && currentCampaigns.length === 0) {
    return (
      <div>
        <div className="outer-wrapper">
          <table>
            <thead>
              <tr>
                <th className="campaign-name">Campaign Name</th>
                <th className="location">Location</th>
                <th className="numOfLeads">
                  No. of Leads
                  <i>
                    <Down />
                  </i>
                </th>
                <th className="start-date">
                  Start Date
                  <i>
                    <Down />
                  </i>
                </th>
                <th className="end-date">
                  End Date
                  <i>
                    <Down />
                  </i>
                </th>
                <th className="created-by">
                  Created By
                  <i>
                    <Down />
                  </i>
                </th>
                <th className="status">
                  Status
                  <i>
                    <Down />
                  </i>
                </th>
                <th className="actions">Actions</th>
              </tr>
              <tr className="bottomBorder"></tr>
            </thead>
          </table>
        </div>
        <div className="table-wrapper">
          <table>
            <tbody>
              <tr>
                <td
                  style={{
                    width: "100%",
                    fontSize: "18px",
                    textAlign: "center",
                  }}
                >
                  {initialSearchValue
                    ? "Searched campaigns(s) not found"
                    : "No Campaigns found"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  } else {
    return (
      <React.Fragment>
        <div className="camp-table-container">
          <div className="outer-wrapper">
            <table>
              <thead>
                <tr>
                  <th className="campaign-name">Campaign Name</th>
                  <th className="location">Location</th>
                  <th
                    className="numOfLeads"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      sortingTable("leadsNo");
                    }}
                  >
                    No. of Leads
                    <i>
                      <Down />
                    </i>
                  </th>
                  <th
                    className="headerHover start-date"
                    onClick={() => {
                      sortingTable("start_date");
                    }}
                  >
                    Start Date
                    <i>
                      <Down />
                    </i>
                  </th>
                  <th
                    className="headerHover end-date"
                    onClick={() => {
                      sortingTable("end_date");
                    }}
                  >
                    End Date
                    <i>
                      <Down />
                    </i>
                  </th>
                  <th
                    className="headerHover created-by"
                    onClick={() => {
                      sortingTable("owner");
                    }}
                  >
                    Created By
                    <i>
                      <Down />
                    </i>
                  </th>
                  <th
                    className="headerHover status"
                    onClick={() => {
                      sortingTable("status");
                    }}
                  >
                    Status
                    <i>
                      <Down />
                    </i>
                  </th>
                  <th className="actions">Actions</th>
                </tr>
                <tr className="bottomBorder"></tr>
              </thead>
            </table>
          </div>
          <div className="table-wrapper">
            {campaignsLoader && (
              <Backdrop
                sx={{
                  color: "#003AD2",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                  backgroundColor: "transparent",
                }}
                open={campaignsLoader}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            )}

            <table>
              <tbody>
                {currentCampaigns.length !== 0 &&
                  currentCampaigns.map((campaignListItem) => {
                    return (
                      <React.Fragment key={campaignListItem.id}>
                        <tr>
                          <td className="campaign-name">
                            {campaignListItem.name}
                          </td>
                          <td className="location">
                            {campaignListItem.location}
                          </td>

                          <td
                            className="numOfLeads"
                            onClick={() => {
                              if (getNumOfLeads(campaignListItem.id)) {
                                dispatch(
                                  leadsFilterActions.leadsFilterCampaignName(
                                    campaignListItem.name
                                  )
                                );
                                dispatch(
                                  leadsFilterActions.leadsFilterOwnerName(
                                    campaignListItem.owner
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
                            <Tooltip
                              title={
                                getNumOfLeads(campaignListItem.id)
                                  ? `Browse ${campaignListItem.name} leads`
                                  : "No Leads"
                              }
                              arrow
                            >
                              <Link
                                to={
                                  getNumOfLeads(campaignListItem.id)
                                    ? "/leads"
                                    : false
                                }
                                style={
                                  getNumOfLeads(campaignListItem.id) === 0
                                    ? {
                                        pointerEvents: "auto",
                                        cursor: "not-allowed",
                                      }
                                    : {}
                                }
                              >
                                {getNumOfLeads(campaignListItem.id)
                                  ? getNumOfLeads(campaignListItem.id)
                                  : "No Leads"}
                              </Link>
                            </Tooltip>
                          </td>

                          <td className="start-date">
                            {formatDate(campaignListItem.start_date.toDate())}
                          </td>
                          <td className="end-date">
                            {formatDate(campaignListItem.end_date.toDate())}
                          </td>
                          <td className="created-by">
                            {campaignListItem.owner}
                          </td>
                          <td className="status">
                            {campaignListItem.status ? (
                              <Status />
                            ) : (
                              <StatusInActive />
                            )}
                          </td>

                          <td className="actions">
                            <Tooltip title="Tooggle the status of the campaign">
                              <GreenSwitch
                                className="toggleSwitch"
                                checked={campaignListItem.status ? true : false}
                                onClick={(event) =>
                                  statusUpdate(event, campaignListItem.id)
                                }
                              />
                            </Tooltip>
                            <Tooltip
                              title={
                                getNumOfLeads(campaignListItem.id)
                                  ? `Download ${campaignListItem.name} leads`
                                  : `Download ${campaignListItem.name} leads disabled`
                              }
                              arrow
                            >
                              <span>
                                <IconButton
                                  disabled={
                                    getNumOfLeads(campaignListItem.id)
                                      ? false
                                      : true
                                  }
                                  style={
                                    getNumOfLeads(campaignListItem.id) === 0
                                      ? {
                                          pointerEvents: "auto",
                                          cursor: "not-allowed",
                                        }
                                      : {}
                                  }
                                  onClick={() =>
                                    forDownloading(
                                      campaignListItem.id,
                                      campaignListItem.name
                                    )
                                  }
                                >
                                  <Download />
                                </IconButton>
                              </span>
                            </Tooltip>

                            <Tooltip
                              title={`Edit ${campaignListItem.name}`}
                              arrow
                            >
                              <span>
                                <IconButton
                                  onClick={() => {
                                    dispatch(
                                      campaignActions.campaignIDAction(
                                        campaignListItem.id
                                      )
                                    );
                                    dispatch(campaignActions.showModal());
                                  }}
                                >
                                  <Edit />
                                </IconButton>
                              </span>
                            </Tooltip>

                            <Tooltip
                              title={`View ${campaignListItem.name} details`}
                              arrow
                            >
                              <span>
                                <IconButton
                                  onClick={() => Viewed(campaignListItem.id)}
                                >
                                  <View />
                                </IconButton>
                              </span>
                            </Tooltip>

                            <Tooltip
                              title={
                                getNumOfLeads(campaignListItem.id)
                                  ? "Delete disabled"
                                  : "Delete"
                              }
                              arrow
                            >
                              <span>
                                <IconButton
                                  disabled={
                                    getNumOfLeads(campaignListItem.id)
                                      ? true
                                      : false
                                  }
                                  style={
                                    getNumOfLeads(campaignListItem.id) === 0
                                      ? {}
                                      : {
                                          pointerEvents: "auto",
                                          cursor: "not-allowed",
                                        }
                                  }
                                  onClick={() => {
                                    setOpenAlert(true);
                                    setCampaignName(campaignListItem.name);
                                    setIdForDelete(campaignListItem.id);
                                  }}
                                >
                                  <Delete />
                                </IconButton>
                              </span>
                            </Tooltip>
                          </td>
                        </tr>
                        <tr className="bottomBorder"></tr>
                      </React.Fragment>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="campaignTable_pagination">
          <PaginationComponent
            dataPerPage={dataPerPage}
            dataLength={campaignListData.length}
            loader={campaignsLoader}
          />
        </div>
        <CampaignDetailsView
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          viewDetails={viewDetails}
        />
        <AlertBeforeAction
          open={openAlert}
          setOpenAlert={setOpenAlert}
          campaignItemId={idForDelete}
          setIdForDelete={setIdForDelete}
          campaignName={campaignName}
          setCampaignName={setCampaignName}
        />
      </React.Fragment>
    );
  }
};

export default Table;
