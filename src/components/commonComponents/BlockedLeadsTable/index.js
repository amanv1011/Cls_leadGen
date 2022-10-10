import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBlockedCompaniesListAction } from "../../../redux/actions/blockedCompaniesAction";

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const columns = [
  { id: "companyName", label: "Company Name", minWidth: 100 },
  {
    id: "leadId",
    label: "No. of leads Blocked",
    minWidth: 100,
    align: "center",
  },
  {
    id: "reasonForBlock",
    label: "Reason for Block",
    minWidth: 270,
    align: "left",
  },
];

export const BlockedLeadsTable = () => {
  const dispatch = useDispatch();

  const blockedCompaniesList = useSelector(
    (state) => state.blockedCompaniesReducer.blockedCompainesList
  );

  useEffect(() => {
    dispatch(getBlockedCompaniesListAction());
  }, []);

  return (
    <Box component="div" className="campaign-container">
      <Box component={"div"} className="campaign-body">
        <Box
          component={"div"}
          style={{
            height: " 87vh",
            width: "87vw",
          }}
          className="section campaign-details"
        >
          {blockedCompaniesList?.length === 0 ? (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                fontSize: "20px",
              }}
            >
              No Blocked Companies
            </div>
          ) : (
            <Paper sx={{ width: "100%", height: "100%" }}>
              <TableContainer sx={{ maxHeight: 555 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {blockedCompaniesList.map((blockedCompany) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={blockedCompany.id}
                        >
                          {columns.map((column) => {
                            const value =
                              column.id === "leadId"
                                ? blockedCompany[column.id].length
                                : blockedCompany[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          )}
        </Box>
      </Box>
    </Box>
  );
};
