import React from "react";
import {
  Box, AppBar, Toolbar, Typography, Drawer, List,
  ListItem, ListItemIcon, ListItemText, CssBaseline,
  Divider, Button
} from "@mui/material";
import {
  Dashboard as DashboardIcon, People, BarChart,
  Settings, TableChart, Notifications
} from "@mui/icons-material";

const drawerWidth = 240;

const SidebarLayout = ({ children, menuItems, currentPage, setPage }) => (
  <Box sx={{ display: "flex" }}>
    <CssBaseline />
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6">Dashboard </Typography>
        <Button color="inherit" startIcon={<Notifications />}>Notifications</Button>
      </Toolbar>
    </AppBar>

    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <Divider />
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            button
            key={item}
            onClick={() => setPage(item)}
            selected={currentPage === item}
          >
            <ListItemIcon>
              {[<DashboardIcon />, <People />, <BarChart />, <TableChart />, <Settings />][index]}
            </ListItemIcon>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    </Drawer>

    <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
      <Toolbar />
      {children}
    </Box>
  </Box>
);

export default SidebarLayout;
