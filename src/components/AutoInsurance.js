// import React, { useState } from 'react';
// import {
//   Container,
//   Typography,
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   TextField,
//   Button,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
// } from '@mui/material';
// import './AutoInsurance.css';

// const AutoInsurance = () => {
//   const [insuranceQuote, setInsuranceQuote] = useState(null);
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     age: '',
//     gender: '',
//     vehicleMake: '',
//     vehicleModel: '',
//     vehicleYear: '',
//     vehicleValue: '',
//     coverageAmount: '',
//     vehicleType: '',
//     milesDriven: '',
//     zipCode: '',
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Simulate generating a dummy insurance quote
//     const dummyQuote = {
//       coverageType: 'Comprehensive',
//       annualPremium: Math.floor(Math.random() * 1000 + 500), // Generate a random premium between 500 and 1500
//       deductible: 500, // Dummy deductible amount
//       policyLimit: 10000, // Dummy policy limit amount
//     };
//     setInsuranceQuote(dummyQuote);
//     setFormData({
//       firstName: '',
//       lastName: '',
//       email: '',
//       phone: '',
//       age: '',
//       gender: '',
//       vehicleMake: '',
//       vehicleModel: '',
//       vehicleYear: '',
//       vehicleValue: '',
//       coverageAmount: '',
//       vehicleType: '',
//       milesDriven: '',
//       zipCode: '',
//     });
//   };

//   return (
//     <Container maxWidth="md" sx={{ py: 4 }}>
//       <Card
//         sx={{
//           backgroundColor: '#f9f9f9',
//           borderRadius: 8,
//           boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//           padding: 2,
//         }}
//       >
//         <CardContent>
//           <Typography variant="h4" gutterBottom>
//             Get Automobile Insurance Quotes
//           </Typography>
//           <form onSubmit={handleSubmit} className="insurance-form">
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="First Name"
//                   name="firstName"
//                   value={formData.firstName}
//                   onChange={handleChange}
//                   fullWidth
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Last Name"
//                   name="lastName"
//                   value={formData.lastName}
//                   onChange={handleChange}
//                   fullWidth
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Email"
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   fullWidth
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Phone"
//                   type="tel"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   fullWidth
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Age"
//                   type="number"
//                   name="age"
//                   value={formData.age}
//                   onChange={handleChange}
//                   fullWidth
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <FormControl fullWidth required>
//                   <InputLabel>Gender</InputLabel>
//                   <Select
//                     name="gender"
//                     value={formData.gender}
//                     onChange={handleChange}
//                   >
//                     <MenuItem value="male">Male</MenuItem>
//                     <MenuItem value="female">Female</MenuItem>
//                     <MenuItem value="other">Other</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Vehicle Make"
//                   name="vehicleMake"
//                   value={formData.vehicleMake}
//                   onChange={handleChange}
//                   fullWidth
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Vehicle Model"
//                   name="vehicleModel"
//                   value={formData.vehicleModel}
//                   onChange={handleChange}
//                   fullWidth
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Vehicle Year"
//                   type="number"
//                   name="vehicleYear"
//                   value={formData.vehicleYear}
//                   onChange={handleChange}
//                   fullWidth
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Vehicle Value"
//                   type="number"
//                   name="vehicleValue"
//                   value={formData.vehicleValue}
//                   onChange={handleChange}
//                   fullWidth
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <FormControl fullWidth required>
//                   <InputLabel>Vehicle Type</InputLabel>
//                   <Select
//                     name="vehicleType"
//                     value={formData.vehicleType}
//                     onChange={handleChange}
//                   >
//                     <MenuItem value="car">Car</MenuItem>
//                     <MenuItem value="truck">Truck</MenuItem>
//                     <MenuItem value="bike">Bike</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Miles Driven Annually"
//                   type="number"
//                   name="milesDriven"
//                   value={formData.milesDriven}
//                   onChange={handleChange}
//                   fullWidth
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Zip Code"
//                   name="zipCode"
//                   value={formData.zipCode}
//                   onChange={handleChange}
//                   fullWidth
//                   required
//                 />
//               </Grid>
//             </Grid>
//             <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
//               Submit Request
//             </Button>
//           </form>
//         </CardContent>
//       </Card>

