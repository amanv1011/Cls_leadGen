import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Leads2 from "../pageComponents/leads2";
import Dashboard from "../pageComponents/dashboard";
import Header from "../themeComponents/header";
import Campaign from "../pageComponents/campaign/index";
import Leads from "../pageComponents/leads";

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
              <Header />
              <Leads />
            </>
          ),
        },
        // removable block
        {
          path: "/leads2",
          element: (
            <>
              <Header />
              <Leads2 />
            </>
          ),
        },
        // removable block end
        {
          path: "/campaign",
          element: (
            <>
              <Header />
              <Campaign />
            </>
          ),
        },
        {
          path: "/leads/all",
          element: (
            <>
              <Header />
              <Leads />
            </>
          ),
        },
        {
          path: "/leads/underreview",
          element: (
            <>
              <Header />
              <Leads />
            </>
          ),
        },
        {
          path: "/leads/approve",
          element: (
            <>
              <Header />
              <Leads />
            </>
          ),
        },
        {
          path: "/leads/reject",
          element: (
            <>
              <Header />
              <Leads />
            </>
          ),
        },
        {
          path: "/leads/archive",
          element: (
            <>
              <Header />
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
  ]);
  return allRoutes;
};

export default AllRoutes;
