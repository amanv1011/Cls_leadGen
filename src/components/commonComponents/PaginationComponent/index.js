import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import {setActivePage} from "../../../redux/actions/paginationActions"

function PaginationComponent({ leadsPerPage, totalLeads }) {
  const dispatch = useDispatch()
  const activePage = useSelector((state) => state.paginationStates.activePage)
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalLeads / leadsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <Stack spacing={2}>
      <Pagination
        showFirstButton
        size="large"
        page={activePage}
        count={pageNumbers.length}
        color="primary"
        onChange={(event, value) => {
          dispatch(setActivePage(value))
        }}
        showLastButton
        style={{
          margin: "20px",
          display:"flex",
          justifyContent: "center"
        }}
      />
    </Stack>
  );
}
export default PaginationComponent;
