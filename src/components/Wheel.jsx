import React from 'react';

export const Wheel = ({ onClick, index, angle, colors }) => (
  <button
    className="wheel"
    onClick={() => onClick(index)}
    style={{ transform: `rotate(${angle}deg)` }}
  >
    {colors.map((_, index) => (
      <div key={index} className="quadrant" />
    ))}
  </button>
);
