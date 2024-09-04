import React from 'react';
import PropertyItem from './PropertyItem';

function PropertyList({ properties, updateProperty }) {
  console.log('PropertyList.jsx loaded', new Date().toISOString());
  return (
    <ul style={{
      listStyleType: 'none',
      padding: 0,
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '20px'
    }}>
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