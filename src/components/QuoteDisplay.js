import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const QuoteDisplay = () => {
    const [quotes, setQuotes] = useState([]);
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

    return (
        <div>
            <h2>Quotes for Request ID: {requestId}</h2>
            <ul>
                {quotes.map((quote, index) => (
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
                </div>
                ))}
            </ul>
        </div>
    );
};

export default QuoteDisplay;
