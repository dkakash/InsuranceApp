import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent } from '@mui/material';

const AboutUs = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card
        sx={{
          backgroundColor: '#f9f9f9',
          borderRadius: 8,
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        <CardContent>
          <Typography variant="h4" gutterBottom>
            About Our Company
          </Typography>
          <Typography variant="body1" paragraph>
            We are dedicated to providing comprehensive insurance solutions for your health and automobiles.
            Our goal is to make insurance shopping easy and accessible for everyone.
          </Typography>
          <Typography variant="body1" paragraph>
            At XYZ Insurance, we understand the importance of personalized service. Whether you're looking
            for health coverage or auto insurance, we offer tailored options to meet your needs.
          </Typography>
          <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>
            What We Offer:
          </Typography>
          <Grid container spacing={2}>
            {[
              'Competitive rates for health and auto insurance',
              'Customizable coverage options',
              'Easy online quote process',
              'Simple policy management',
              'Expert customer support',
            ].map((item, index) => (
              <Grid item xs={12} key={index}>
                <Box
                  sx={{
                    backgroundColor: '#ffffff',
                    borderRadius: 4,
                    padding: 2,
                  }}
                >
                  <Typography variant="body1">{item}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
          <Typography variant="body1" sx={{ mt: 3 }}>
            We believe insurance should be straightforward. That's why we're committed to providing
            transparent policies and helping you find the best coverage for your budget.
          </Typography>
        </CardContent>
      </Card>

      {/* Additional Content Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Why Choose XYZ Insurance?
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Personalized Service
                </Typography>
                <Typography variant="body2">
                  We prioritize personalized service to ensure that your insurance needs are met with
                  care and attention.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Transparent Policies
                </Typography>
                <Typography variant="body2">
                  We believe in transparency and strive to provide clear and honest insurance policies
                  that meet your expectations.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AboutUs;
