import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Leads from "../pageComponents/leads";
import Dashboard from "../pageComponents/dashboard";
import Header from "../themeComponents/header";
import Campaign from "../pageComponents/campaign/index";

const AllRoutes = () => {
  const allRoutes = useRoutes([
    {
      path: "/leadgen",
      element: <Dashboard />,
      children: [
        {
          path: "/leadgen/leads",
          element: (
            <>
              <Header />
              <Leads />
            </>
          ),
        },
        {
          path: "/leadgen/campaign",
          element: (
            <>
              <Header />
              <Campaign />
            </>
          ),
        },
        {
          path: "/leadgen/leads/all",
          element: (
            <>
              <Header />
              <Leads />
            </>
          ),
        },
        {
          path: "/leadgen/leads/underreview",
          element: (
            <>
              <Header />
              <Leads />
            </>
          ),
        },
        {
          path: "/leadgen/leads/approve",
          element: (
            <>
              <Header />
              <Leads />
            </>
          ),
        },
        {
          path: "/leadgen/leads/reject",
          element: (
            <>
              <Header />
              <Leads />
            </>
          ),
        },
        {
          path: "/leadgen/leads/archive",
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
      element: <Navigate to="/leadgen" />,
    },
  ]);
  return allRoutes;
};

export default AllRoutes;
