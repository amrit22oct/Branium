import React from "react";
import {
  Grid,
  Paper,
  Typography,
  Box,
  LinearProgress,
  Chip,
} from "@mui/material";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";

const MetricCards = ({ metrics }) => (
<Grid container spacing={3} justifyContent="flex-start" alignItems="center" sx={{width:"100%"}}  >
    {metrics.map((card, i) => (
      <Grid item xs={12} sm={6} md={3} key={i}>
        <Paper
          sx={{
            p: 3,
            
            borderRadius: 3,
            textAlign: "center",
            transition: "all 0.3s ease",
            "&:hover": { transform: "translateY(-6px)", boxShadow: 6 },
            "& .MuiTypography-h6": { fontWeight: "bold", textTransform: "uppercase" },
            "& .MuiTypography-h4": { fontWeight: "bold" },
            "& .MuiChip-root": { mt: 2, fontWeight: "bold" },
            "& .icon": { fontSize: 40, mb: 2 },
          }}
        >
          <Box className="icon">{card.icon}</Box>
          <Typography variant="h6">{card.title}</Typography>
          <Typography
            variant="h4"
            color={`${card.color}.main`}
            sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1 }}
          >
            {card.value}
            {card.trend === "up" ? (
              <ArrowUpward fontSize="small" sx={{ color: "green" }} />
            ) : (
              <ArrowDownward fontSize="small" sx={{ color: "red" }} />
            )}
          </Typography>
          {card.change > 0 && (
            <Typography variant="body2" color="text.secondary">
              Change: {card.change}%
            </Typography>
          )}
          <Box sx={{ width: "100%", mt: 2 }}>
            <LinearProgress
              variant="determinate"
              value={card.change}
              color={card.color}
              sx={{ height: 10, borderRadius: 5 }}
            />
          </Box>
          <Chip label="View Details" color={card.color} onClick={()=> alert(`${card.title} clicked`)} />
        </Paper>
      </Grid>
    ))}
  </Grid>
);

export default MetricCards;
