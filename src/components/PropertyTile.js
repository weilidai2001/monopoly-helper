import React from 'react';

function PropertyTile({ property }) {
  return (
    <div className="property-tile" style={{ backgroundColor: property.color }}>
      <h3>{property.name}</h3>
      <p>Owner: {property.owner || 'Vacant'}</p>
      <p>Rent: ${property.rent}</p>
    </div>
  );
}

export default PropertyTile;