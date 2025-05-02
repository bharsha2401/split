# Trip Expense Splitter

## Overview
The Trip Expense Splitter is a React application designed to help families manage and split expenses during trips. Users can create trips, add expenses, and view how costs are divided among family members.

## Features
- **Create a Trip**: Users can input trip details and select family members participating in the trip.
- **Add Expenses**: Users can add expenses incurred during the trip, which will be split among the families based on the number of participants.
- **Dashboard**: A central dashboard displays an overview of the trip and all expenses.
- **Family Management**: Users can view and manage the list of families participating in the trip.
- **Expense Summary**: The application provides a summary of total costs and how expenses are split among families.

## File Structure
```
trip-expense-splitter
├── src
│   ├── components
│   │   ├── AddExpense.js
│   │   ├── AddTrip.js
│   │   ├── Dashboard.js
│   │   ├── FamilyList.js
│   │   ├── ExpenseList.js
│   │   ├── TripDetails.js
│   │   └── TripSummary.js
│   ├── context
│   │   └── TripContext.js
│   ├── hooks
│   │   └── useExpenseSplit.js
│   ├── utils
│   │   └── calculations.js
│   ├── App.js
│   ├── index.js
│   └── styles
│       └── index.css
├── public
│   └── index.html
├── package.json
└── README.md
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd trip-expense-splitter
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Usage
To start the application, run:
```
npm start
```
This will launch the app in your default web browser.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.