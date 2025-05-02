import { useMemo } from 'react';

export const useExpenseSplit = (families, expenses) => {
  return useMemo(() => {
    const totalMembers = families.reduce((sum, fam) => sum + fam.members.length, 0);
    const totalAmount = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
    const perPerson = totalAmount / totalMembers;

    const familyTotals = {};
    families.forEach(fam => {
      const familyExpense = expenses
        .filter(exp => exp.paidBy === fam.head)
        .reduce((sum, exp) => sum + Number(exp.amount), 0);

      const owed = fam.members.length * perPerson;
      familyTotals[fam.head] = {
        paid: familyExpense,
        shouldPay: owed,
        balance: familyExpense - owed
      };
    });

    const summary = [];
    const payers = Object.entries(familyTotals).filter(([_, val]) => val.balance > 0);
    const receivers = Object.entries(familyTotals).filter(([_, val]) => val.balance < 0);

    payers.forEach(([payer, pVal]) => {
      receivers.forEach(([receiver, rVal]) => {
        if (pVal.balance === 0) return;
        const amount = Math.min(pVal.balance, Math.abs(rVal.balance));
        if (amount > 0) {
          summary.push({ from: receiver, to: payer, amount });
          pVal.balance -= amount;
          rVal.balance += amount;
        }
      });
    });

    return { totalAmount, perPerson, summary };
  }, [families, expenses]);
};
