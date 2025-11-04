import React from "react";
import { Grid } from "@mui/material";

import ProgressOverview from "./components/ProgressOverview";
import UpcomingEvents from "./components/UpcomingEvents";
import SystemStats from "./components/SystemStats";
import QuickActions from "./components/QuickActions";
import RecentActivities from "./components/RecentActivities";
import MetricCards from "./components/MetricCards";

import {
  People,
  Assessment,
  MonetizationOn,
  Feedback,
  TrendingUp,
  PersonAdd,
  Storage,
} from "@mui/icons-material";


import { red, blue, green, orange, teal, cyan, lime, blueGrey } from "@mui/material/colors";

const metrics = [
  { title: "Users", value: "1,024", color: "primary", icon: <People />, trend: "up", change: 12 },
  { title: "Reports", value: "256", color: "secondary", icon: <Assessment />, trend: "down", change: 3 },
  { title: "Revenue", value: "$12k", color: "success", icon: <MonetizationOn />, trend: "up", change: 18 },
  { title: "Feedback", value: "85%", color: "warning", icon: <Feedback />, trend: "up", change: 5 },
  { title: "Active Sessions", value: "342", color: "info", icon: <TrendingUp />, trend: "up", change: 8 },
  { title: "New Signups", value: "120", color: "error", icon: <PersonAdd />, trend: "up", change: 20 },
  { title: "Server Load", value: "72%", color: "secondary", icon: <Storage />, trend: "down", change: 10 },
];

const recentActivities = [
  "Alice logged in",
  "Bob submitted a report",
  "Charlie updated profile",
  "Diana uploaded a file",
  "New user signed up",
  "Server restarted",
  "Backup completed",
];

const upcomingEvents = [
  { title: "Team Meeting", date: "2025-10-15", time: "4:30 PM" },
  { title: "Server Maintenance", date: "2025-10-18", time: "4:30 PM" },
  { title: "Report Deadline", date: "2025-10-20", time: "4:30 PM" },
];

const actions = [
  { title: "Add New User", color: teal['A700'], hoverColor: blue[700] },
  { title: "Generate Report", color:cyan['A700'], hoverColor: orange[600] },
  { title: "Backup Now", color: lime['A700'], hoverColor: red[600] },
  { title: "Server Maintenance", color: red.A700, hoverColor: green[700] },
];

const Dashboard = () => (
  <Grid container spacing={2}>
    <MetricCards metrics={metrics} />
    <Grid item xs={12} md={8}>
      <ProgressOverview />
    </Grid>
    <Grid item xs={12} md={8}>
      <UpcomingEvents events={upcomingEvents} />
    </Grid>
    <Grid item xs={12} md={4}>
      <SystemStats />
    </Grid>
    <Grid item xs={12} md={4}>
      <QuickActions actions={actions} />
    </Grid>
    <RecentActivities recentActivities={recentActivities} />
  </Grid>
);

export default Dashboard;
