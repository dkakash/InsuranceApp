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
                    <li key={index}>
                        <h3>{quote.Name}</h3>
                        <p>{quote.Description}</p>
                        <p>{quote.Address}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuoteDisplay;
