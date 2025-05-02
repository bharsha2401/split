import React, { useState } from 'react';
import api from '../api';

const JoinTrip = ({ setTrip }) => {
    const [shareCode, setShareCode] = useState('');
    const [error, setError] = useState('');

    const handleJoinTrip = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await api.get(`/trips/join/${shareCode}`);
            if (response.data.trip) {
                setTrip(response.data.trip);
                localStorage.setItem('currentTripId', response.data.trip._id);
                localStorage.setItem('shareCode', shareCode);
            }
        } catch (error) {
            setError('Invalid share code or trip not found');
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '20px auto', padding: '20px' }}>
            <h2>Join Existing Trip</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <form onSubmit={handleJoinTrip}>
                <input
                    type="text"
                    value={shareCode}
                    onChange={(e) => setShareCode(e.target.value.toUpperCase())}
                    placeholder="Enter Share Code"
                    style={{
                        width: '100%',
                        padding: '8px',
                        marginBottom: '10px'
                    }}
                />
                <button
                    type="submit"
                    style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px'
                    }}
                >
                    Join Trip
                </button>
            </form>
        </div>
    );
};

export default JoinTrip;