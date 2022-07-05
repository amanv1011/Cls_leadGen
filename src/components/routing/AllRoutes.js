import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Dashboard from "../pageComponents/dashboard";
import Campaign from "../pageComponents/campaign/index";
import Leads from "../pageComponents/leads";
import UnAuthorizedComponent from "../pageComponents/unAuthorized";
import OutletComponent from "../pageComponents/outletComopnent/outletComponent";
import { roles } from "../../utils/constants";

const AllRoutes = ({ userRole }) => {
  console.log(userRole);
  const allRoutes = useRoutes([
    {
      element: <OutletComponent />,
      children: [
        {
          path: "/",
          element: (
            <>
              {userRole && !roles.all.includes(userRole) ? (
                <Navigate to="/leads" />
              ) : (
                <Dashboard />
              )}
            </>
          ),
          // element: <Dashboard />,
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
