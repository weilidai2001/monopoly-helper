import React, { useState, useEffect } from 'react';
import PropertyList from './components/PropertyList';
import gameRules from './data/gameRules.json';
import { CURRENCY_SYMBOL } from './config';

interface Property {
  id: number;
  name: string;
  color: string;
  baseRent: number;
  rent: number;
  owner: string | null;
  houses: number;
  hotel: boolean;
}

function App() {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    // Add baseRent to each property
    const propertiesWithBaseRent = gameRules.properties.map((prop: any) => ({
      ...prop,
      baseRent: prop.rent,
      rent: prop.rent // Initialize rent to baseRent
    }));
    setProperties(propertiesWithBaseRent);
  }, []);

  const calculateRent = (property: Property, allProperties: Property[]): number => {
    let rent = property.baseRent;
    
    if (property.color === 'station') {
      const ownedStations = allProperties.filter(p => 
        p.color === 'station' && 
        p.owner === property.owner && 
        p.owner !== 'Vacant' && 
        p.owner !== null
      ).length;
      const stationRents = [25, 50, 100, 200];
      rent = stationRents[ownedStations - 1] || 25;
    } else {
      // Check if the whole street is owned by the same player (excluding "Vacant" and null)
      const sameColorProperties = allProperties.filter(p => p.color === property.color);
      const wholeStreetOwned = property.owner !== "Vacant" && property.owner !== null &&
        sameColorProperties.every(p => p.owner === property.owner);
      
      if (property.houses > 0 || property.hotel) {
        // Use a multiplier based on the number of houses or hotel
        const rentMultipliers = [1, 5, 15, 30, 40, 50]; // 0 houses, 1 house, 2 houses, 3 houses, 4 houses, hotel
        const index = property.hotel ? 5 : property.houses;
        rent = property.baseRent * rentMultipliers[index];
      }

      // Apply whole street premium to the rent, even if houses are built, but not for "Vacant" or null owners
      if (wholeStreetOwned) {
        rent *= gameRules.wholeStreetPremium;
      }
    }

    return Math.round(rent);
  };

  const updateProperty = (updatedProperty: Property) => {
    setProperties(prevProperties => {
      // Update the specific property
      let newProperties = prevProperties.map(prop => 
        prop.id === updatedProperty.id ? {...updatedProperty, baseRent: prop.baseRent} : prop
      );

      // Recalculate rent for all properties
      newProperties = newProperties.map(prop => ({
        ...prop,
        rent: calculateRent(prop, newProperties)
      }));

      return newProperties;
    });
  };

  console.log('App.tsx loaded', new Date().toISOString());

  return (
    <div className="App">
      <h1>Monopoly Helper {CURRENCY_SYMBOL}</h1>
      <PropertyList properties={properties} updateProperty={updateProperty} />
    </div>
  );
}

export default App;