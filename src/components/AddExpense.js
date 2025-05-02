import React, { useState } from 'react';
import api from '../api';

const AddExpense = ({ trip, expenses, setExpenses }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('');

  // Fetching the family heads (make sure it's not empty)
  const getFamilyHeads = () => {
    if (!trip || !trip.families) return [];
    return trip.families.map(family => ({
      name: family.head,
      label: `${family.head} (Head)`
    }));
  };

  const members = getFamilyHeads();

  const handleAddExpense = async (e) => {
    e.preventDefault();
    
    if (!trip?._id) {
      alert('No trip selected');
      return;
    }

    if (!description || !amount || !paidBy) {
      alert('Please fill all fields');
      return;
    }

    try {
      const expenseData = {
        tripId: trip._id,
        description,
        amount: parseFloat(amount),
        paidBy
      };

      const response = await api.post('/expenses', expenseData);
      
      if (response.data) {
        // Update the expenses state with the new expense
        setExpenses(prevExpenses => [...prevExpenses, response.data]);
        
        // Clear form
        setDescription('');
        setAmount('');
        setPaidBy('');
        alert('Expense added successfully!');
      }
    } catch (error) {
      console.error('Error adding expense:', error);
      alert('Failed to add expense: ' + (error.response?.data?.message || error.message));
    }
  };

  const styles = {
    container: {
      border: '1px solid #ccc',
      padding: '15px',
      borderRadius: '8px',
      marginBottom: '20px'
    },
    heading: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '10px'
    },
    input: {
      marginRight: '10px',
      padding: '6px',
      borderRadius: '4px',
      border: '1px solid #ccc'
    },
    button: {
      padding: '6px 12px',
      borderRadius: '4px',
      border: 'none',
      backgroundColor: '#007bff',
      color: 'white',
      cursor: 'pointer'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.heading}>Add Expense</div>
      <form onSubmit={handleAddExpense}> {/* Wrap in form element */}
        <input
          type="text"
          placeholder="Description"
          style={styles.input}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          style={styles.input}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          min="0"
          step="0.01"
        />
        <select
          style={styles.input}
          value={paidBy}
          onChange={(e) => setPaidBy(e.target.value)}
          required
        >
          <option value="">Select Payer</option>
          {members.map((member, idx) => (
            <option key={idx} value={member.name}>
              {member.label}
            </option>
          ))}
        </select>
        <button 
          type="submit" 
          style={styles.button}
        >
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default AddExpense;
