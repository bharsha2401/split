import React, { useEffect } from 'react';
import api from '../api';
import FamilyList from './FamilyList';
import AddExpense from './AddExpense';
import ExpenseList from './ExpenseList';
import TripSummary from './TripSummary';

const Dashboard = ({ trip, setTrip, expenses, setExpenses }) => {
    useEffect(() => {
        const fetchTripData = async () => {
            if (trip?._id) {
                try {
                    // Fetch latest trip data
                    const tripResponse = await api.get(`/trips/${trip._id}`);
                    if (tripResponse.data) {
                        setTrip(tripResponse.data);
                    }

                    // Fetch expenses
                    const expensesResponse = await api.get(`/expenses/trip/${trip._id}`);
                    if (expensesResponse.data) {
                        setExpenses(expensesResponse.data);
                    }
                } catch (error) {
                    console.error('Error fetching trip data:', error);
                }
            }
        };

        fetchTripData();
    }, [trip?._id, setTrip, setExpenses]);

    return (
        <div>
            <FamilyList trip={trip} setTrip={setTrip} />
            <AddExpense trip={trip} expenses={expenses} setExpenses={setExpenses} />
            <ExpenseList expenses={expenses} />
            {trip && trip.families && trip.families.length > 0 && (
                <TripSummary trip={trip} expenses={expenses} />
            )}
        </div>
    );
};

export default Dashboard;
