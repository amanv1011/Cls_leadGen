import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Dashboard from "../pageComponents/dashboard";
import Campaign from "../pageComponents/campaign/index";
import Leads from "../pageComponents/leads";
import UnAuthorizedComponent from "../pageComponents/unAuthorized";

import OutletComponent from "../pageComponents/outletComopnent/outletComponent";
import { userRole } from "../../utils/constants";

const AllRoutes = () => {
  console.log(window.location.pathname);
  const allRoutes = useRoutes([
    {
      element: <OutletComponent />,
      children: [
        {
          path: "/",
          element: <>{userRole !== 4 ? <Dashboard /> : <Leads />}</>,
        },
        {
          path: "/leads",
          element: (
            <>
              <Leads />
            </>
          ),
        },

        {
          path: "/campaign",
          element: (
            <>
              <Campaign />
            </>
          ),
        },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/" />,
    },
    {
      path: "unAuthorized",
      element: <UnAuthorizedComponent></UnAuthorizedComponent>,
    },
  ]);
  return allRoutes;
};

export default AllRoutes;