//       {/* Display insurance quote if available */}
//       {insuranceQuote && (
//         <Box mt={4}>
//           <Card>
//             <CardContent>
//               <Typography variant="h5" gutterBottom>
//                 Insurance Quote
//               </Typography>
//               <Typography variant="body1">Coverage Type: {insuranceQuote.coverageType}</Typography>
//               <Typography variant="body1">Annual Premium: ${insuranceQuote.annualPremium}</Typography>
//               <Typography variant="body1">Deductible: ${insuranceQuote.deductible}</Typography>
//               <Typography variant="body1">Policy Limit: ${insuranceQuote.policyLimit}</Typography>
//             </CardContent>
//           </Card>
//         </Box>
//       )}
//     </Container>
//   );
// };

// export default AutoInsurance;



import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import './AutoInsurance.css';

const AutoInsurance = () => {
  const [insuranceQuote, setInsuranceQuote] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    vehicleValue: '',
    coverageAmount: '',
    vehicleType: '',
    milesDriven: '',
    zipCode: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate generating a dummy insurance quote
    const dummyQuote = {
      coverageType: 'Comprehensive',
      annualPremium: Math.floor(Math.random() * 1000 + 500), // Generate a random premium between 500 and 1500
      deductible: 500, // Dummy deductible amount
      policyLimit: 10000, // Dummy policy limit amount
    };
    setInsuranceQuote(dummyQuote);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      age: '',
      gender: '',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      vehicleValue: '',
      coverageAmount: '',
      vehicleType: '',
      milesDriven: '',
      zipCode: '',
    });
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card
        sx={{
          backgroundColor: '#f9f9f9',
          borderRadius: 8,
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          padding: 2,
        }}
      >
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Get Automobile Insurance Quotes
          </Typography>
          <Typography variant="body1" paragraph>
            Auto insurance provides financial protection against physical damage and bodily injury resulting from traffic
            collisions and other incidents involving automobiles. It covers the insured party, insured vehicle, and
            third parties (other vehicles and people).
          </Typography>
          <Typography variant="body1" paragraph>
            Auto insurance is important because it helps to mitigate financial losses in the event of accidents,
            theft, or other unexpected incidents involving your vehicle. It can cover repairs to your vehicle,
            medical expenses for injuries, and liability for damages caused to others.
          </Typography>
          <form onSubmit={handleSubmit} className="insurance-form">
            <Grid container spacing={2}>
              {/* Form fields here */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Age"
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Vehicle Make"
                  name="vehicleMake"
                  value={formData.vehicleMake}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Vehicle Model"
                  name="vehicleModel"
                  value={formData.vehicleModel}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Vehicle Year"
                  type="number"
                  name="vehicleYear"
                  value={formData.vehicleYear}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Vehicle Value"
                  type="number"
                  name="vehicleValue"
                  value={formData.vehicleValue}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Vehicle Type</InputLabel>
                  <Select
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleChange}
                  >
                    <MenuItem value="car">Car</MenuItem>
                    <MenuItem value="truck">Truck</MenuItem>
                    <MenuItem value="bike">Bike</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Miles Driven Annually"
                  type="number"
                  name="milesDriven"
                  value={formData.milesDriven}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Zip Code"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
              Get Quote
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Display insurance quote if available */}
      {insuranceQuote && (
        <Box mt={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Insurance Quote
              </Typography>
              <Typography variant="body1">Coverage Type: {insuranceQuote.coverageType}</Typography>
              <Typography variant="body1">Annual Premium: ${insuranceQuote.annualPremium}</Typography>
              <Typography variant="body1">Deductible: ${insuranceQuote.deductible}</Typography>
              <Typography variant="body1">Policy Limit: ${insuranceQuote.policyLimit}</Typography>
            </CardContent>
          </Card>
        </Box>
      )}
    </Container>
  );
};

export default AutoInsurance;
