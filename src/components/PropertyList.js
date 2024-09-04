import React from 'react';
import PropertyTile from './PropertyTile';

function PropertyList({ properties }) {
  return (
    <div className="property-list">
      {properties.map(property => (
        <PropertyTile key={property.id} property={property} />
      ))}
    </div>
  );
}

export default PropertyList;