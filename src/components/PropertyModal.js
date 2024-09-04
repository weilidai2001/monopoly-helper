import React, { useState } from 'react';

function PropertyModal({ property, updateProperty, onClose }) {
  const [owner, setOwner] = useState(property.owner || '');
  const [houses, setHouses] = useState(property.houses || 0);
  const [hotel, setHotel] = useState(property.hotel || false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProperty({
      ...property,
      owner: owner || null,
      houses: owner ? (hotel ? 0 : houses) : 0,
      hotel: owner ? hotel : false
    });
    onClose();
  };

  return (
    <div className="property-modal">
      <h2>{property.name}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Owner:
          <input 
            type="text" 
            value={owner} 
            onChange={(e) => setOwner(e.target.value)}
            placeholder="Enter owner name or leave blank for vacant"
          />
        </label>
        {property.color !== 'utility' && property.color !== 'station' && (
          <>
            <label>
              Houses:
              <input 
                type="number" 
                min="0" 
                max="4" 
                value={houses} 
                onChange={(e) => {
                  setHouses(Number(e.target.value));
                  setHotel(false); // Reset hotel when houses change
                }}
                disabled={hotel}
              />
            </label>
            <label>
              Hotel:
              <input 
                type="checkbox" 
                checked={hotel} 
                onChange={(e) => {
                  setHotel(e.target.checked);
                  if (e.target.checked) {
                    setHouses(0); // Reset houses when hotel is checked
                  }
                }}
              />
            </label>
          </>
        )}
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}

export default PropertyModal;