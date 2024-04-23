const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200' });
const app = express();
const multer = require('multer');
// const { v4: uuidv4 } = require('uuid');
const short = require('short-uuid');

app.use(cors());
app.use(express.json());

// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'root',
//   database: 'insuranceApp',
// });

// mongoose.connect('mongodb://localhost:27017/insurance', { useNewUrlParser: true, useUnifiedTopology: true });


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/Users/akash/Desktop/UML/Project/insurance-app/public/uploads'); // Public uploads directory
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



class healthModel {
  constructor(data) {
    this.requestID = data.requestID;
    this.uid = data.uid;
    this.userType = data.userType;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.phone = data.phone;
    this.age = data.age;
    this.gender = data.gender;
    this.smoker = data.smoker;
    this.annualIncome  = data.annualIncome,
    this.marriageStatus  = data.marriageStatus,
    this.zipCode  = data.zipCode,
    this.preExistingConditions = data.preExistingConditions;
    this.coverageAmount = data.coverageAmount;
    this.idDocument = data.idDocument;
    this.status = data.status || 'Submitted'; // default value
    this.type = data.type || 'Health'; // default value
  }
}

// app.use('/uploads', express.static(__dirname + '/src/uploads'));

// Serve static files from the 'uploads' folder
// app.use('/uploads', express.static(path.join(__dirname, 'src', 'uploads')));

// Route for downloading files
app.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'src', 'uploads', filename);

  // Send the file for download
  res.download(filePath, (err) => {
    if (err) {
      // Handle errors such as file not found
      console.error('Error downloading file:', err);
      res.status(404).send('File not found');
    }
  });
});

// Function to index data into Elasticsearch
async function indexHealthInsurance(data) {
  try {
      const response = await client.index({
          index: 'healthinsurance', // Index name
          body: data
      });
      console.log(`Indexed health insurance data with ID: ${response}`);
  } catch (error) {
      console.error('Error indexing health insurance data:', error);
  }
}


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
      annualIncome,
      marriageStatus,
      zipCode,
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
          annualIncome,
          marriageStatus,
          zipCode,
          preExistingConditions,
          coverageAmount,
          idDocument: path, // Save the file path in MongoDB
          status: 'Submitted',
          type: 'Health',
      });

      // Index data into Elasticsearch
      await indexHealthInsurance(newHealthInsurance);

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



// Assuming you have already set up the Elasticsearch client (`esClient`)

app.get('/api/healthInsurance', async (req, res) => {
  try {
    // Query Elasticsearch for health insurance records
    const body = await client.search({
      index: 'healthinsurance', // Index name
      body: {
        query: {
          match_all: {} // Match all documents
        }
      }
    });

    // Extract hits from the search response
    // console.log('led',body)
    const healthInsurances = body.hits.hits.map(hit => hit._source);

    if (!healthInsurances || healthInsurances.length === 0) {
      return res.status(404).json({ message: 'No health insurance records found' });
    }

    res.status(200).json(healthInsurances);
  } catch (error) {
    console.error('Error retrieving health insurance records:', error);
    res.status(500).send('Internal Server Error');
  }
});


  //Get all insurances for an agent
//   app.get('/api/healthInsurance', async (req, res) => {
//     try {  
//         const healthInsurances = await healthModel.find();
//         if (!healthInsurances || healthInsurances.length === 0) {
//             return res.status(404).json({ message: 'No health insurance records found' });
//         }
//         res.status(200).json(healthInsurances);
//     } catch (error) {
//         console.error('Error retrieving health insurance records:', error);  
//         res.status(500).send('Internal Server Error');
//     }
// });

// // GET endpoint to retrieve health insurance records by uid
// app.get('/api/user/healthInsurance', async (req, res) => {
//   const { uid } = req.query;

//   try {
//     // Validate uid parameter
//     if (!uid) {
//       return res.status(400).json({ message: 'UID parameter is required' });
//     }

//     // Find health insurance records by uid
//     const healthInsurances = await healthModel.find({ uid });

//     // Check if any records are found
//     if (!healthInsurances || healthInsurances.length === 0) {
//       return res.status(404).json({ message: 'No health insurance records found for this user' });
//     }

