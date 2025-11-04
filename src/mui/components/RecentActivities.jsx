import React from "react";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  useTheme,
  useMediaQuery,
  Box,
} from "@mui/material";

const RecentActivities = ({ recentActivities }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md")); // md = 900px

  return (
    <Box
      sx={{
        position: isSmallScreen ? "relative" : "absolute",
        top: isSmallScreen ? "auto" : 390,
        right: isSmallScreen ? "auto" : 10,
        width: isSmallScreen ? "100%" : "18%",
        height: isSmallScreen ? "auto" : "60%",
        mb: isSmallScreen ? 3 : 0,
        zIndex: 2, // stays on top when absolute
      }}
    >
      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
          boxShadow: 4,
          bgcolor: "#A8FBD3",
          cursor: "pointer",
          transition: "all 0.3s ease-in-out",
          display: "flex",
          flexDirection: "column",
          maxHeight: 600,
          overflowY: "auto",

          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: 6,
          },

          "& .MuiTypography-root": {
            fontWeight: "bold",
            fontStyle: "italic",
            fontFamily: "monospace",
            textTransform: "uppercase",
            mb: 2,
          },

          "& .MuiListItem-root": {
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              transform: "scale(1.02)",
              boxShadow: 3,
              bgcolor: "action.hover",
            },
          },

          "& .MuiAvatar-root": {
            mr: 2,
            transition: "transform 0.2s ease-in-out",
            "&:hover": {
              transform: "scale(1.05)",
            },
          },
        }}
      >
        <Typography variant="h5" color="primary" gutterBottom>
          Recent Activities
        </Typography>

        <List>
          {recentActivities.map((activity, i) => (
            <React.Fragment key={i}>
              <ListItem>
                <Avatar>{activity[0]}</Avatar>
                <ListItemText primary={activity} />
              </ListItem>
              {i < recentActivities.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default RecentActivities;
