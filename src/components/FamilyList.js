import React, { useState } from 'react';

const FamilyList = ({ trip, setTrip }) => {
  const [head, setHead] = useState('');
  const [memberCount, setMemberCount] = useState(0);
  const [memberNames, setMemberNames] = useState([]);

  const handleAddFamily = () => {
    console.log('Add Family clicked!'); // Debugging line
    if (!head || memberCount <= 0 || memberNames.includes('')) {
      console.log('Invalid input!'); // Debugging line
      return;
    }

    const newFamily = {
      head,
      members: memberNames
    };

    const updatedTrip = {
      ...trip,
      families: [...(trip.families || []), newFamily]
    };

    setTrip(updatedTrip);

    // Reset inputs
    setHead('');
    setMemberCount(0);
    setMemberNames([]);
  };

  const handleMemberNameChange = (index, value) => {
    const updatedNames = [...memberNames];
    updatedNames[index] = value;
    setMemberNames(updatedNames);
  };

  const handleMemberCountChange = (value) => {
    const count = parseInt(value, 10);
    if (isNaN(count) || count < 0) return;

    setMemberCount(count);
    setMemberNames(new Array(count).fill(''));
  };

  const styles = {
    container: { marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '8px' },
    input: { margin: '5px 10px 5px 0', padding: '5px' },
    button: { padding: '6px 12px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px' },
    memberInput: { marginBottom: '5px' },
    familyBox: { marginTop: '10px', padding: '5px', backgroundColor: '#f9f9f9', borderRadius: '4px' }
  };

  return (
    <div style={styles.container}>
      <h3>Add Family</h3>

      <input
        type="text"
        placeholder="Family Head"
        value={head}
        onChange={(e) => setHead(e.target.value)}
        style={styles.input}
      />

      <input
        type="number"
        placeholder="Number of Members"
        value={memberCount || ''}
        onChange={(e) => handleMemberCountChange(e.target.value)}
        style={styles.input}
      />

      {memberNames.map((name, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder={`Member ${index + 1} Name`}
            value={name}
            onChange={(e) => handleMemberNameChange(index, e.target.value)}
            style={{ ...styles.input, ...styles.memberInput }}
          />
        </div>
      ))}

      <button onClick={handleAddFamily} style={styles.button}>Add Family</button>

      <h4>Family List:</h4>
      {(trip?.families || []).map((family, index) => (
        <div key={index} style={styles.familyBox}>
          <strong>Head:</strong> {family.head}<br />
          <strong>Members:</strong> {family.members.join(', ') || 'None'}
        </div>
      ))}
    </div>
  );
};

export default FamilyList;
