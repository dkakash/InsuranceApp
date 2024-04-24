import React, { useState, useEffect } from 'react';
import { Card, CardContent, CircularProgress, Typography } from '@material-ui/core';

const UserInsurance = () => {
    const [selectedInsurance, setSelectedInsurance] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch user's UID from session storage
        const user = sessionStorage.getItem('user');
        const parsedUser = JSON.parse(user);
        const userUid = parsedUser.uid;
        if (!userUid) {
            setLoading(false);
            return;
        }

        // Fetch insurance data based on user UID
        fetch(`http://localhost:8000/api/insurance/user/${userUid}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to fetch user insurance');
                }
            })
            .then(data => {
                setSelectedInsurance(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching user insurance:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </div>
        );
    }

    return (
        <div>
            {selectedInsurance && selectedInsurance.selectedQuote ? (
                <Card style={{ maxWidth: 600, margin: 'auto', marginTop: 20 }}>
                    <CardContent>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Selected Insurance
                        </Typography>
                        <Typography variant="body1"><strong>Name:</strong> {selectedInsurance.selectedQuote.Name}</Typography>
                        <Typography variant="body1"><strong>Address:</strong> {selectedInsurance.selectedQuote.Address}</Typography>
                        <Typography variant="body1"><strong>Description:</strong> {selectedInsurance.selectedQuote.Description}</Typography>
                        <Typography variant="body1"><strong>Complimentary Health Checkup:</strong> {selectedInsurance.selectedQuote['Complimentary Health Checkup']}</Typography>
                        <Typography variant="body1"><strong>Cashless Hospitals:</strong> {selectedInsurance.selectedQuote['Cashless Hospitals']}</Typography>
                        <Typography variant="body1"><strong>Pre Hospitalization:</strong> {selectedInsurance.selectedQuote['Pre Hospitalization']}</Typography>
                        <Typography variant="body1"><strong>Hospitalization at Home:</strong> {selectedInsurance.selectedQuote['Hospitalization at Home']}</Typography>
                        <Typography variant="body1"><strong>Post Hospitalization:</strong> {selectedInsurance.selectedQuote['Post Hospitalization']}</Typography>
                        <Typography variant="body1"><strong>Pre-existing Disease Waiting Period:</strong> {selectedInsurance.selectedQuote['Pre-existing Disease Waiting Period']}</Typography>
                        <Typography variant="body1"><strong>Organ Donor Expenses:</strong> {selectedInsurance.selectedQuote['Organ Donor Expenses']}</Typography>
                        <Typography variant="body1"><strong>Specific Illness Waiting Period:</strong> {selectedInsurance.selectedQuote['Specific Illness Waiting Period']}</Typography>
                        <Typography variant="body1"><strong>Day Care Treatment:</strong> {selectedInsurance.selectedQuote['Day Care Treatment']}</Typography>
                        <Typography variant="body1"><strong>Unlimited Online Consultations:</strong> {selectedInsurance.selectedQuote['Unlimited Online Consultations']}</Typography>
                        <Typography variant="body1"><strong>Total Coverage:</strong> {selectedInsurance.selectedQuote['Total Coverage']}</Typography>
                        <Typography variant="body1"><strong>Total Premium:</strong> {selectedInsurance.selectedQuote['Total Premium']}</Typography>
                        <Typography variant="body1"><strong>Monthly Premium Payment:</strong> {selectedInsurance.selectedQuote['Monthly Premium Payment']}</Typography>
                    </CardContent>
                </Card>
            ) : (
                <Typography variant="body1" style={{ marginTop: 20 }}>No insurance selected</Typography>
            )}
        </div>
    );
};

export default UserInsurance;
