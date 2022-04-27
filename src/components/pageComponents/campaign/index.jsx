import React from "react";
import { Box } from "@mui/system";
import CampTable from "../../themeComponents/campTable/Table";
import "./campaign.scss";

const Campaign = () => {
  return (
    <React.Fragment>
      <Box className="campaign-container">
        <CampTable />
      </Box>
    </React.Fragment>
  );
};

export default Campaign;
