import React from 'react';

const TripSummary = ({ trip, expenses }) => {
  const families = trip?.families || [];

  const totalPeople = families.reduce((sum, fam) => sum + fam.members.length + 1, 0);
  const totalExpense = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const perPersonCost = totalPeople ? totalExpense / totalPeople : 0;

  // Step 1: Create summary with balance
  const summary = families.map(family => {
    const memberCount = family.members.length + 1;
    const share = memberCount * perPersonCost;
    const paid = expenses
      .filter(exp => exp.paidBy === family.head)
      .reduce((sum, exp) => sum + exp.amount, 0);

    return {
      family: family.head,
      paid,
      share,
      balance: +(paid - share).toFixed(2) // Round to 2 decimals
    };
  });

  // Step 2: Split creditors and debtors
  let creditors = summary.filter(f => f.balance > 0).sort((a, b) => b.balance - a.balance);
  let debtors = summary.filter(f => f.balance < 0).sort((a, b) => a.balance - b.balance);

  // Step 3: Settle balances
  const transactions = [];

  for (let debtor of debtors) {
    while (debtor.balance < 0 && creditors.length > 0) {
      const creditor = creditors[0];
      const amount = Math.min(-debtor.balance, creditor.balance);

      transactions.push({
        from: debtor.family,
        to: creditor.family,
        amount: amount.toFixed(2)
      });

      debtor.balance += amount;
      creditor.balance -= amount;

      // Remove creditor if their balance is now zero
      if (creditor.balance < 0.01) {
        creditors.shift();
      }
    }
  }

  return (
    <div style={{ marginTop: '30px', border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
      <h3>Trip Summary</h3>
      <p><strong>Total Expense:</strong> ₹{totalExpense.toFixed(2)}</p>
      <p><strong>Per Person Share:</strong> ₹{perPersonCost.toFixed(2)}</p>

      <h4>Family Balances:</h4>
      <ul>
        {summary.map((item, index) => (
          <li key={index}>
            <strong>{item.family}</strong>: Paid ₹{item.paid.toFixed(2)}, Share ₹{item.share.toFixed(2)} ⇒
            {item.balance > 0
              ? ` Gets ₹${item.balance.toFixed(2)}`
              : item.balance < 0
              ? ` Owes ₹${(-item.balance).toFixed(2)}`
              : ' Settled'}
          </li>
        ))}
      </ul>

      <h4>Who Pays Whom:</h4>
      {transactions.length === 0 ? (
        <p>All balances are settled.</p>
      ) : (
        <ul>
          {transactions.map((txn, idx) => (
            <li key={idx}>
              <strong>{txn.from}</strong> pays <strong>{txn.to}</strong> ₹{txn.amount}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TripSummary;
