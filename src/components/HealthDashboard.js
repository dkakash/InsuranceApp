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



import React, { useEffect, useState } from 'react';
import './HealthDashboard.css'; // Import CSS file for styling
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

const HealthDashboard = () => {
    const [healthInsurances, setHealthInsurances] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Number of items per page
    const [selectedInsurance, setSelectedInsurance] = useState(null);
    const [openRecommendDialog, setOpenRecommendDialog] = React.useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const handleOpenRecommendDialog = () => {
        setOpenRecommendDialog(true);
      };
    
      const handleCloseRecommendDialog = () => {
        setOpenRecommendDialog(false);
      };

    //   const downloadDocument = (documentUrl) => {
    //     window.open(`http://localhost:8000/${documentUrl}`, '_blank');
    // };


    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/healthInsurance');
            const data = await response.json();
            setHealthInsurances(data);
        } catch (error) {
            console.error('Error fetching health insurance data:', error);
        }
    };

    const handleView = async (requestID) => {
        try {
            // Update the status of the health insurance request with the specified requestID
            const response = await fetch(`http://localhost:8000/api/healthInsurance/${requestID}`, {
                method: 'PATCH', // Use PATCH method to update existing resource
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: 'Reviewed' })
            });

            if (response.ok) {
                // Update the healthInsurances state to reflect the changed status
                const updatedInsurances = healthInsurances.map(insurance => {
                    if (insurance.requestID === requestID) {
                        return { ...insurance, status: 'Reviewed' };
                    }
                    return insurance;
                });
                setHealthInsurances(updatedInsurances);

                // Set the selected insurance for pop-up display
                const selected = healthInsurances.find(insurance => insurance.requestID === requestID);
                setSelectedInsurance(selected);

                handleOpenRecommendDialog();
            }
        } catch (error) {
            console.error('Error updating health insurance request:', error);
        }
    };

    const handleClosePopup = () => {
        setSelectedInsurance(null); // Reset selected insurance to close pop-up
    };

    // Pagination logic
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
                        <tr key={insurance.uid}>
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

                                {/* {insurance.status === 'Submitted' ? (
                                    <button onClick={() => handleView(insurance.requestID)}>View</button>
                                ) : (
                                    <button disabled>Viewed</button>
                                )} */}
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
            <Dialog fullWidth maxWidth="lg"  open={openRecommendDialog} onClose={handleCloseRecommendDialog}>
        <DialogTitle>Insurance Details</DialogTitle>
        <DialogContent style={{width:'100%', overflowY: 'auto'}}>
                <div className="popup">
                    <div className="popup-content">
                        {/* <h3></h3> */}
                        <p><strong>Request ID:</strong> {selectedInsurance.requestID}</p>
                        <p><strong>First Name:</strong> {selectedInsurance.firstName}</p>
                        <p><strong>Last Name:</strong> {selectedInsurance.lastName}</p>
                        <p><strong>Email:</strong> {selectedInsurance.email}</p>
                        <p><strong>Phone:</strong> {selectedInsurance.phone}</p>
                        <p><strong>Age:</strong> {selectedInsurance.age}</p>
                        <p><strong>Gender:</strong> {selectedInsurance.gender}</p>
                        <p><strong>Smoker:</strong> {selectedInsurance.smoker}</p>
                        <p><strong>Pre-Existing Conditions:</strong> {selectedInsurance.preExistingConditions}</p>
                        <p><strong>Coverage Amount:</strong> ${selectedInsurance.coverageAmount}</p>
                        {/* <button onClick={() => downloadDocument(selectedInsurance.idDocument)}>Download Document</button> */}

                        <button onClick={handleClosePopup}>Close</button>
                    </div>
                </div>
          {/* <h1>Hello</h1> */}
        </DialogContent>
      </Dialog>
        }


            {/* Popup to display selected insurance details */}
     
        </div>
    );
};

export default HealthDashboard;





 {/* {insurance.status === 'Submitted' ? (
                                    <button onClick={() => handleView(insurance.requestID)}>View</button>
                                ) : (
                                    <button disabled>Viewed</button>
                                )} */}