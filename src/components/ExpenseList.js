import React from 'react';

const ExpenseList = ({ expenses }) => {
    const safeExpenses = Array.isArray(expenses) ? expenses : [];

    const styles = {
        container: {
            marginTop: '20px',
            padding: '15px',
            border: '1px solid #ccc',
            borderRadius: '8px'
        },
        expenseItem: {
            padding: '10px',
            marginBottom: '10px',
            backgroundColor: '#f8f9fa',
            borderRadius: '4px'
        }
    };

    return (
        <div style={styles.container}>
            <h2>Expense List</h2>
            {safeExpenses.length === 0 ? (
                <p>No expenses added yet.</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {safeExpenses.map((expense, index) => (
                        <li key={expense._id || index} style={styles.expenseItem}>
                            <strong>Description:</strong> {expense.description}<br />
                            <strong>Amount:</strong> ₹{expense.amount.toFixed(2)}<br />
                            <strong>Paid By:</strong> {expense.paidBy}<br />
                            <small>Added: {new Date(expense.createdAt).toLocaleDateString()}</small>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ExpenseList;
