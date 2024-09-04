import React from 'react';
import PropertyTile from './PropertyTile';
import './PropertyList.css'; // We'll create this CSS file

function PropertyList({ properties, updateProperty }) {
  return (
    <div className="property-list">
      {properties.map(property => (
        <PropertyTile 
          key={property.id} 
          property={property} 
          updateProperty={updateProperty}
        />
      ))}
    </div>
  );
}

export default PropertyList;