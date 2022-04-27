import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Leads from "../pageComponents/leads";
import Dashboard from "../pageComponents/dashboard";
import Header from "../themeComponents/header";
import Campaign from "../pageComponents/campaign/index";

const AllRoutes = () => {
  const allRoutes = useRoutes([

    {
      path: "/app/dashboard",
      element: <Dashboard />,
      children: [
        {
          path: "/app/dashboard/leads",
          element: (
            <>
              <Header />
              <Leads />{" "}
            </>
          ),
        },
        {
          path: "/app/dashboard/campaign",
          element: (
            <>
              <Header />
              <Campaign />{" "}
            </>
          ),
        },
        {
          path: "/app/dashboard/leads/all",
          element: (
            <>
              <Header />
              <Leads />{" "}
            </>
          ),
        },
        {
          path: "/app/dashboard/leads/underreview",
          element: (
            <>
              <Header />
              <Leads />{" "}
            </>
          ),
        },
        {
          path: "/app/dashboard/leads/approve",
          element: (
            <>
              <Header />
              <Leads />{" "}
            </>
          ),
        },
        {
          path: "/app/dashboard/leads/reject",
          element: (
            <>
              <Header />
              <Leads />{" "}
            </>
          ),
        },
        {
          path: "/app/dashboard/leads/archive",
          element: (
            <>
              <Header />
              <Leads />{" "}
            </>
          ),
        },

      ],
    },
    {
      path: "*",
      element: <Navigate to="/app/dashboard" />,
    },
  ]);
  return allRoutes;
};

export default AllRoutes;
