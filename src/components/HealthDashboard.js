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
    const [requestId, setRequestId] = useState(null);

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
        const query = `Based on the data below:
        Age: ${insuranceData.age},
        Gender: ${insuranceData.gender},
        Smoker: ${insuranceData.smoker},
        Annual Income: ${insuranceData.annualIncome},
        Marriage Status: ${insuranceData.marriageStatus},
        Zip Code: ${insuranceData.zipCode},
        Pre-existing Conditions: ${insuranceData.preExistingConditions},
        Coverage Amount: ${insuranceData.coverageAmount}.
        Prepare 5 health insurance quotes to display it to the user. Strictly return these statements as a JSON Object with the structure:
        [
            {
                "type": "health_insurance_quote",
                "Name": "Example Health Insurance Company",
                "Address": "123 Main Street, Anytown, USA",
                "Description": "Comprehensive health insurance coverage",
                "Complimentary Health Checkup": "Yes/No",
                "Cashless Hospitals": "count",
                "Pre Hospitalization": "What is covered and what is not covered",
                "Hospitalization at Home": "covered or not",
                "Post Hospitalization": "how many days does the insurance cover",
                "Pre-existing Disease Waiting Period": "waiting time based on the above pre-existing conditions",
                "Organ Donor Expenses": "covered or not",
                "Specific Illness Waiting Period": "string",
                "Day Care Treatment": "covered or not",
                "Unlimited Online Consultations": "Yes/No",
                "Total Coverage": "total coverage amount",
                "Total Premium": "total premium amount",
                "Monthly Premium Payment": "monthly premium amount"
            }
        ].
        Do not return any non-JSON text or numbering.`;
        setUserQuery(query);
        return query;
    };

    const handlePrepareQuotes = () => {
        fetchOpenAiResponse();
    };

    const fetchOpenAiResponse = async () => {
        setIsLoading(true); // Set loading state to true
        const prompt = generateQuery(selectedInsurance);
        const apiKey = '';
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
            setRequestId(requestID);
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

    const updateStatusForQuote = async (requestID) => {
        try {
            const response = await fetch(`http://localhost:8000/api/healthInsurance/status/${requestId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: 'Quotes Ready' })
            });

            if (response.ok) {
                const updatedInsurances = healthInsurances.map(insurance => {
                    if (insurance.requestID === requestID) {
                        return { ...insurance, status: 'Quotes Ready' };
                    }
                    return insurance;
                });
                setHealthInsurances(updatedInsurances);
            }
        } catch (error) {
            console.error('Error updating health insurance request:', error);
        }
    };

    // const handleSubmitQuotes = async () => {
    //     try {
    //         const response = await fetch(`http://localhost:8000/api/healthInsurance/quotes`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 requestID: requestId,
    //                 quotes: healthInsuranceQuote
    //             })
    //         });

    //         if (response.ok) {
    //             console.log('Quotes submitted successfully');
    //             updateStatusForQuote(requestId);
    //         } else {
    //             console.error('Failed to submit quotes');
    //         }
    //     } catch (error) {
    //         console.error('Error submitting quotes:', error);
    //     }
    // };

    const handleSubmitQuotes = async () => {
        try {
            const checkedQuotes = healthInsuranceQuote.filter(quote => quote.checked);
            const response = await fetch(`http://localhost:8000/api/healthInsurance/quotes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    requestID: requestId,
                    quotes: checkedQuotes
                })
            });
    
            if (response.ok) {
                console.log('Quotes submitted successfully');
                updateStatusForQuote(requestId);
            } else {
                console.error('Failed to submit quotes');
            }
        } catch (error) {
            console.error('Error submitting quotes:', error);
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
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : (
                            <>
                                {healthInsuranceQuote.map((quote, index) => (
                                    <div key={index}>
                                        <p><strong>Name:</strong> {quote.Name}</p>
                                        <p><strong>Address:</strong> {quote.Address}</p>
                                        <p><strong>Description:</strong> {quote.Description}</p>
                                        <p><strong>Complimentary Health Checkup:</strong> {quote['Complimentary Health Checkup']}</p>
                                        <p><strong>Cashless Hospitals:</strong> {quote['Cashless Hospitals']}</p>
                                        <p><strong>Pre Hospitalization:</strong> {quote['Pre Hospitalization']}</p>
                                        <p><strong>Hospitalization at Home:</strong> {quote['Hospitalization at Home']}</p>
                                        <p><strong>Post Hospitalization:</strong> {quote['Post Hospitalization']}</p>
                                        <p><strong>Pre-existing Disease Waiting Period:</strong> {quote['Pre-existing Disease Waiting Period']}</p>
                                        <p><strong>Organ Donor Expenses:</strong> {quote['Organ Donor Expenses']}</p>
                                        <p><strong>Specific Illness Waiting Period:</strong> {quote['Specific Illness Waiting Period']}</p>
                                        <p><strong>Day Care Treatment:</strong> {quote['Day Care Treatment']}</p>
                                        <p><strong>Unlimited Online Consultations:</strong> {quote['Unlimited Online Consultations']}</p>
                                        <p><strong>Total Coverage:</strong> {quote['Total Coverage']}</p>
                                        <p><strong>Total Premium:</strong> {quote['Total Premium']}</p>
                                        <p><strong>Monthly Premium Payment:</strong> {quote['Monthly Premium Payment']}</p>
                                        <input
                                            type="checkbox"
                                            checked={quote.checked || false}
                                            onChange={(e) => {
                                                const isChecked = e.target.checked;
                                                setHealthInsuranceQuote((prevState) => {
                                                    const updatedQuotes = [...prevState];
                                                    updatedQuotes[index] = { ...quote, checked: isChecked };
                                                    return updatedQuotes;
                                                });
                                            }}
                                        />
                                    </div>
                                ))}
                                <div>
                                    <button onClick={handleSubmitQuotes}>Submit Quotes</button>
                                </div>
                            </>
                        )}
                    </DialogContent>
                </Dialog>
            }
        </div>
    );
};

export default HealthDashboard;

