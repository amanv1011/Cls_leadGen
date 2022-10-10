import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Dashboard from "../pageComponents/dashboard";
import Campaign from "../pageComponents/campaign/index";
import Leads from "../pageComponents/leads";
import UnAuthorizedComponent from "../pageComponents/unAuthorized";
import OutletComponent from "../pageComponents/outletComopnent/outletComponent";
import ProtectedRoute from "./private";
import { BlockedLeadsTable } from "../commonComponents/BlockedLeadsTable";

const AllRoutes = ({ userRole }) => {
  const allRoutes = useRoutes([
    {
      element: <OutletComponent userRole={userRole} />,
      children: [
        {
          path: "/",
          element: (
            <ProtectedRoute
              userRole={userRole}
              children={<Dashboard userRole={userRole} />}
            />
          ),
        },
        {
          path: "/leads",
          element: (
            <ProtectedRoute
              userRole={userRole}
              children={<Leads userRole={userRole} />}
            />
          ),
        },
        {
          path: "/campaign",
          element: (
            <>
              <ProtectedRoute userRole={userRole} children={<Campaign />} />
            </>
          ),
        },
        {
          path: "/blockedCompanies",
          element: (
            <>
              <ProtectedRoute
                userRole={userRole}
                children={<BlockedLeadsTable />}
              />
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
