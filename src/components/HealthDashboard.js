// import React, { useEffect, useState } from 'react';
// import './HealthDashboard.css'; // Import CSS file for styling

// const HealthDashboard = () => {
//     const [healthInsurances, setHealthInsurances] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage] = useState(5); // Number of items per page
//     const [selectedInsurance, setSelectedInsurance] = useState(null);

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const fetchData = async () => {
//         try {
//             const response = await fetch('http://localhost:8000/api/healthInsurance');
//             const data = await response.json();
//             setHealthInsurances(data);
//         } catch (error) {
//             console.error('Error fetching health insurance data:', error);
//         }
//     };
//     const handleView = async (requestID) => {
//         try {
//             // Update the status of the health insurance request with the specified requestID
//             const response = await fetch(`http://localhost:8000/api/healthInsurance/${requestID}`, {
//                 method: 'PATCH', // Use PATCH method to update existing resource
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ status: 'Reviewed' })
//             });

//             if (response.ok) {
//                 // Update the healthInsurances state to reflect the changed status
//                 const updatedInsurances = healthInsurances.map(insurance => {
//                     if (insurance.requestID === requestID) {
//                         return { ...insurance, status: 'Reviewed' };
//                     }
//                     return insurance;
//                 });
//                 setHealthInsurances(updatedInsurances);
//                 const selected = healthInsurances.find(insurance => insurance.requestID === requestID);
//                 setSelectedInsurance(selected);
//             }
//         } catch (error) {
//             console.error('Error updating health insurance request:', error);
//         }
//     };


//     const handleClosePopup = () => {
//         setSelectedInsurance(null); // Reset selected insurance to close pop-up
//     };

//     // Pagination logic
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentItems = healthInsurances.slice(indexOfFirstItem, indexOfLastItem);

//     const paginate = pageNumber => setCurrentPage(pageNumber);

