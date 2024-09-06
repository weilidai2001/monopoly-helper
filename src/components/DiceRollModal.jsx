import React, { useState, useEffect } from 'react';
import { FaDice } from 'react-icons/fa';
import './DiceRollModal.css';

const DiceRollModal = ({ isOpen, onClose }) => {
  const [diceValues, setDiceValues] = useState([1, 1]);
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = () => {
    setIsRolling(true);
    setTimeout(() => {
      const newDiceValues = [
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1
      ];
      setDiceValues(newDiceValues);
      setIsRolling(false);
    }, 1500);
  };

  useEffect(() => {
    if (isOpen) {
      setDiceValues([1, 1]);
      setIsRolling(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const renderDots = (value) => {
    return Array(value).fill().map((_, i) => <div key={i} className="dot"></div>);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Roll the Dice</h2>
        <div className="dice-container">
          {diceValues.map((value, index) => (
            <div key={index} className={`dice ${isRolling ? 'rolling' : ''} face-${value}`}>
              {isRolling ? <FaDice className="dice-icon" /> : renderDots(value)}
            </div>
          ))}
        </div>
        <button className="roll-button" onClick={rollDice} disabled={isRolling}>
          {isRolling ? 'Rolling...' : 'Roll Dice'}
        </button>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default DiceRollModal;