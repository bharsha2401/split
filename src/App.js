import React, { useState, useEffect } from 'react';
import AddTrip from './components/AddTrip';
import JoinTrip from './components/JoinTrip';
import Dashboard from './components/Dashboard';
import api from './api';

function App() {
    const [trip, setTrip] = useState(null);
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        // Check for saved trip on load
        const savedTripId = localStorage.getItem('currentTripId');
        const shareCode = localStorage.getItem('shareCode');
        
        if (savedTripId) {
            loadTrip(savedTripId);
        }
    }, []);

    const loadTrip = async (tripId) => {
        try {
            const response = await api.get(`/trips/${tripId}`);
            setTrip(response.data);
        } catch (error) {
            console.error('Error loading trip:', error);
            localStorage.removeItem('currentTripId');
            localStorage.removeItem('shareCode');
        }
    };

    return (
        <div style={{
            padding: '20px',
            maxWidth: '1200px',
            margin: '0 auto',
            fontFamily: 'Arial, sans-serif',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <h1 style={{ textAlign: 'center', color: '#333' }}>
                Trip Expense Splitter
            </h1>
            
            <div style={{ flex: 1 }}>
                {trip ? (
                    <div>
                        <div style={{
                            backgroundColor: '#f8f9fa',
                            padding: '10px',
                            borderRadius: '4px',
                            marginBottom: '20px'
                        }}>
                            <p>Share Code: <strong>{trip.shareCode}</strong></p>
                            <small>Share this code with family members to let them join this trip</small>
                        </div>
                        <Dashboard
                            trip={trip}
                            setTrip={setTrip}
                            expenses={expenses}
                            setExpenses={setExpenses}
                        />
                    </div>
                ) : (
                    <div>
                        <AddTrip setTrip={setTrip} />
                        <div style={{ textAlign: 'center', margin: '20px 0' }}>
                            <p>- OR -</p>
                        </div>
                        <JoinTrip setTrip={setTrip} />
                    </div>
                )}
            </div>

            <footer style={{
                textAlign: 'center',
                padding: '20px 0',
                marginTop: '40px',
                borderTop: '1px solid #eee',
                color: '#000'  // Changed from '#666' to '#000' for black color
            }}>
                <p>© {new Date().getFullYear()} - Developed by Harsha Vardhan Reddy</p>
            </footer>
        </div>
    );
}

export default App;
