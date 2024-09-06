import { calculateRent, Property } from './calculateRent';

describe('calculateRent', () => {
  const baseProperty: Property = {
    id: 1,
    name: 'Test Property',
    color: 'blue',
    baseRent: 10,
    rent: 10,
    owner: null,
    houses: 0,
    hotel: false
  };

  it('calculates base rent correctly', () => {
    const result = calculateRent(baseProperty, [baseProperty]);
    expect(result).toBe(10);
  });

  it('calculates rent for stations correctly', () => {
    const station: Property = { ...baseProperty, color: 'station', owner: 'Player1' };
    const allProperties = [
      station,
      { ...station, id: 2 },
      { ...station, id: 3 },
      { ...station, id: 4 }
    ];

    expect(calculateRent(station, [station])).toBe(25);
    expect(calculateRent(station, allProperties.slice(0, 2))).toBe(50);
    expect(calculateRent(station, allProperties.slice(0, 3))).toBe(100);
    expect(calculateRent(station, allProperties)).toBe(200);
  });

  it('calculates rent with houses correctly', () => {
    const propertyWithHouses: Property = { ...baseProperty, houses: 3 };
    expect(calculateRent(propertyWithHouses, [propertyWithHouses])).toBe(300); // 10 * 30
  });

  it('calculates rent with hotel correctly', () => {
    const propertyWithHotel: Property = { ...baseProperty, hotel: true };
    expect(calculateRent(propertyWithHotel, [propertyWithHotel])).toBe(500); // 10 * 50
  });

  it('applies whole street premium correctly', () => {
    const ownedProperty1: Property = { ...baseProperty, owner: 'Player1' };
    const ownedProperty2: Property = { ...baseProperty, id: 2, owner: 'Player1' };
    const allProperties = [ownedProperty1, ownedProperty2];

    // Assuming wholeStreetPremium is 2 in gameRules.json
    expect(calculateRent(ownedProperty1, allProperties)).toBe(20); // 10 * 2
  });
});