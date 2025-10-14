import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Typography } from '@mui/material';

const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Dark Knight', year: 2008 },
  { label: 'Pulp Fiction', year: 1994 },
];

const MuiPage = () => {
  return (
    <div style={{ padding: 20 }}>
      <Button variant="contained">Hello world</Button>
      <Typography variant="h1" > hiii this is Material ui</Typography>

      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={top100Films}
        getOptionLabel={(option) => option.label}
        sx={{ width: 300, marginTop: 20 }}
        renderInput={(params) => <TextField {...params} label="Movie" />}
      />
    </div>
  );
};

export default MuiPage;
