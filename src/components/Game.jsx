import React, { useEffect } from 'react';
import clsx from 'clsx';
import { isEqual } from 'lodash-es';

export const Game = ({
  solution,
  colorToAngle,
  gameState,
  getSafeAngle,
  setWin,
  setCounter,
  setGameState,
  win,
  step,
  colors,
}) => {
  useEffect(() => {
    const angleSolution = solution.map((color) => colorToAngle.get(color));

    if (isEqual(gameState.map(getSafeAngle), angleSolution)) {
      setWin(true);
    }
  }, [gameState, solution, getSafeAngle, colorToAngle, setWin]);

  const rotate = (index) => {
    setCounter((prevState) => prevState + 1);
    if (!win) {
      setGameState((state) =>
        state.map((val, i) => {
          if (i === index - 1 || i === index || i === index + 1) {
            return val + step;
          }

          return val;
        })
      );
    }
  };

  return (
    <>
      <div className={clsx('app', win && 'win')}>
        <div className="answer">
          {solution.map((color, index) => (
            <div className="color" key={index} style={{ background: color }} index={index} />
          ))}
        </div>
        <div className="markers">
          {solution.map((color, index) => (
            <div key={index} className="mark" style={{ borderTopColor: color }} index={{ index }} />
          ))}
        </div>
        <div className="wheels">
          {colors.map((_, index) => (
            <Wheel
              key={index}
              index={index}
              onClick={rotate}
              angle={gameState[index]}
              colors={colors}
            />
          ))}
        </div>
      </div>
    </>
  );
};

const Wheel = ({ onClick, index, angle, colors }) => (
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
