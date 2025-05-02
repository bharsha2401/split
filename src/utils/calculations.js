import React from 'react';
import { TripProvider } from './context/TripContext';
import Dashboard from './components/Dashboard';

function App() {
  const styles = {
    container: {
      padding: '20px',
      maxWidth: '1000px',
      margin: '0 auto',
      fontFamily: 'Arial'
    },
    header: {
      textAlign: 'center',
      color: '#333'
    }
  };

  return (
    <TripProvider>
      <div style={styles.container}>
        <h1 style={styles.header}>Trip Expense Splitter</h1>
        <Dashboard />
      </div>
    </TripProvider>
  );
}

export default App;
