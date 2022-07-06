import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Dashboard from "../pageComponents/dashboard";
import Campaign from "../pageComponents/campaign/index";
import Leads from "../pageComponents/leads";
import UnAuthorizedComponent from "../pageComponents/unAuthorized";
import OutletComponent from "../pageComponents/outletComopnent/outletComponent";
import { roles } from "../../utils/constants";
import ProtectedRoute from "./private";

const AllRoutes = ({ userRole }) => {
  const allRoutes = useRoutes([
    {
      element: <OutletComponent />,
      children: [
        {
          path: "/",
          // element: (
          //   <>
          //     {userRole && !roles.all.includes(userRole) ? (
          //       <Navigate to="/leads" />
          //     ) : (
          //       <ProtectedRoute user={userRole} children={<Dashboard />} />
          //       )}
          //   </>
          // ),
          element: <ProtectedRoute user={userRole} children={<Dashboard />} />,
          // element: <Dashboard />,
        },
        {
          path: "/leads",
          element: <ProtectedRoute user={userRole} children={<Leads />} />,
        },

        {
          path: "/campaign",
          element: (
            <>
              <ProtectedRoute user={userRole} children={<Campaign />} />
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
