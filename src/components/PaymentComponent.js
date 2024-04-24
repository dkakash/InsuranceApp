import React, { useState } from 'react';
import { Button, TextField, Snackbar } from '@mui/material'; // Import Material-UI components
import MuiAlert from '@mui/material/Alert'; // Import Alert component from Material-UI
import './PaymentComponent.css'; // Import CSS file for styling

const PaymentComponent = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [name, setName] = useState('');
    const [cardType, setCardType] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleCardNumberChange = (e) => {
        const inputCardNumber = e.target.value;
        setCardNumber(inputCardNumber);
        detectCardType(inputCardNumber);
    };

    const detectCardType = (cardNumber) => {
        // Regular expressions to detect card types
        const visaRegEx = /^4/;
        const mastercardRegEx = /^5[1-5]/;

        if (visaRegEx.test(cardNumber)) {
            setCardType('visa');
        } else if (mastercardRegEx.test(cardNumber)) {
            setCardType('mastercard');
        } else {
            setCardType('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Logic to handle payment submission
        console.log('Payment submitted');

        // Retrieve selected quote from session storage
        const selectedQuote = JSON.parse(sessionStorage.getItem('selectedQuote'));

        // Prepare payment data
        const paymentDetails = {
            cardNumber,
            expiryDate,
            cvv,
            name
        };

        // Prepare request body
        const requestBody = {
            selectedQuote,
            paymentDetails
        };

        try {
            // Call API endpoint
            const response = await fetch('http://localhost:8000/api/insurance/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            // Handle response
            if (response.ok) {
                console.log('Payment successful!');
                setSuccessMessage('Payment successful!');
                // Reset form fields
                setCardNumber('');
                setExpiryDate('');
                setCvv('');
                setName('');
            } else {
                console.error('Payment failed:', response.statusText);
                // Handle failure
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSuccessMessage('');
    };

    return (
        //autoHideDuration={6000}
        <div className="payment-container">
                <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="success">
                    {successMessage}
                </MuiAlert>
            </Snackbar>
            <h2>Enter Card Details</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="cardNumber">Card Number</label>
                    <div className={`input-with-image ${cardType ? 'with-image' : ''}`}>
                        <TextField
                            type="text"
                            id="cardNumber"
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            required
                            placeholder="Enter card number"
                            className="input-field"
                        />
                        {cardType && (
                            <img
                                src={`/${cardType}.png`} // Assuming your images are in the public folder with names 'visa.png' and 'mastercard.png'
                                alt={cardType}
                                className="card-type-image"
                            />
                        )}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="expiryDate">Expiry Date</label>
                    <TextField
                        type="text"
                        id="expiryDate"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        placeholder="MM/YYYY"
                        required
                        className="input-field"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cvv">CVV</label>
                    <TextField
                        type="text"
                        id="cvv"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        required
                        placeholder="CVV"
                        className="input-field"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name on Card</label>
                    <TextField
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Full name"
                        className="input-field"
                    />
                </div>
                <Button type="submit" className="pay-button">Pay Now</Button>
            </form>
            
        </div>
    );
};

export default PaymentComponent;
