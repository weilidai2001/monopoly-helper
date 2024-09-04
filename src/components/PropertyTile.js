import React, { useState } from 'react';
import PropertyModal from './PropertyModal';
import './PropertyTile.css'; // We'll create this CSS file

function PropertyTile({ property, updateProperty }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTileClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div 
        className={`property-tile ${property.color}`}
        onClick={handleTileClick}
      >
        <div className="property-header">
          <h3>{property.name}</h3>
        </div>
        <div className="property-body">
          <p><strong>Owner:</strong> {property.owner || 'Vacant'}</p>
          <p><strong>Rent:</strong> ${property.rent}</p>
          {property.houses > 0 && <p><strong>Houses:</strong> {property.houses}</p>}
          {property.hotel && <p><strong>Hotel:</strong> Yes</p>}
        </div>
      </div>
      {isModalOpen && (
        <PropertyModal 
          property={property} 
          updateProperty={updateProperty}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}

export default PropertyTile;