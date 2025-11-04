import React from "react";
import { Paper, Typography, List, ListItem, ListItemText } from "@mui/material";
import { Event } from "@mui/icons-material";

const UpcomingEvents = ({ events }) => (
  <Paper sx={{ p: 3 }}>
    <Typography variant="h6" gutterBottom>
      Upcoming Events
    </Typography>
    <List>
      {events.map((event, i) => (
        <ListItem key={i}>
          <Event sx={{ mr: 2 }} />
          <ListItemText
  primary={event.title}
  secondary={`${event.date} • ${event.time}`}
/>

        </ListItem>
      ))}
    </List>
  </Paper>
);

export default UpcomingEvents;
