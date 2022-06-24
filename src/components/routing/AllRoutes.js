import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Leads2 from "../pageComponents/leads2";
import Dashboard from "../pageComponents/dashboard";
import Header from "../themeComponents/header";
import Campaign from "../pageComponents/campaign/index";
import Leads from "../pageComponents/leads";
import UnAuthorizedComponent from "../pageComponents/unAuthorized";

const AllRoutes = () => {
  const allRoutes = useRoutes([
    {
      path: "/",
      element: <Dashboard />,
      children: [
        {
          path: "/leads",
          element: (
            <>
              {/* <Header /> */}
              <Leads />
            </>
          ),
        },

        {
          path: "/campaign",
          element: (
            <>
              {/* <Header /> */}
              <Campaign />
            </>
          ),
        },
        {
          path: "/leads/all",
          element: (
            <>
              {/* <Header /> */}
              <Leads />
            </>
          ),
        },
        {
          path: "/leads/underreview",
          element: (
            <>
              {/* <Header /> */}
              <Leads />
            </>
          ),
        },
        {
          path: "/leads/approve",
          element: (
            <>
              {/* <Header /> */}
              <Leads />
            </>
          ),
        },
        {
          path: "/leads/reject",
          element: (
            <>
              {/* <Header /> */}
              <Leads />
            </>
          ),
        },
        {
          path: "/leads/archive",
          element: (
            <>
              {/* <Header /> */}
              <Leads />
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
      path: 'unAuthorized',
      element: (
        <UnAuthorizedComponent></UnAuthorizedComponent>
      )
    }
  ]);
  return allRoutes;
};

export default AllRoutes;
