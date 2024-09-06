import React, { useState } from 'react';
import { CURRENCY_SYMBOL } from '../config';

function PropertyItem({ property, updateProperty }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const owners = ['Vacant', 'Player 1', 'Player 2', 'Player 3'];
  const houseOptions = [0, 1, 2, 3, 4, 'Hotel'];

  const handleOwnerChange = (newOwner) => {
    updateProperty({ ...property, owner: newOwner, houses: 0, hotel: false });
    setIsExpanded(false);
  };

  const handleHouseChange = (houses) => {
    if (houses === 'Hotel') {
      updateProperty({ ...property, houses: 5, hotel: true });
    } else {
      updateProperty({ ...property, houses, hotel: false });
    }
    setIsExpanded(false);
  };

  const getOwnerBadge = (owner) => {
    switch(owner) {
      case 'Vacant':
        return { text: '?', color: '#808080' }; // Changed from 'V' to '?'
      case 'Player 1':
        return { text: 'P1', color: '#4CAF50' };
      case 'Player 2':
        return { text: 'P2', color: '#2196F3' };
      case 'Player 3':
        return { text: 'P3', color: '#FFC107' };
      default:
        return { text: '?', color: '#808080' };
    }
  };

  const ownerBadge = getOwnerBadge(property.owner);

  return (
    <li 
      className="property-item" 
      style={{ 
        border: `2px solid ${property.color}`, 
        padding: '10px', 
        borderRadius: '8px',
        height: isExpanded ? 'auto' : '80px', // Slightly increased height to accommodate new info
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        position: 'relative', // For positioning the expand icon
        overflow: 'hidden', // Hide overflow content when collapsed
        transition: 'height 0.3s ease-in-out' // Smooth transition for height change
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h3 style={{ margin: 0, marginRight: '10px', fontSize: '1.1em' }}>{property.name}</h3>
            <span style={{
              backgroundColor: ownerBadge.color,
              color: 'white',
              padding: '2px 6px',
              borderRadius: '12px',
              fontSize: '0.8em',
              fontWeight: 'bold'
            }}>
              {ownerBadge.text}
            </span>
          </div>
          <p style={{ margin: '3px 0 0 0', fontSize: '0.9em' }}>
            Rent: {CURRENCY_SYMBOL}{property.rent} | Price: {CURRENCY_SYMBOL}{property.price}
            {property.additionalHouseCost && ` | Upgrade: ${CURRENCY_SYMBOL}${property.additionalHouseCost}`}
          </p>
        </div>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '1.2em',
            cursor: 'pointer',
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease-in-out',
            padding: 0,
            marginTop: '-5px'
          }}
        >
          ▼
        </button>
      </div>
      
      {isExpanded && (
        <>
          <div className="owner-buttons" style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '10px' }}>
            <p style={{ width: '100%', margin: '5px 0' }}>Owner:</p>
            {owners.map((owner) => (
              <button
                key={owner}
                onClick={() => handleOwnerChange(owner)}
                className={
                  (property.owner === owner || (property.owner === null && owner === 'Vacant'))
                    ? 'active'
                    : ''
                }
                style={{
                  flex: '1 0 calc(50% - 5px)',
                  padding: '10px',
                  fontSize: '16px',
                  backgroundColor: 
                    (property.owner === owner || (property.owner === null && owner === 'Vacant'))
                      ? '#4CAF50'
                      : '#f0f0f0',
                  color: 
                    (property.owner === owner || (property.owner === null && owner === 'Vacant'))
                      ? 'white'
                      : 'black',
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
        </>
      )}
    </li>
  );
}

export default PropertyItem;