//     // Return the found health insurance records
//     res.status(200).json(healthInsurances);
//   } catch (error) {
//     console.error('Error retrieving health insurance records:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// GET endpoint to retrieve health insurance records by uid
app.get('/api/user/healthInsurance', async (req, res) => {
  const { uid } = req.query;

  try {
    // Validate uid parameter
    if (!uid) {
      return res.status(400).json({ message: 'UID parameter is required' });
    }

    // Query Elasticsearch for health insurance records by uid
    const body = await client.search({
      index: 'healthinsurance', // Index name
      body: {
        query: {
          match: { uid } // Match documents where uid field equals the provided uid
        }
      }
    });
    console.log('here', body)

    // Extract hits from the search response
    const healthInsurances = body.hits.hits.map(hit => hit._source);

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


// // PATCH endpoint to update the status of a health insurance record by requestID
// app.patch('/api/healthInsurance/:requestID', async (req, res) => {
//   const { requestID } = req.params;
//   const { status } = req.body;

//   try {
//     // Validate requestID parameter
//     if (!requestID) {
//       return res.status(400).json({ message: 'RequestID parameter is required' });
//     }

//     // Validate status parameter
//     if (!status) {
//       return res.status(400).json({ message: 'Status parameter is required' });
//     }

//     // Find the health insurance record by requestID
//     const healthInsurance = await healthModel.findOne({ requestID });

//     // Check if the health insurance record exists
//     if (!healthInsurance) {
//       return res.status(404).json({ message: 'Health insurance record not found' });
//     }

//     // Update the status of the health insurance record
//     healthInsurance.status = status;
//     await healthInsurance.save();

//     // Return the updated health insurance record
//     res.status(200).json({ message: 'Status updated successfully', healthInsurance });
//   } catch (error) {
//     console.error('Error updating health insurance status:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// PATCH endpoint to update the status of a health insurance record by requestID
app.patch('/api/healthInsurance/status/:requestID', async (req, res) => {
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

    // Update the status of the health insurance record by requestID
    const body = await client.search({
      index: 'healthinsurance', // Index name
      body: {
        query: {
          match: { requestID: requestID } // Match documents where requestID field equals the provided requestID
        }
      }
    });
    
    console.log('body', body)

    // Check if any documents are found
    if (body.hits.total.value === 0) {
      return res.status(404).json({ message: 'Health insurance record not found' });
    }


    // Extract the document ID from the search response
    const documentId = body.hits.hits[0]._id;
    console.log('docDID', documentId);
    console.log('docDID', status);
    // Update the status of the health insurance record by document ID
    const updateResponse = await client.update({
      index: 'healthinsurance', // Index name
      id: documentId, // Document ID
      body: {
        doc: {
          status: status
        }
      }
    });

    console.log('docDID', updateResponse);

    // Check if the record was successfully updated
    // Check if the record was successfully updated
if (updateResponse.result === 'updated' || updateResponse.result === 'noop') {
  return res.status(200).json({ message: 'Status updated successfully' });
} else {
  return res.status(404).json({ message: 'Health insurance record not found' });
}
    // Return the updated health insurance record
    // res.status(200).json({ message: 'Status updated successfully' });
  } catch (error) {
    console.error('Error updating health insurance status:', error);
    res.status(500).send('Internal Server Error');
  }
});



// app.post('/api/registerUser', (req, res) => {
//     const { username, password, repassword, usertype } = req.body;
  
//     const registerUserQuery =
//       'INSERT INTO registration (username, password, repassword, usertype) VALUES (?, ?, ?, ?)';
  
//     db.query(registerUserQuery, [username, password, repassword, usertype], (err, result) => {
//       if (err) {
//         console.error('Error registering user:', err);
//         res.status(500).send('Internal Server Error');
//       } else {
//         res.status(200).send('User registered successfully');
//       }
//     });
//   });

// app.post('/api/login', (req, res) => {
//     const { username, password } = req.body;
  
//     const selectUserQuery = 'SELECT * FROM registration WHERE username = ? AND password = ?';
  
//     db.query(selectUserQuery, [username, password], (err, results) => {
//       if (err) {
//         console.error('Error selecting user:', err);
//         res.status(500).send('Internal Server Error');
//       } else {
//         console.log(results)
//         if (results.length > 0) {
//           const user = new User(
//             results[0].uid,
//             results[0].username,
//             results[0].password,
//             results[0].usertype
//           );
//           console.log(user);
//           res.send({
//             status:200,
//             message:"Login Successful",
//             data:{user}
//           });
//         //   res.status(200).json({ user });
//         } else {
//           res.status(401).send('Invalid credentials');
//         }
//       }
//     });
    
//   });



// app.post('/api/registerUser', async (req, res) => {
//     try {
//         const { username, password, repassword, usertype } = req.body;

//         // Generate a unique ID for the user
//         const userId = uuidv4();
//         console.log(userId)

//         // Index the user data into Elasticsearch
//         await client.index({
//             index: 'users',
            
//             body: {
//                 uid: userId,
//                 username,
//                 password,
//                 repassword,
//                 usertype
//             }
//         });

//         res.status(200).send('User registered successfully');
//     } catch (error) {
//         console.error('Error registering user:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });

app.post('/api/registerUser', async (req, res) => {
  try {
      const { username, password, repassword, usertype } = req.body;

      // Generate a unique short UUID for the user
      const userId = short.generate();
      console.log(userId)

      // Index the user data into Elasticsearch
      await client.index({
          index: 'users',
          body: {
              uid: userId,
              username,
              password,
              repassword,
              usertype
          }
      });

      res.status(200).send('User registered successfully');
  } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).send('Internal Server Error');
  }
});

app.post('/api/login', async (req, res) => {
  try {
      const { username, password, usertype } = req.body;

      // Search for the user in Elasticsearch
      const body = await client.search({
          index: 'users',
          body: {
              query: {
                  bool: {
                      must: [
                          { match: { username } },
                          { match: { password } },
                          { match: { usertype } }
                      ]
                  }
              }
          }
      });

      console.log(body);

      if (!body || !body.hits || !body.hits.hits) {
          throw new Error('Invalid response from Elasticsearch');
      }

      const userHits = body.hits.hits;

      if (userHits.length > 0) {
          const user = userHits[0]._source;
          res.send({
              status: 200,
              message: "Login Successful",
              data: { user }
          });
      } else {
          res.status(401).send('Invalid credentials');
      }
  } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).send('Internal Server Error');
  }
});



  

  const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
