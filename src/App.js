import React, { useState, useEffect } from 'react';
import PropertyList from './components/PropertyList';
import gameRules from './data/gameRules.json';

function App() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Add baseRent to each property
    const propertiesWithBaseRent = gameRules.properties.map(prop => ({
      ...prop,
      baseRent: prop.rent,
      rent: prop.rent // Initialize rent to baseRent
    }));
    setProperties(propertiesWithBaseRent);
  }, []);

  const calculateRent = (property, allProperties) => {
    let rent = property.baseRent;
    
    // Check if the whole street is owned by the same player
    const sameColorProperties = allProperties.filter(p => p.color === property.color);
    const wholeStreetOwned = sameColorProperties.every(p => p.owner === property.owner && p.owner !== null);
    
    if (property.houses > 0 || property.hotel) {
      // Use a multiplier based on the number of houses or hotel
      const rentMultipliers = [1, 5, 15, 30, 40, 50]; // 0 houses, 1 house, 2 houses, 3 houses, 4 houses, hotel
      const index = property.hotel ? 5 : property.houses;
      rent = property.baseRent * rentMultipliers[index];
    }

    // Apply whole street premium to the rent, even if houses are built
    if (wholeStreetOwned && property.color !== 'utility' && property.color !== 'station') {
      rent *= gameRules.wholeStreetPremium;
    }

    return Math.round(rent);
  };

  const updateProperty = (updatedProperty) => {
    setProperties(prevProperties => {
      // Update the specific property
      let newProperties = prevProperties.map(prop => 
        prop.id === updatedProperty.id ? {...updatedProperty, baseRent: prop.baseRent} : prop
      );

      // Recalculate rent for all properties of the same color
      newProperties = newProperties.map(prop => {
        if (prop.color === updatedProperty.color) {
          return {
            ...prop,
            rent: calculateRent(prop, newProperties)
          };
        }
        return prop;
      });

      return newProperties;
    });
  };

  console.log('App.js loaded', new Date().toISOString());

  return (
    <div className="App">
      <h1>Monopoly Helper</h1>
      <PropertyList properties={properties} updateProperty={updateProperty} />
    </div>
  );
}

export default App;