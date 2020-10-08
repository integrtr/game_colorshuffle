import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { isEqual } from 'lodash-es';
import random from 'canvas-sketch-util/random';

import { ClickCounter } from './ClickCounter';
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
  const [win, setWin] = useState(true);
  const [counter, setCounter] = useState(0);
  const [solution, setSolution] = useState(generateSolution);
  const [gameState, setGameState] = useState(generateInitialGameState);

  useEffect(() => {
    const angleSolution = solution.map((color) => colorToAngle.get(color));

    if (isEqual(gameState.map(getSafeAngle), angleSolution) && counter !== 0) {
      setWin(true);
    } else {
      setWin(false);
    }
  }, [gameState, solution, setWin, counter]);

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

  const playAgain = () => {
    setSolution(generateSolution);
    setGameState(generateInitialGameState);
    setWin(false);
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
      <ClickCounter counter={counter} />
      <Win
        win={win}
        setSolution={setSolution}
        setGameState={setGameState}
        setWin={setWin}
        generateSolution={generateSolution}
        generateInitialGameState={generateInitialGameState}
        playAgain={playAgain}
      />
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
