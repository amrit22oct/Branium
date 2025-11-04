import React from "react";
import { Paper, Typography, LinearProgress, Box } from "@mui/material";

const SystemStats = () => {
  const stats = [
    { label: "CPU Usage", value: 68, color: "error" },
    { label: "Memory Usage", value: 75, color: "warning" },
    { label: "Disk Usage", value: 55, color: "primary" },
  ];

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        System Stats
      </Typography>
      {stats.map((stat, i) => (
        <Box key={i} sx={{ mb: 2 }}>
          <Typography>{stat.label}: {stat.value}%</Typography>
          <LinearProgress
            variant="determinate"
            value={stat.value}
            color={stat.color}
            sx={{ height: 10, borderRadius: 5 }}
          />
        </Box>
      ))}
    </Paper>
  );
};

export default SystemStats;
