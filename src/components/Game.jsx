import React, { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import { isEqual } from 'lodash-es';
import random from 'canvas-sketch-util/random';

import { SpinCounter } from './SpinCounter';
import { Win } from './Win';

const colorToAngle = new Map([
  ['peachpuff', 45],
  ['paleturquoise', 45 + 90],
  ['darkseagreen', 45 + 180],
  ['lightcoral', 45 + 270],
]);

const step = 90;

const getSafeAngle = (angle) => angle % 360;

const startAngles = [...colorToAngle.values()];
const colors = [...colorToAngle.keys()];

const generateSolution = () => random.shuffle(colors);
const generateInitialGameState = () => startAngles.map(() => random.pick(startAngles));

export function Game() {
  const [win, setWin] = useState(false);
  const [counter, setCounter] = useState(0);
  const [solution, setSolution] = useState(generateSolution);
  const [gameState, setGameState] = useState(generateInitialGameState);

  const playAgain = useCallback(() => {
    setSolution(generateSolution);
    setGameState(generateInitialGameState);
    setWin(false);
    setCounter(0);
  }, []);

  useEffect(() => {
    const angleSolution = solution.map((color) => colorToAngle.get(color));

    if (isEqual(gameState.map(getSafeAngle), angleSolution)) {
      if (counter > 0) {
        setWin(true);
      } else {
        playAgain();
      }
    }
  }, [gameState, solution, setWin, counter, playAgain]);

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
      <SpinCounter counter={counter} />
      <Win win={win} playAgain={playAgain} />
    </>
  );
}

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
