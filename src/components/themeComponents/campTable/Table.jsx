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
import { green } from "@mui/material/colors";
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

const GreenSwitch = styled(Switch)(({ theme }) => ({
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

  const statesInReduxStore = useSelector((state) => state);
  const campaignList = statesInReduxStore.allCampaigns.campaignList;
  const campaignLoader = statesInReduxStore.allCampaigns.loading;
  const leadsList = statesInReduxStore.allLeads.leadsList;
  const initialSearchValue = statesInReduxStore.allCampaigns.initialSearchValue;

  const [campaignListData, setCampaignListData] = useState([]);
  const [leadsListData, setLeadsListData] = useState([]);
  const [order, setOrder] = useState("descendingOrder");
  const [viewDetails, setViewDetails] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    dispatch(campaignActions.getAllCampaignsAction());
    dispatch(laedActions.getAllLeadsAction());
  }, []);

  useEffect(() => {
    setCampaignListData(campaignList);
    setLeadsListData(leadsList);
  }, [campaignList, leadsList]);

  useEffect(() => {
    searchingTable(initialSearchValue);
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
    let workBook = XLSX.utils.book_new();
    let workSheet = XLSX.utils.json_to_sheet(val);
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
      let sortedData = dataToSort.sort((a, b) => (a[col] < b[col] ? 1 : -1));
      setCampaignListData(sortedData);
      setOrder("descendingOrder");
    } else {
      let sortedData = dataToSort.sort((a, b) => (a[col] > b[col] ? 1 : -1));
      setCampaignListData(sortedData);
      setOrder("ascendingOrder");
    }
  };

  const keysInJSON = ["name", "location", "owner"];
  const searchingTable = (searchTerm) => {
    const lowerCasedValue = searchTerm.toLowerCase().trim();
    if (lowerCasedValue === "") setCampaignListData(campaignList);
    else {
      const filteredData = campaignList.filter((item) => {
        return keysInJSON.some((key) =>
          item[key].toString().toLowerCase().includes(lowerCasedValue)
        );
      });
      setCampaignListData(filteredData);
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
    return [day, month, year].join("/");
  }

  return (
    <React.Fragment>
      <div>
        <div className="outer-wrapper">
          <table>
            <thead>
              <tr>
                <th className="campaign-name">Campaign Name</th>
                <th className="location">Location</th>
                <th className="numOfLeads">No. of Leads</th>
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
                <th className="green-switch"></th>
                <th className="actions">Actions</th>
              </tr>
              <tr className="bottomBorder"></tr>
            </thead>
          </table>
        </div>
        <div className="table-wrapper">
          {campaignLoader && (
            <Backdrop
              sx={{
                color: "#003AD2",
                zIndex: (theme) => theme.zIndex.drawer + 1,
                backgroundColor: "transparent",
              }}
              open={campaignLoader}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          )}

          <table id="table-to-xls">
            <tbody>
              {campaignListData.length !== 0 &&
                campaignListData.map((campaignListItem) => {
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
                        </td>

                        <td className="start-date">
                          {formatDate(campaignListItem.start_date.toDate())}
                        </td>
                        <td className="end-date">
                          {formatDate(campaignListItem.end_date.toDate())}
                        </td>
                        <td className="created-by">{campaignListItem.owner}</td>
                        <td className="status">
                          {campaignListItem.status ? (
                            <Status />
                          ) : (
                            <StatusInActive />
                          )}
                        </td>
                        <td className="green-switch">
                          <GreenSwitch
                            className="toggleSwitch"
                            defaultChecked={
                              campaignListItem.status ? true : false
                            }
                            onClick={(event) =>
                              statusUpdate(event, campaignListItem.id)
                            }
                          />
                        </td>
                        <td className="actions">
                          <div>
                            <Tooltip
                              title={
                                getNumOfLeads(campaignListItem.id)
                                  ? "Download"
                                  : "Download disabled"
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

                            <Tooltip title="Edit" arrow>
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

                            <Tooltip title="View" arrow>
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
                                    dispatch(
                                      campaignActions.deleteCampaignsAction(
                                        campaignListItem.id
                                      )
                                    );
                                  }}
                                >
                                  <Delete />
                                </IconButton>
                              </span>
                            </Tooltip>
                          </div>
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
      <CampaignDetailsView
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        viewDetails={viewDetails}
      />
    </React.Fragment>
  );
};

export default Table;
