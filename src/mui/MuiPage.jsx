import React, { useState } from "react";
import { Grid, Paper, Typography, Chip, Box, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Avatar } from "@mui/material";
import Dashboard from "./Dashboard";
import UsersPage from "./UsersPage";
import SidebarLayout from "./SidebarLayout";

import ReportPage from "./Report/index.jsx";

const MuiPage = () => {
  const [page, setPage] = useState("Dashboard");
  const menuItems = ["Dashboard", "Users", "Reports", "Analytics", "Settings"];

  const renderPage = () => {
    switch (page) {
      case "Dashboard": return <Dashboard />;
      case "Users": return <UsersPage />;
      case "Reports": return <ReportPage />
        return (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Reports</Typography>
            <Box sx={{ height: 300, bgcolor: "#f5f5f5", display: "flex", justifyContent: "center", alignItems: "center" }}>
              Reports Chart Placeholder
            </Box>
          </Paper>
        );
      case "Analytics":
        return (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Analytics</Typography>
            <Box sx={{ height: 300, bgcolor: "#f5f5f5", display: "flex", justifyContent: "center", alignItems: "center" }}>
              Analytics Chart Placeholder
            </Box>
          </Paper>
        );
      case "Settings":
        return (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Settings</Typography>
            <Button variant="contained" color="primary">Update Settings</Button>
          </Paper>
        );
      default:
        return null;
    }
  };

  return (
    <SidebarLayout menuItems={menuItems} currentPage={page} setPage={setPage}>
      {renderPage()}
    </SidebarLayout>
  );
};

export default MuiPage;
