
import {
   Box,
   Card,
   CardContent,
   Typography,
   TextField,
   MenuItem,
   Button,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   Paper,
   Grid
 } from "@mui/material";
import { blueGrey } from '@mui/material/colors';
import React from 'react';

// Sample data
const reportData = [
   { id: 1, name: "John Doe", department: "Sales", sales: 5000 },
   { id: 2, name: "Jane Smith", department: "Marketing", sales: 7000 },
   { id: 3, name: "Mike Johnson", department: "IT", sales: 3000 },
 ];
 
 const departments = ["All", "Sales", "Marketing", "IT"];

const ReportPage = () => {
   const [selectedDept, setSelectedDept] = React.useState("All");
  const [filteredData, setFilteredData] = React.useState(reportData);

  const handleFilter = () => {
    if (selectedDept === "All") {
      setFilteredData(reportData);
    } else {
      setFilteredData(reportData.filter((item) => item.department === selectedDept));
    }
  };

  const totalSales = filteredData.reduce((sum, item) => sum + item.sales, 0);






  return (
    <Box>
       <Typography variant="h4" gutterBottom>
        Sales Report
      </Typography>

      {/* Filter Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <TextField
                select
                fullWidth
                label="Department"
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
              >
                {departments.map((dept) => (
                  <MenuItem key={dept} value={dept}>
                    {dept}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button variant="contained" color="primary" onClick={handleFilter}>
                Apply
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">Total Sales: ${totalSales}</Typography>
        </CardContent>
      </Card>

        

    </Box>
  )
}

export default ReportPage;