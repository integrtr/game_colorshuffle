import React, { useState, useEffect } from 'react';
import random from 'canvas-sketch-util/random';
import clsx from 'clsx';
import { isEqual } from 'lodash-es';

import { Wheel } from './Wheel';
import { FormattedMessage } from 'react-intl';

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

export const Game = () => {
  const [solution, setSolution] = useState(generateSolution);
  const [gameState, setGameState] = useState(generateInitialGameState);
  const [win, setWin] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const angleSolution = solution.map((color) => colorToAngle.get(color));

    if (isEqual(gameState.map(getSafeAngle), angleSolution)) {
      setWin(true);
    }
  }, [gameState, solution]);

  useEffect(() => {
    const handleCounterUpdate = () => {
      setCounter((prevState) => prevState + 1);
    };

    document.querySelectorAll('.wheel').forEach((wheel) => {
      wheel.addEventListener('click', handleCounterUpdate);
    });

    return () => {
      document.querySelectorAll('.wheel').forEach((wheel) => {
        wheel.removeEventListener('click', handleCounterUpdate);
      });
    };
  }, [counter]);

  const rotate = (index) => {
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
        <div className="counter">
          <h5>
            <FormattedMessage id="NO_OF_CLICKS" /> <span>{counter}</span>
          </h5>
        </div>
      </div>

      {win && (
        <div className="msg">
          <h1>
            <FormattedMessage id="YOU_WON" />
          </h1>
        </div>
      )}
      {win && (
        <div className="play-again">
          <button className="btn" onClick={playAgain}>
            <FormattedMessage id="PLAY_AGAIN" />
          </button>
        </div>
      )}
    </>
  );
};
