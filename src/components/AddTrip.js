import React, { useState } from 'react';
import api from '../api';

function AddTrip({ setTrip }) {
    const [tripName, setTripName] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleAddTrip = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            if (!tripName.trim()) {
                setError('Please enter a trip name');
                setIsLoading(false);
                return;
            }

            const tripData = {
                name: tripName.trim(),
                families: [] // Empty array for families, can be added later
            };

            console.log('Sending trip data:', tripData);

            const response = await api.post('/trips', tripData);
            
            if (response?.data) {
                console.log('Trip created:', response.data);
                setTrip(response.data);
            } else {
                throw new Error('No response data received');
            }
        } catch (error) {
            console.error('Error creating trip:', error);
            setError(error.response?.data?.message || 'Failed to create trip. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
            <form onSubmit={handleAddTrip}>
                <h2>Add New Trip</h2>
                
                {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

                <div style={{ marginBottom: '15px' }}>
                    <label>Trip Name:</label>
                    <input
                        type="text"
                        value={tripName}
                        onChange={(e) => setTripName(e.target.value)}
                        placeholder="Enter trip name"
                        style={{ 
                            width: '100%', 
                            padding: '8px', 
                            marginTop: '5px',
                            borderRadius: '4px',
                            border: '1px solid #ccc'
                        }}
                        required
                    />
                </div>

                <button
                    type="submit"
                    style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        marginTop: '20px'
                    }}
                    disabled={isLoading}
                >
                    {isLoading ? 'Creating Trip...' : 'Create Trip'}
                </button>
            </form>
        </div>
    );
}

export default AddTrip;
