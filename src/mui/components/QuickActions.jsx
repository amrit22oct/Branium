import React from "react";
import { Paper, Typography, Button } from "@mui/material";

const Click = (title) => alert(`"${title}" button clicked!`);

const QuickActions = ({ actions }) => {
  return (
    <Paper
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mb: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Quick Actions
      </Typography>

      {actions.map((action, i) => (
        <Button
          key={i}
          variant="contained"
          onClick={() => Click(action.title)}
          sx={{
            backgroundColor: action.color,
            color: "#fff",
            "&:hover": {
              backgroundColor: action.hoverColor || action.color,
            },
          }}
        >
          {action.title}
        </Button>
      ))}
    </Paper>
  );
};

export default QuickActions;
