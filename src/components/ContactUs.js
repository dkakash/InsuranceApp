import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import './ContactUs.css'; // Importing the CSS file for additional styling

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission logic here, e.g., sending data to backend
    console.log(formData);
    // Reset form fields after submission
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box
        sx={{
          backgroundColor: '#f9f9f9',
          padding: 4,
          borderRadius: 8,
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Contact Us
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            id="name"
            name="name"
            label="Your Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            id="email"
            name="email"
            label="Your Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            id="message"
            name="message"
            label="Message"
            multiline
            rows={5}
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>

        {/* Additional content below the form */}
        <Box mt={4}>
          <Typography variant="body1">
            Have questions about our services? Feel free to contact us using the form above.
            We're here to assist you with any inquiries regarding insurance coverage and more.
          </Typography>
          <Typography variant="body1" mt={2}>
            You can also reach us via phone at <strong>(123) 456-7890</strong> or email us
            directly at <strong>info@example.com</strong>.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default ContactUs;
