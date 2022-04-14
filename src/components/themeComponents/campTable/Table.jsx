import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress, IconButton, Switch, Backdrop } from "@mui/material";
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
import moment from "moment";
import * as XLSX from "xlsx";
import * as campaignActions from "../../../redux/actions/campaignActions";
import { getAllLeadsAction } from "../../../redux/actions/leadActions";
import { get_a_feild_in_a_document } from "../../../services/api/campaign";
import CampaignDetailsView from "./CampaignDetailsView";

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
  const loader = statesInReduxStore.allCampaigns.loading;
  const leadsList = statesInReduxStore.allLeads.leadsList;
  const initialSearchValue = statesInReduxStore.allCampaigns.initialSearchValue;
  const [searchTerm, setSearchTerm] = useState("");

  const [campaignListData, setCampaignListData] = useState([]);
  const [leadsListData, setLeadsListData] = useState([]);
  const [order, setOrder] = useState("descendingOrder");
  const [viewMode, setViewMode] = useState(false);
  const [open, setOpen] = useState(true);
  const [viewDetails, setViewDetails] = useState([]);

  useEffect(() => {
    dispatch(campaignActions.getAllCampaignsAction());
    dispatch(getAllLeadsAction());
  }, []);

  useEffect(() => {
    setCampaignListData(campaignList);
    setLeadsListData(leadsList);
  }, [campaignList, leadsList]);

  const getId = (id) => {
    const val = leadsListData.filter((valID) => {
      return valID.campaignId === id;
    });

    return val.length;
  };

  console.log("statesInReduxStore===", statesInReduxStore);

  const forDownloading = (campaignListId) => {
    console.log("Downloaded ===", campaignListId);
    const val = leadsListData.filter((valID) => {
      return valID.campaignId === campaignListId;
    });
    console.log("id==", campaignListId, "val===", val);
    let workBook = XLSX.utils.book_new();
    let workSheet = XLSX.utils.json_to_sheet(val);
    XLSX.utils.book_append_sheet(workBook, workSheet, "My Leads Sheet1");
    XLSX.writeFile(workBook, "MyExcel.xlsx");
  };

  const Viewed = async (campaignListItemId) => {
    setViewMode(true);
    const mithunDominic = await dispatch(
      campaignActions.getACampaignAction(campaignListItemId)
    );
    setViewDetails([
      {
        viewDetails: mithunDominic.payload._document.data.value.mapValue.fields,
        id: mithunDominic.payload.id,
      },
    ]);
    console.log("mithunDominic", mithunDominic);
    setOpen(true);
  };

  const sortingTable = (col) => {
    const dataToSort = [...campaignListData];

    if (order === "ascendingOrder") {
      if (col === "owner") {
        const sortedData = dataToSort.sort((a, b) => {
          if (a[col].toLowerCase() > b[col].toLowerCase()) return 1;
          if (a[col].toLowerCase() < b[col].toLowerCase()) return -1;
          return 0;
        });
        setCampaignListData(sortedData);
        setOrder("descendingOrder");
      }
      if (col === "frequency" || col === "status") {
        const sortedData = dataToSort.sort((a, b) => {
          return Number(a[col]) - Number(b[col]);
        });
        setCampaignListData(sortedData);
        setOrder("descendingOrder");
      }

      // if (col === "start_date" || col === "end_date") {
      //   const sortedData = dataToSort.sort((a, b) => {
      //     return new Date(a[col]).valueOf() - new Date(b[col]).valueOf();
      //   });
      //   setCampaignListData(sortedData);
      //   setOrder("descendingOrder");
      // }
    }

    if (order === "descendingOrder") {
      console.log("order", order);
      if (col === "owner") {
        const sortedData = dataToSort.sort((a, b) => {
          if (a[col].toLowerCase() < b[col].toLowerCase()) return 1;
          if (a[col].toLowerCase() > b[col].toLowerCase()) return -1;
          return 0;
        });
        setCampaignListData(sortedData);
        setOrder("ascendingOrder");
      }
      if (col === "frequency" || col === "status") {
        const sortedData = dataToSort.sort((a, b) => {
          return Number(b[col]) - Number(a[col]);
        });
        setCampaignListData(sortedData);
        setOrder("ascendingOrder");
      }

      // if (col === "start_date" || col === "end_date") {
      //   const sortedData = dataToSort.sort((a, b) => {
      //     // console.log("new Date(b[col])", new Date(b.col));
      //     // return new Date(b[col]).valueOf() - new Date(a[col]).valueOf();
      //   });
      //   setCampaignListData(sortedData);
      //   setOrder("ascendingOrder");
      // }
    }
  };

  if (initialSearchValue) {
    searchingTable(initialSearchValue);
  }
  function searchingTable(searchTerm) {
    const lowerCasedValue = searchTerm.toLowerCase().trim();
    if (lowerCasedValue === "") setCampaignListData(campaignList);
    else {
      const filteredData = campaignListData.filter((item) => {
        return Object.keys(item).some((key) =>
          item[key].toString().toLowerCase().includes(lowerCasedValue)
        );
      });
      setCampaignListData(filteredData);
    }
  }

  // Update status function
  const statusUpdate = async (event, a__campgaignId) => {
    console.log("statusUpdate");
    if (event.target.checked) {
      // console.log("checked", event.target.checked);
      await get_a_feild_in_a_document(a__campgaignId, { status: 1 });
    } else {
      // console.log("Not checked ===", event.target.checked);
      await get_a_feild_in_a_document(a__campgaignId, { status: 0 });
    }
    dispatch(campaignActions.getAllCampaignsAction());
  };

  if (viewMode)
    return (
      <CampaignDetailsView
        viewMode={viewMode}
        setViewMode={setViewMode}
        open={open}
        setOpen={setOpen}
        viewDetails={viewDetails}
        // loader={loader}
      />
    );
  else
    return (
      <React.Fragment>
        <div>
          <div className="outer-wrapper">
            <table>
              <thead>
                <tr>
                  <th className="campaign-name">Campaign Name</th>
                  <th className="location">Location</th>
                  <th
                    className="headerHover frequency"
                    onClick={() => {
                      sortingTable("frequency");
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
                  <th className="green-switch"></th>
                  <th className="actions">Actions</th>
                </tr>
                <tr className="bottomBorder"></tr>
              </thead>
            </table>
          </div>
          <div className="table-wrapper">
            {loader && (
              <Backdrop
                sx={{
                  color: "#003AD2",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                  backgroundColor: "transparent",
                }}
                open={loader}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            )}

            <table id="table-to-xls">
              <tbody>
                {campaignListData &&
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
                          <td className="frequency">
                            {getId(campaignListItem.id)}
                          </td>
                          <td className="start-date">
                            {moment(
                              campaignListItem.start_date.toDate()
                            ).format("L")}
                          </td>
                          <td className="end-date">
                            {moment(campaignListItem.end_date.toDate()).format(
                              "L"
                            )}
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
                              <IconButton
                                disabled={
                                  getId(campaignListItem.id) ? false : true
                                }
                                style={
                                  getId(campaignListItem.id) === 0
                                    ? {
                                        pointerEvents: "auto",
                                        cursor: "not-allowed",
                                      }
                                    : {}
                                }
                                onClick={() =>
                                  forDownloading(campaignListItem.id)
                                }
                              >
                                <Download />
                              </IconButton>

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

                              <IconButton
                                onClick={() => Viewed(campaignListItem.id)}
                              >
                                <View />
                              </IconButton>

                              <IconButton
                                disabled={
                                  getId(campaignListItem.id) ? true : false
                                }
                                style={
                                  getId(campaignListItem.id) === 0
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
      </React.Fragment>
    );
};

export default Table;
