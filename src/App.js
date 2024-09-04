import React, { useState, useEffect } from 'react';
import PropertyList from './components/PropertyList';
import gameRules from './data/gameRules.json';

function App() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Load properties from gameRules
    setProperties(gameRules.properties);
  }, []);

  return (
    <div className="App">
      <h1>Monopoly Helper</h1>
      <PropertyList properties={properties} />
    </div>
  );
}

export default App;