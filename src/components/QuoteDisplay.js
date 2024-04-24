// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import axios from 'axios';
// import './QuoteDisplay.css';

// const QuoteDisplay = () => {
//     const [quotes, setQuotes] = useState([]);
//     const [selectedQuotes, setSelectedQuotes] = useState([]);
//     const { requestId } = useParams(); // Get requestId from URL parameters
    
//     useEffect(() => {
//         const fetchQuotes = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8000/api/healthInsurance/quotes/${requestId}`);
//                 setQuotes(response.data.quotes);
//             } catch (error) {
//                 console.error('Error fetching quotes:', error);
//             }
//         };

//         fetchQuotes();
//     }, [requestId]);

//     const handleCheckboxChange = (index) => {
//         const updatedQuotes = [...selectedQuotes];
//         updatedQuotes[index] = !updatedQuotes[index];
//         setSelectedQuotes(updatedQuotes);
//     };

//     const makePayment = () => {
//         // Logic to handle payment
//         sessionStorage.setItem('selectedQuote',JSON.stringify(selectedQuotes))
//         console.log("Payment made for selected quotes:", JSON.stringify(selectedQuotes));
//     };

//     return (
//         <div className="quote-grid">
//             <h2>Quotes for Request ID: {requestId}</h2>
//             <div className="cards-container">
//                 {quotes.map((quote, index) => (
//                     <div className="card" key={index}>
//                         <img src={quote.image} alt="Insurance Company Logo" className="card-image" />
//                         <div className="card-content">
//                             <p><strong>Name:</strong> {quote.Name}</p>
//                             <p><strong>Address:</strong> {quote.Address}</p>
//                             <p><strong>Description:</strong> {quote.Description}</p>
//                             <p><strong>Complimentary Health Checkup:</strong> {quote['Complimentary Health Checkup']}</p>
//                             <p><strong>Cashless Hospitals:</strong> {quote['Cashless Hospitals']}</p>
//                             <p><strong>Pre Hospitalization:</strong> {quote['Pre Hospitalization']}</p>
//                             <p><strong>Hospitalization at Home:</strong> {quote['Hospitalization at Home']}</p>
//                             <p><strong>Post Hospitalization:</strong> {quote['Post Hospitalization']}</p>
//                             <p><strong>Pre-existing Disease Waiting Period:</strong> {quote['Pre-existing Disease Waiting Period']}</p>
//                             <p><strong>Organ Donor Expenses:</strong> {quote['Organ Donor Expenses']}</p>
//                             <p><strong>Specific Illness Waiting Period:</strong> {quote['Specific Illness Waiting Period']}</p>
//                             <p><strong>Day Care Treatment:</strong> {quote['Day Care Treatment']}</p>
//                             <p><strong>Unlimited Online Consultations:</strong> {quote['Unlimited Online Consultations']}</p>
//                             <p><strong>Total Coverage:</strong> {quote['Total Coverage']}</p>
//                             <p><strong>Total Premium:</strong> {quote['Total Premium']}</p>
//                             <p><strong>Monthly Premium Payment:</strong> {quote['Monthly Premium Payment']}</p>
//                             <input
//                                 type="checkbox"
//                                 onChange={() => handleCheckboxChange(index)}
//                                 checked={selectedQuotes[index]}
//                             />
//                         </div>
//                     </div>
//                 ))}
//             </div>
//             {selectedQuotes.includes(true) && (
//                 <Link to='/payment'>
//                 <button onClick={makePayment} className="make-payment-button">
//                     Make Payment
//                 </button>
//                 </Link>
//             )}
//         </div>
//     );
// };

// export default QuoteDisplay;



import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './QuoteDisplay.css';

const QuoteDisplay = () => {
    const [quotes, setQuotes] = useState([]);
    const [selectedQuoteIndex, setSelectedQuoteIndex] = useState(null); // Track the index of the selected quote
    const { requestId } = useParams(); // Get requestId from URL parameters
    
    useEffect(() => {
        const fetchQuotes = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/healthInsurance/quotes/${requestId}`);
                setQuotes(response.data.quotes);
            } catch (error) {
                console.error('Error fetching quotes:', error);
            }
        };

        fetchQuotes();
    }, [requestId]);

    const handleCheckboxChange = (index) => {
        // If the selected quote index is already set, unselect it
        if (selectedQuoteIndex === index) {
            setSelectedQuoteIndex(null);
        } else {
            setSelectedQuoteIndex(index); // Otherwise, select the new quote
        }
    };

    const makePayment = () => {
        if (selectedQuoteIndex !== null) {
            // Save the selected quote to session storage
            const selectedQuote = quotes[selectedQuoteIndex];
            const quoteWithRequestID = {
                ...selectedQuote,
                requestID: requestId
            };
            sessionStorage.setItem('selectedQuote', JSON.stringify(quoteWithRequestID));
            console.log("Payment made for selected quote:", quoteWithRequestID);
        }
    };

    return (
        <div className="quote-grid">
            <h2>Quotes for Request ID: {requestId}</h2>
            <div className="cards-container">
                {quotes.map((quote, index) => (
                    <div className="card" key={index}>
                        <img src={quote.image} alt="Insurance Company Logo" className="card-image" />
                        <div className="card-content">
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
                             <p><strong>Unlimited Online Consultations:</strong> {quote['Unlimited Online Consultations']}</p>                             <p><strong>Total Coverage:</strong> {quote['Total Coverage']}</p>
                             <p><strong>Total Premium:</strong> {quote['Total Premium']}</p>
                             <p><strong>Monthly Premium Payment:</strong> {quote['Monthly Premium Payment']}</p>
                            <input
                                type="checkbox"
                                onChange={() => handleCheckboxChange(index)}
                                checked={selectedQuoteIndex === index} // Check if this quote is selected
                            />
                        </div>
                    </div>
                ))}
            </div>
            {selectedQuoteIndex !== null && (
                <Link to='/payment'>
                    <button onClick={makePayment} className="make-payment-button">
                        Make Payment
                    </button>
                </Link>
            )}
        </div>
    );
};

export default QuoteDisplay;

