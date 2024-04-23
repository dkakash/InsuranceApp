import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const UserHealthInsuranceRecords = () => {
  const [healthInsurances, setHealthInsurances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Retrieve user information (uid) from session storage
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const { uid } = user;

      // Fetch health insurance records for the current user
      const fetchHealthInsurances = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/user/healthInsurance?uid=${uid}`);
          setHealthInsurances(response.data); // Assuming API response contains an array of records
          setLoading(false);
        } catch (error) {
          console.error('Error fetching health insurance records:', error);
          setLoading(false);
        }
      };

      fetchHealthInsurances();
    }
  }, []); // Empty dependency array means this effect runs once after initial render

  return (
    <div>
      <h2>Insurance Requests</h2>
      {loading ? (
        <p>Loading...</p>
      ) : healthInsurances.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Request ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Smoker</th>
              <th>Pre-Existing Conditions</th>
              <th>Coverage Amount</th>
              <th>Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {healthInsurances.map((insurance) => (
              <tr key={insurance._id}>
                <td>{insurance.requestID}</td>
                <td>{insurance.firstName}</td>
                <td>{insurance.lastName}</td>
                <td>{insurance.email}</td>
                <td>{insurance.phone}</td>
                <td>{insurance.age}</td>
                <td>{insurance.gender}</td>
                <td>{insurance.smoker}</td>
                <td>{insurance.preExistingConditions}</td>
                <td>{insurance.coverageAmount}</td>
                <td>{insurance.type}</td>
                <td>
                    {insurance.status === 'Quotes Ready' ? (
                      <Link to={`/user/quotes/${insurance.requestID}`}><button>View Quotes</button></Link>
                    ) : (
                      <span>{insurance.status}</span>
                    )}
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No health insurance records found.</p>
      )}
    </div>
  );
};

export default UserHealthInsuranceRecords;
