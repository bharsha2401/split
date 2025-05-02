import React, { useEffect } from 'react';
import api from '../api';
import FamilyList from './FamilyList';
import AddExpense from './AddExpense';
import ExpenseList from './ExpenseList';
import TripSummary from './TripSummary';

const Dashboard = ({ trip, setTrip, expenses, setExpenses }) => {
  useEffect(() => {
    const fetchExpenses = async () => {
      if (trip?._id) {
        try {
          const response = await api.get(`/expenses/trip/${trip._id}`);
          setExpenses(response.data);
        } catch (error) {
          console.error('Error fetching expenses:', error);
        }
      }
    };

    fetchExpenses();
  }, [trip?._id, setExpenses]);

  return (
    <div>
      <FamilyList trip={trip} setTrip={setTrip} />
      <AddExpense trip={trip} expenses={expenses} setExpenses={setExpenses} />
      <ExpenseList expenses={expenses} />
      <TripSummary trip={trip} expenses={expenses} />
    </div>
  );
};

export default Dashboard;
