import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import { setActivePage } from "../../../redux/actions/paginationActions";

function PaginationComponent({ leadsPerPage, totalLeads, loader }) {
  const dispatch = useDispatch();
  const activePage = useSelector((state) => state.paginationStates.activePage);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalLeads / leadsPerPage); i++) {
    pageNumbers.push(i);
  }

  if (loader || pageNumbers.length === 0) {
    return null;
  } else {
    return (
      <Stack spacing={2}>
        <Pagination
          showFirstButton
          size="large"
          page={activePage}
          count={pageNumbers.length}
          color="primary"
          onChange={(event, value) => {
            dispatch(setActivePage(value));
          }}
          default={1}
          showLastButton
        />
      </Stack>
    );
  }
}
export default PaginationComponent;
