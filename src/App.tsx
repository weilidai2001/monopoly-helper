import React, { useState, useEffect } from 'react';
import PropertyList from './components/PropertyList';
import DiceRollModal from './components/DiceRollModal';
import gameRules from './data/gameRules.json';
import { CURRENCY_SYMBOL } from './config';
import { calculateRent, Property } from './utils/calculateRent';
import { FaDice } from 'react-icons/fa';

function App() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isDiceModalOpen, setIsDiceModalOpen] = useState(false);

  useEffect(() => {
    // Initialize properties with baseRent and calculated rent
    const initialProperties = gameRules.properties.map((prop: any) => ({
      ...prop,
      baseRent: prop.rent,
      rent: prop.rent // Initialize rent to baseRent
    }));
    
    // Calculate initial rent for all properties
    const propertiesWithRent = initialProperties.map(prop => ({
      ...prop,
      rent: calculateRent(prop, initialProperties)
    }));

    setProperties(propertiesWithRent);
  }, []);

  const updateProperty = (updatedProperty: Property) => {
    setProperties(prevProperties => {
      // Update the specific property
      const newProperties = prevProperties.map(prop => 
        prop.id === updatedProperty.id ? {...updatedProperty, baseRent: prop.baseRent} : prop
      );

      // Recalculate rent for all properties
      return newProperties.map(prop => ({
        ...prop,
        rent: calculateRent(prop, newProperties)
      }));
    });
  };

  console.log('App.tsx loaded', new Date().toISOString());

  return (
    <div className="App">
      <h1>
        Monopoly Helper {CURRENCY_SYMBOL}
        <FaDice 
          onClick={() => setIsDiceModalOpen(true)} 
          style={{ marginLeft: '10px', cursor: 'pointer' }}
        />
      </h1>
      <PropertyList properties={properties} updateProperty={updateProperty} />
      <DiceRollModal 
        isOpen={isDiceModalOpen} 
        onClose={() => setIsDiceModalOpen(false)} 
      />
    </div>
  );
}

export default App;