//     return (
//         <div className="health-insurance-list">
//             <h2>Health Insurance List</h2>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>User ID</th>
//                         <th>Request ID</th>
//                         <th>First Name</th>
//                         <th>Last Name</th>
//                         <th>Email</th>
//                         <th>Phone</th>
//                         <th>Age</th>
//                         <th>Gender</th>
//                         <th>Smoker</th>
//                         <th>Pre-Existing Consitions</th>
//                         <th>Coverage Amount</th>
//                         <th>Action</th>
//                         {/* Add more table headers for other fields */}
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {currentItems.map(insurance => (
//                         <tr key={insurance.uid}>
//                             <td>{insurance.uid}</td>
//                             <td>{insurance.requestID}</td>
//                             <td>{insurance.firstName}</td>
//                             <td>{insurance.lastName}</td>
//                             <td>{insurance.email}</td>
//                             <td>{insurance.phone}</td>
//                             <td>{insurance.age}</td>
//                             <td>{insurance.gender}</td>
//                             <td>{insurance.smoker}</td>
//                             <td>{insurance.preExistingConditions}</td>
//                             <td>${insurance.coverageAmount}</td>
//                             <td>
//                             <button onClick={() => handleView(insurance.requestID)}>View</button>
                               
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//             <ul className="pagination">
//                 {Array.from({ length: Math.ceil(healthInsurances.length / itemsPerPage) }, (_, index) => (
//                     <li key={index}>
//                         <button onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? 'active' : ''}>
//                             {index + 1}
//                         </button>
//                     </li>
//                 ))}
//             </ul>
//             {selectedInsurance && (
//                 <div className="popup">
//                     <div className="popup-content">
                      
//                         <button onClick={handleClosePopup}>Close</button>
          
                        
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default HealthDashboard;


// working code


// import React, { useEffect, useState } from 'react';
// import './HealthDashboard.css'; // Import CSS file for styling
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import FileDownloadIcon from '@mui/icons-material/FileDownload';

// const HealthDashboard = () => {
//     const [healthInsurances, setHealthInsurances] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage] = useState(5); // Number of items per page
//     const [selectedInsurance, setSelectedInsurance] = useState(null);
//     const [openRecommendDialog, setOpenRecommendDialog] = React.useState(false);

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const handleOpenRecommendDialog = () => {
//         setOpenRecommendDialog(true);
//       };
    
//       const handleCloseRecommendDialog = () => {
//         setOpenRecommendDialog(false);
//       };

//     //   const downloadDocument = (documentUrl) => {
//     //     window.open(`http://localhost:8000/${documentUrl}`, '_blank');
//     // };


//     const fetchData = async () => {
//         try {
//             const response = await fetch('http://localhost:8000/api/healthInsurance');
//             const data = await response.json();
//             setHealthInsurances(data);
//         } catch (error) {
//             console.error('Error fetching health insurance data:', error);
//         }
//     };

//     const generateUserQuery = () => {
//         const weatherDescription = sessionStorage.getItem('currentWeather');
//         const city = sessionStorage.getItem('currentLocation');
//         return `Today, weather is ${weatherDescription}. Recommend me top rated 3 restaurants, 3 musical events and 3 sports events along with their correct location's latitude and longitude in positive and negative values in ${city}. Strictly return these statements as a JSON Object with the structure [{type: string, Name:string(restaurant/musicalEvent/sportEvent), Address:string, Description:string, latitude:float, longitude: float}]. Do not return any non-json text or numbering.`;
//       };

//     const fetchOpenAiResponse = async () => {
//         const p = userQuery;
//         const apiKey = 'Bearer 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';
//         const apiUrl = 'https://api.openai.com/v1/completions';
//         const headers = {
//           'Content-Type': 'application/json',
//           'Authorization': `${apiKey}`
//         };
//         const data = {
//           model: 'gpt-3.5-turbo-instruct',
//           prompt: p,
//           max_tokens: 1800,
//           temperature: 0.7,
//           top_p: 1
//         };
    
//         try {
//           const response = await fetch(apiUrl, {
//             method: 'POST',
//             headers: headers,
//             body: JSON.stringify(data)
//           });
    
//           if (!response.ok) {
//             throw new Error('Failed to fetch OpenAI response');
//           }
    
//           const responseData = await response.json();
    
//           if (responseData && responseData.choices && responseData.choices.length > 0) {
//             const text = responseData.choices[0].text;
//             if (text) {
//               const parsedJson = tryParseJson(text);
//               return parsedJson || [];
//             }
//           }
    
//           return [];
//         } catch (error) {
//           console.error('Error fetching OpenAI response:', error);
//           return [];
//         }
//       };
    
//       const tryParseJson = (text) => {
//         return JSON.parse(text)
//         // try {
//         //   const cleanedResponseText = text.replace(/,\s*]/g, ']');
//         //   return JSON.parse(cleanedResponseText);
//         // } catch (error) {
//         //   console.error('Error parsing JSON:', error);
//         //   return null;
//         // }
//       };

//     const handleView = async (requestID) => {
//         try {
//             // Update the status of the health insurance request with the specified requestID
//             const response = await fetch(`http://localhost:8000/api/healthInsurance/status/${requestID}`, {
//                 method: 'PATCH', // Use PATCH method to update existing resource
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ status: 'Reviewed' })
//             });

//             if (response.ok) {
//                 // Update the healthInsurances state to reflect the changed status
//                 const updatedInsurances = healthInsurances.map(insurance => {
//                     if (insurance.requestID === requestID) {
//                         return { ...insurance, status: 'Reviewed' };
//                     }
//                     return insurance;
//                 });
//                 setHealthInsurances(updatedInsurances);

//                 // Set the selected insurance for pop-up display
//                 const selected = healthInsurances.find(insurance => insurance.requestID === requestID);
//                 setSelectedInsurance(selected);

//                 handleOpenRecommendDialog();
//             }
//         } catch (error) {
//             console.error('Error updating health insurance request:', error);
//         }
//     };

//     const handleClosePopup = () => {
//         setSelectedInsurance(null); // Reset selected insurance to close pop-up
//     };

//     const handleDownloadDocument = (documentUrl) => {
//         window.open(`http://localhost:8000/${documentUrl}`, '_blank');
//     };

//     // Pagination logic
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentItems = healthInsurances.slice(indexOfFirstItem, indexOfLastItem);

//     const paginate = pageNumber => setCurrentPage(pageNumber);

//     return (
//         <div className="health-insurance-list">
//             <h2>Health Insurance List</h2>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>User ID</th>
//                         <th>Request ID</th>
//                         <th>First Name</th>
//                         <th>Last Name</th>
//                         <th>Email</th>
//                         <th>Phone</th>
//                         <th>Age</th>
//                         <th>Gender</th>
//                         <th>Smoker</th>
//                         <th>Pre-Existing Conditions</th>
//                         <th>Coverage Amount</th>
//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {currentItems.map(insurance => (
//                         <tr key={insurance.requestID}>
//                             <td>{insurance.uid}</td>
//                             <td>{insurance.requestID}</td>
//                             <td>{insurance.firstName}</td>
//                             <td>{insurance.lastName}</td>
//                             <td>{insurance.email}</td>
//                             <td>{insurance.phone}</td>
//                             <td>{insurance.age}</td>
//                             <td>{insurance.gender}</td>
//                             <td>{insurance.smoker}</td>
//                             <td>{insurance.preExistingConditions}</td>
//                             <td>${insurance.coverageAmount}</td>
//                             <td>
//                             <button onClick={() => handleView(insurance.requestID)}>View</button>

//                                 {/* {insurance.status === 'Submitted' ? (
//                                     <button onClick={() => handleView(insurance.requestID)}>View</button>
//                                 ) : (
//                                     <button disabled>Viewed</button>
//                                 )} */}
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//             <ul className="pagination">
//                 {Array.from({ length: Math.ceil(healthInsurances.length / itemsPerPage) }, (_, index) => (
//                     <li key={index}>
//                         <button onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? 'active' : ''}>
//                             {index + 1}
//                         </button>
//                     </li>
//                 ))}
//             </ul>
//             {selectedInsurance &&
//             <Dialog fullWidth maxWidth="lg"  open={openRecommendDialog} onClose={handleCloseRecommendDialog}>
//         <DialogTitle>Insurance Details</DialogTitle>
//         <DialogContent style={{width:'100%', overflowY: 'auto'}}>
//                 <div className="popup">
//                     <div className="popup-content">
//                         {/* <h3></h3> */}
//                         <p><strong>Request ID:</strong> {selectedInsurance.requestID}</p>
//                         <p><strong>First Name:</strong> {selectedInsurance.firstName}</p>
//                         <p><strong>Last Name:</strong> {selectedInsurance.lastName}</p>
//                         <p><strong>Email:</strong> {selectedInsurance.email}</p>
//                         <p><strong>Phone:</strong> {selectedInsurance.phone}</p>
//                         <p><strong>Age:</strong> {selectedInsurance.age}</p>
//                         <p><strong>Gender:</strong> {selectedInsurance.gender}</p>
//                         <p><strong>Smoker:</strong> {selectedInsurance.smoker}</p>
//                         <p><strong>Annual Income:</strong> {selectedInsurance.annualIncome}</p>
//                         <p><strong>ZipCode:</strong> {selectedInsurance.zipCode}</p>
//                         <p><strong>Marriage Status:</strong> {selectedInsurance.marriageStatus}</p>
//                         <p><strong>Pre-Existing Conditions:</strong> {selectedInsurance.preExistingConditions}</p>
//                         <p><strong>Coverage Amount:</strong> ${selectedInsurance.coverageAmount}</p>
//                         <p><strong>Download ID: </strong><button onClick={() => handleDownloadDocument(selectedInsurance.idDocument)}>
//                         <FileDownloadIcon />
//                         </button></p> <br/>
//                         <button>Prepare Quotes</button> <br/>
//                         <button onClick={handleClosePopup}>Close</button>
//                     </div>
//                 </div>
//           {/* <h1>Hello</h1> */}
//         </DialogContent>
//       </Dialog>
//         }


           
     
//         </div>
//     );
// };

// export default HealthDashboard;
import React, { useEffect, useState } from 'react';
import './HealthDashboard.css'; // Import CSS file for styling
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const HealthDashboard = () => {
    const [healthInsurances, setHealthInsurances] = useState([]);
    const [healthInsuranceQuote, setHealthInsuranceQuote] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Number of items per page
    const [selectedInsurance, setSelectedInsurance] = useState(null);
    const [openRecommendDialog, setOpenRecommendDialog] = useState(false);
    const [userQuery, setUserQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const handleOpenRecommendDialog = () => {
        setOpenRecommendDialog(true);
    };

    const handleCloseRecommendDialog = () => {
        setOpenRecommendDialog(false);
    };

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/healthInsurance');
            const data = await response.json();
            setHealthInsurances(data);
        } catch (error) {
            console.error('Error fetching health insurance data:', error);
        }
    };

    const generateQuery = (insuranceData) => {
        // Generate the user query based on form data
        const query = `Based on the array of data ${insuranceData}, prepare 3 health insurance quotes to display it to the user. Strictly return these statements as a JSON Object with the structure 
        [
            {
                "type": "health_insurance_quote",
                "Name": "Example Health Insurance Company",
                "Address": "123 Main Street, Anytown, USA",
                "Description": "Comprehensive health insurance coverage",
                "latitude": 40.7128,
                "longitude": -74.0060
            }
        ]
        . Do not return any non-json text or numbering.`;
        setUserQuery(query);
        return query;
    };

    const handlePrepareQuotes = () => {
        fetchOpenAiResponse();
    };

    const fetchOpenAiResponse = async () => {
        setIsLoading(true); // Set loading state to true
        const prompt = generateQuery(selectedInsurance);
        const apiKey = 'Bearer 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';
        const apiUrl = 'https://api.openai.com/v1/completions';
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `${apiKey}`
        };
        const data = {
            model: 'gpt-3.5-turbo-instruct',
            prompt: prompt,
            max_tokens: 1800,
            temperature: 0.7,
            top_p: 1
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Failed to fetch OpenAI response');
            }

            const responseData = await response.json();

            if (responseData && responseData.choices && responseData.choices.length > 0) {
                const text = responseData.choices[0].text;
                if (text) {
                    const parsedJson = tryParseJson(text);
                    setHealthInsuranceQuote(parsedJson);
                    console.log(parsedJson);
                }
            }
        } catch (error) {
            console.error('Error fetching OpenAI response:', error);
        } finally {
            setIsLoading(false); // Set loading state to false after response
        }
    };

    const tryParseJson = (text) => {
        try {
            return JSON.parse(text);
        } catch (error) {
            console.error('Error parsing JSON:', error);
            return null;
        }
    };

    const handleView = async (requestID) => {
        try {
            const response = await fetch(`http://localhost:8000/api/healthInsurance/status/${requestID}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: 'Reviewed' })
            });

            if (response.ok) {
                const updatedInsurances = healthInsurances.map(insurance => {
                    if (insurance.requestID === requestID) {
                        return { ...insurance, status: 'Reviewed' };
                    }
                    return insurance;
                });
                setHealthInsurances(updatedInsurances);

                const selected = healthInsurances.find(insurance => insurance.requestID === requestID);
                setSelectedInsurance(selected);

                handleOpenRecommendDialog();
            }
        } catch (error) {
            console.error('Error updating health insurance request:', error);
        }
    };

    const handleClosePopup = () => {
        setSelectedInsurance(null);
    };

    const handleDownloadDocument = (documentUrl) => {
        window.open(`http://localhost:8000/${documentUrl}`, '_blank');
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = healthInsurances.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="health-insurance-list">
            <h2>Health Insurance List</h2>
            <table>
                <thead>
                    <tr>
                        <th>User ID</th>
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
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map(insurance => (
                        <tr key={insurance.requestID}>
                            <td>{insurance.uid}</td>
                            <td>{insurance.requestID}</td>
                            <td>{insurance.firstName}</td>
                            <td>{insurance.lastName}</td>
                            <td>{insurance.email}</td>
                            <td>{insurance.phone}</td>
                            <td>{insurance.age}</td>
                            <td>{insurance.gender}</td>
                            <td>{insurance.smoker}</td>
                            <td>{insurance.preExistingConditions}</td>
                            <td>${insurance.coverageAmount}</td>
                            <td>
                                <button onClick={() => handleView(insurance.requestID)}>View</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ul className="pagination">
                {Array.from({ length: Math.ceil(healthInsurances.length / itemsPerPage) }, (_, index) => (
                    <li key={index}>
                        <button onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? 'active' : ''}>
                            {index + 1}
                        </button>
                    </li>
                ))}
            </ul>
            {selectedInsurance &&
                <Dialog fullWidth maxWidth="lg" open={openRecommendDialog} onClose={handleCloseRecommendDialog}>
                    <DialogTitle>Insurance Details</DialogTitle>
                    <DialogContent style={{ width: '100%', overflowY: 'auto' }}>
                        <div className="popup">
                            <div className="popup-content">
                                <p><strong>Request ID:</strong> {selectedInsurance.requestID}</p>
                                <p><strong>First Name:</strong> {selectedInsurance.firstName}</p>
                                <p><strong>Last Name:</strong> {selectedInsurance.lastName}</p>
                                <p><strong>Email:</strong> {selectedInsurance.email}</p>
                                <p><strong>Phone:</strong> {selectedInsurance.phone}</p>
                                <p><strong>Age:</strong> {selectedInsurance.age}</p>
                                <p><strong>Gender:</strong> {selectedInsurance.gender}</p>
                                <p><strong>Smoker:</strong> {selectedInsurance.smoker}</p>
                                <p><strong>Annual Income:</strong> {selectedInsurance.annualIncome}</p>
                                <p><strong>ZipCode:</strong> {selectedInsurance.zipCode}</p>
                                <p><strong>Marriage Status:</strong> {selectedInsurance.marriageStatus}</p>
                                <p><strong>Pre-Existing Conditions:</strong> {selectedInsurance.preExistingConditions}</p>
                                <p><strong>Coverage Amount:</strong> ${selectedInsurance.coverageAmount}</p>
                                <p><strong>Download ID: </strong>
                                    <button onClick={() => handleDownloadDocument(selectedInsurance.idDocument)}>
                                        <FileDownloadIcon />
                                    </button>
                                </p>
                                <br />
                                <button onClick={handlePrepareQuotes}>Prepare Quotes</button><br />
                                <button onClick={handleClosePopup}>Close</button>
                            </div>
                        </div>
                        {isLoading ? ( // Conditional rendering based on loading state for healthInsuranceQuote
                            <p>Loading...</p>
                        ) : (
                            healthInsuranceQuote.map((quote, index) => (
                                <div key={index}>
                                    <p>{quote.Name}</p>
                                    <p>{quote.Description}</p>
                                    <p>{quote.Address}</p>
                                    {/* <p>{quote.Name}</p> */}
                                </div>
                            ))
                        )}
                    </DialogContent>
                </Dialog>
            }
        </div>
    );
};

export default HealthDashboard;
