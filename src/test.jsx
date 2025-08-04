import React from 'react';
import { Button, Typography,TextField, Container,Grid,Box } from '@mui/material';

export default function Test() {
    const [Username, setUsername] = React.useState('');
  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center', mt: 10, backgroundColor: '#f5f5f5', padding: 4, borderRadius: 2 }}>
      <Typography variant="h1" gutterBottom>
        Hello Material UI!
      </Typography>
      <Button variant="contained" color="primary"  >
        Click Me
      </Button> <br />
      <TextField label="Name" variant="outlined" />
      <TextField
  label="Message"
  multiline
  rows={2}
  variant="outlined"
/>
<TextField
  label="Username"
  variant="outlined"
  value={Username}
  onChange={(e) => setUsername(e.target.value)}
  fullWidth
  required
  helperText="Enter your username"
  error={Username.length<5}
  />
  <Box display="flex" justifyContent="space-evenly" alignItems="center">
  <div>Left</div>
  <div>Right</div>
</Box>

<Grid container spacing={2}>
  <Grid item xs={12} sm={6} md={4}>
    Item 1
  </Grid>
  <Grid item xs={12} sm={6} md={4}>
    Item 2
  </Grid>
  <Grid item xs={12} sm={12} md={4}>
    Item 3
  </Grid>
</Grid>
<Box sx={{ p: 2 }}>
  <Grid container spacing={2}>
    <Grid item xs={4}>
      <Box sx={{ bgcolor: 'lightblue', p: 2 }}>Item 1</Box>
    </Grid>
    <Grid item xs={4}>
      <Box sx={{ bgcolor: 'lightgreen', p: 2 }}>Item 2</Box>
    </Grid>
    <Grid item xs={4}>
      <Box sx={{ bgcolor: 'lightcoral', p: 2 }}>Item 3</Box>
    </Grid>
  </Grid>
</Box>

    </Container>
  );
}

