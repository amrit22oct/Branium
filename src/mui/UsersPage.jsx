import React from "react";
import {
  Paper, Typography, TableContainer, Table, TableHead,
  TableRow, TableCell, TableBody, Chip, Avatar, Button, Box
} from "@mui/material";

const users = [
  { id: 1, name: "Alice", role: "Admin", status: "Active" },
  { id: 2, name: "Bob", role: "Editor", status: "Inactive" },
  { id: 3, name: "Charlie", role: "Viewer", status: "Active" },
  { id: 4, name: "Diana", role: "Admin", status: "Active" },
];

const roleColors = {
  Admin: "error",
  Editor: "warning",
  Viewer: "info",
};

const UsersPage = () => {
  return (
    <Paper sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Users Overview</Typography>
        <Button variant="contained" color="primary">New User</Button>
      </Box>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((u, index) => (
              <TableRow
                key={u.id}
                sx={{
                  "&:hover": { backgroundColor: "action.hover" },
                  backgroundColor: index % 2 === 0 ? "background.paper" : "grey.50"
                }}
              >
                <TableCell>{u.id}</TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Avatar sx={{ mr: 1, bgcolor: "primary.main" }}>{u.name[0]}</Avatar>
                    {u.name}
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip label={u.role} color={roleColors[u.role]} />
                </TableCell>
                <TableCell>
                  <Chip
                    label={u.status}
                    color={u.status === "Active" ? "success" : "error"}
                  />
                </TableCell>
                <TableCell>
                  <Box display="flex" gap={1}>
                    <Button variant="outlined" size="small" color="primary">Edit</Button>
                    <Button variant="outlined" size="small" color="error">Delete</Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default UsersPage;
