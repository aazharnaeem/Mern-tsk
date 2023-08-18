import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { AppAppBar } from '../view';
import withRoot from '../module/withRoot';
import MuiLink from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";

function PaymentUnsuccessfulPage() {
  return (
    <Container>
      <AppAppBar />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Payment Unsuccessful
        </Typography>
        <Typography variant="body1" gutterBottom>
          We're sorry, but your payment was unsuccessful.
        </Typography>
        <Typography variant="body2" gutterBottom>
          Please try again or contact customer support if you continue to experience issues.
        </Typography>
        <MuiLink
          component={RouterLink}
          to="/subscription"
          sx={{
            display: 'inline-block',
            marginTop: 3,
            padding: '10px 20px',
            backgroundColor: 'black', // Change to your desired color
            color: 'white',
            textDecoration: 'none',
            borderRadius: 4,
            '&:hover': {
              backgroundColor: '#d32f2f', // Change hover color
            },
          }}
        >
          Back to Subscriptions
        </MuiLink>
      </Box>
    </Container>
  );
}

export default withRoot(PaymentUnsuccessfulPage);
