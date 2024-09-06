import gameRules from '../data/gameRules.json';

export interface Property {
  id: number;
  name: string;
  color: string;
  baseRent: number;
  rent: number;
  owner: string | null;
  houses: number;
  hotel: boolean;
}

export const calculateRent = (property: Property, allProperties: Property[]): number => {
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
    const sameColorProperties = allProperties.filter(p => p.color === property.color);
    const wholeStreetOwned = property.owner !== "Vacant" && property.owner !== null &&
      sameColorProperties.every(p => p.owner === property.owner);
    
    if (property.houses > 0 || property.hotel) {
      const rentMultipliers = [1, 5, 15, 30, 40, 50];
      const index = property.hotel ? 5 : property.houses;
      rent = property.baseRent * rentMultipliers[index];
    }

    if (wholeStreetOwned) {
      rent *= gameRules.wholeStreetPremium;
    }
  }

  return Math.round(rent);
};