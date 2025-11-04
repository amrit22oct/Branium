import React from "react";
import { Paper, Typography, LinearProgress, Box } from "@mui/material";

const ProgressOverview = () => {
  const progressData = [
    { title: "Project Completion", value: 75, color: "success" },
    { title: "Server Utilization", value: 60, color: "warning" },
    { title: "Tasks Completed", value: 90, color: "primary" },
  ];

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Progress Overview
      </Typography>
      {progressData.map((progress, i) => (
        <Box sx={{ mb: 2 }} key={i}>
          <Typography>{progress.title}</Typography>
          <LinearProgress
            variant="determinate"
            value={progress.value}
            color={progress.color}
            sx={{ height: 10, borderRadius: 5 }}
          />
          <Typography variant="body2" color="text.secondary">
            {progress.value}%
          </Typography>
        </Box>
      ))}
    </Paper>
  );
};

export default ProgressOverview;
