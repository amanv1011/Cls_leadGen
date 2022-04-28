import { Link } from "react-router-dom";

export const cardData = [
  {
    id: 1,
    title: "Active",
    value: 85,
    count: 200,
  },
  {
    id: 2,
    title: "Leads",
    value: 56,
    count: 200,
  },
  {
    id: 3,
    title: " Summary",
    value: 25,
    count: 200,
  },
];

export const dashboardTabs = [
  {
    label: "Campaign",
    component: Link,
    to: "/leadgen/app/dashboard/campaign",
  },
  {
    label: "Leads",
    component: Link,
    to: "/leadgen/app/dashboard/leads",
  },
];
export const leadsTabs = [
  {
    label: "All",
  },
  {
    label: "UnderReview",
  },
  {
    label: "Approved",
  },
  {
    label: "Rejected",
  },
];
