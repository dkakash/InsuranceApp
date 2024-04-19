const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const multer = require('multer');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'insuranceApp',
});

mongoose.connect('mongodb://localhost:27017/insurance', { useNewUrlParser: true, useUnifiedTopology: true });


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Uploads directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

class User {
    constructor(uid,username, password, usertype) {
      this.uid = uid;
      this.username = username;
      this.password = password;
      this.usertype = usertype;
    }
  }

  // Function to generate a unique 3-character request ID
function generateRequestID() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // Use characters for the ID
  let requestID = '';
  for (let i = 0; i < 3; i++) {
    requestID += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return requestID;
}

const healthSchema = new mongoose.Schema({
  requestID:String,
  uid:Number,
  userType: String,
  firstName :String,
  lastName:String,
  email:String,
  phone:Number,
  age:Number,
  gender:String,
  smoker:String,
  preExistingConditions:String,
  coverageAmount:Number,
  idDocument: String,
  status:String,
  type:String,
});

const healthModel = mongoose.model('HealthInsurance', healthSchema);

// // POST endpoint to add a health insurance request
// app.post('/api/healthInsurance', async (req, res) => {
//   const {
//     uid,
//     userType,
//     firstName,
//     lastName,
//     email,
//     phone,
//     age,
//     gender,
//     smoker,
//     preExistingConditions,
//     coverageAmount,
//     status,
//     type,
//   } = req.body;

//   try {
//     // Generate a unique request ID
//     const requestID = generateRequestID();

//     // Create a new health insurance document with the unique request ID
//     const healthInsurance = new healthModel({
//       requestID,
//       uid,
//       userType,
//       firstName,
//       lastName,
//       email,
//       phone,
//       age,
//       gender,
//       smoker,
//       preExistingConditions,
//       coverageAmount,
//       status,
//       type,
//     });

//     // Save the health insurance document to the database
//     await healthInsurance.save();
//     res.status(201).send('Request added successfully');
//   } catch (error) {
//     console.error('Error adding health insurance request:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

app.post('/api/healthInsurance', upload.single('idDocument'), async (req, res) => {
      // Generate a unique request ID
    const requestID = generateRequestID();
  const {
    uid,
    firstName,
    lastName,
    email,
    phone,
    age,
    gender,
    smoker,
    preExistingConditions,
    coverageAmount,
  } = req.body;

  const { path } = req.file; // Uploaded file path

  try {
    const newHealthInsurance = new healthModel({
      requestID,
      uid,
      firstName,
      lastName,
      email,
      phone,
      age,
      gender,
      smoker,
      preExistingConditions,
      coverageAmount,
      idDocument: path, // Save the file path in MongoDB
      status: 'Submitted',
      type: 'Health',
    });

    await newHealthInsurance.save();
    res.status(201).send('Request added successfully');
  } catch (error) {
    console.error('Error adding health insurance request:', error);
    res.status(500).send('Internal Server Error');
  }
});


  // app.post('/api/healthInsurance', async (req, res) => {
  //   const {
  //       uid,
  //       userType,
  //       firstName,
  //       lastName,
  //       email,
  //       phone,
  //       age,
  //       gender,
  //       smoker,
  //       preExistingConditions,
  //       coverageAmount,
  //       status,
  //   } = req.body;
  
  //   try {
  //     const healthInsurance = new healthModel({
  //       uid,
  //       userType,
  //       firstName,
  //       lastName,
  //       email,
  //       phone,
  //       age,
  //       gender,
  //       smoker,
  //       preExistingConditions,
  //       coverageAmount,
  //       status,
  //     });
  
  //     await healthInsurance.save();
  //     res.status(201).send('Request added successfully');
  //   } catch (error) {
  //     console.error('Error adding review:', error);
  //     res.status(500).send('Internal Server Error');
  //   }
  // });

  //Get all insurances for an agent
  app.get('/api/healthInsurance', async (req, res) => {
    try {  
        const healthInsurances = await healthModel.find();
        if (!healthInsurances || healthInsurances.length === 0) {
            return res.status(404).json({ message: 'No health insurance records found' });
        }
        res.status(200).json(healthInsurances);
    } catch (error) {
        console.error('Error retrieving health insurance records:', error);  
        res.status(500).send('Internal Server Error');
    }
});

// GET endpoint to retrieve health insurance records by uid
app.get('/api/user/healthInsurance', async (req, res) => {
  const { uid } = req.query;

  try {
    // Validate uid parameter
    if (!uid) {
      return res.status(400).json({ message: 'UID parameter is required' });
    }

    // Find health insurance records by uid
    const healthInsurances = await healthModel.find({ uid });

    // Check if any records are found
    if (!healthInsurances || healthInsurances.length === 0) {
      return res.status(404).json({ message: 'No health insurance records found for this user' });
    }

    // Return the found health insurance records
    res.status(200).json(healthInsurances);
  } catch (error) {
    console.error('Error retrieving health insurance records:', error);
    res.status(500).send('Internal Server Error');
  }
});

// PATCH endpoint to update the status of a health insurance record by requestID
app.patch('/api/healthInsurance/:requestID', async (req, res) => {
  const { requestID } = req.params;
  const { status } = req.body;

  try {
    // Validate requestID parameter
    if (!requestID) {
      return res.status(400).json({ message: 'RequestID parameter is required' });
    }

    // Validate status parameter
    if (!status) {
      return res.status(400).json({ message: 'Status parameter is required' });
    }

    // Find the health insurance record by requestID
    const healthInsurance = await healthModel.findOne({ requestID });

    // Check if the health insurance record exists
    if (!healthInsurance) {
      return res.status(404).json({ message: 'Health insurance record not found' });
    }

    // Update the status of the health insurance record
    healthInsurance.status = status;
    await healthInsurance.save();

    // Return the updated health insurance record
    res.status(200).json({ message: 'Status updated successfully', healthInsurance });
  } catch (error) {
    console.error('Error updating health insurance status:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/api/registerUser', (req, res) => {
    const { username, password, repassword, usertype } = req.body;
  
    const registerUserQuery =
      'INSERT INTO registration (username, password, repassword, usertype) VALUES (?, ?, ?, ?)';
  
    db.query(registerUserQuery, [username, password, repassword, usertype], (err, result) => {
      if (err) {
        console.error('Error registering user:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.status(200).send('User registered successfully');
      }
    });
  });

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
  
    const selectUserQuery = 'SELECT * FROM registration WHERE username = ? AND password = ?';
  
    db.query(selectUserQuery, [username, password], (err, results) => {
      if (err) {
        console.error('Error selecting user:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(results)
        if (results.length > 0) {
          const user = new User(
            results[0].uid,
            results[0].username,
            results[0].password,
            results[0].usertype
          );
          console.log(user);
          res.send({
            status:200,
            message:"Login Successful",
            data:{user}
          });
        //   res.status(200).json({ user });
        } else {
          res.status(401).send('Invalid credentials');
        }
      }
    });
    
  });

  

  const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
