const TripDetails = ({ trip }) => {
    return (
        <div className="trip-details">
            <h2>Trip Details</h2>
            <h3>{trip.name}</h3>
            <p>Date: {trip.date}</p>
            <h4>Participants:</h4>
            <ul>
                {trip.participants.map((participant, index) => (
                    <li key={index}>{participant.name} - {participant.family}</li>
                ))}
            </ul>
            <h4>Total Expenses: ${trip.totalExpenses}</h4>
        </div>
    );
};

export default TripDetails;