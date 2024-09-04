import React from 'react';
import PropertyItem from './PropertyItem';

function PropertyList({ properties, updateProperty }) {
  return (
    <ul>
      {properties.map(property => (
        <PropertyItem 
          key={property.id} 
          property={property} 
          updateProperty={updateProperty} 
        />
      ))}
    </ul>
  );
}

export default PropertyList;