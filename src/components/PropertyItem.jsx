import React from 'react';
import { CURRENCY_SYMBOL } from '../config';

function PropertyItem({ property, updateProperty }) {
  const owners = ['Vacant', 'Player 1', 'Player 2', 'Player 3'];
  const houseOptions = [0, 1, 2, 3, 4, 'Hotel'];

  const handleOwnerChange = (newOwner) => {
    updateProperty({ ...property, owner: newOwner, houses: 0, hotel: false });
  };

  const handleHouseChange = (houses) => {
    if (houses === 'Hotel') {
      updateProperty({ ...property, houses: 5, hotel: true });
    } else {
      updateProperty({ ...property, houses, hotel: false });
    }
  };

  return (
    <li 
      className="property-item" 
      style={{ 
        border: `2px solid ${property.color}`, 
        padding: '10px', 
        borderRadius: '8px',
        height: '100%', // Fill the entire grid cell
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box'
      }}
    >
      <h3 style={{ marginTop: 0 }}>{property.name}</h3>
      <p>Rent: {CURRENCY_SYMBOL}{property.rent}</p>
      <p>Purchase Price: {CURRENCY_SYMBOL}{property.price}</p>
      
      <div className="owner-buttons" style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '10px' }}>
        <p style={{ width: '100%', margin: '5px 0' }}>Owner:</p>
        {owners.map((owner) => (
          <button
            key={owner}
            onClick={() => handleOwnerChange(owner)}
            className={property.owner === owner ? 'active' : ''}
            style={{
              flex: '1 0 calc(50% - 5px)',
              padding: '10px',
              fontSize: '16px',
              backgroundColor: property.owner === owner ? '#4CAF50' : '#f0f0f0',
              color: property.owner === owner ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {owner}
          </button>
        ))}
      </div>

      <div className="house-buttons" style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: 'auto' }}>
        <p style={{ width: '100%', margin: '5px 0' }}>Houses/Hotel:</p>
        {houseOptions.map((option) => (
          <button
            key={option}
            onClick={() => handleHouseChange(option)}
            className={
              (option === 'Hotel' && property.hotel) ||
              (option !== 'Hotel' && property.houses === option)
                ? 'active'
                : ''
            }
            style={{
              flex: '1 0 calc(33.333% - 5px)',
              padding: '10px',
              fontSize: '16px',
              backgroundColor: 
                (option === 'Hotel' && property.hotel) ||
                (option !== 'Hotel' && !property.hotel && property.houses === option)
                  ? '#4CAF50'
                  : '#f0f0f0',
              color: 
                (option === 'Hotel' && property.hotel) ||
                (option !== 'Hotel' && !property.hotel && property.houses === option)
                  ? 'white'
                  : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </li>
  );
}

export default PropertyItem;