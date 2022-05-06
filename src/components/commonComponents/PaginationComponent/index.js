import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function PaginationComponent({ leadsPerPage, totalLeads, paginate }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalLeads / leadsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Stack spacing={2}>
      <Pagination
        showFirstButton
        size="large"
        count={pageNumbers.length}
        color="primary"
        onChange={(event, value) => {
          paginate(value);
        }}
        showLastButton
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "20px",
        }}
      />
    </Stack>
  );
}
export default PaginationComponent;