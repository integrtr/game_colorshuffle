import React, { useState } from 'react';
import { FormattedMessage, IntlProvider } from 'react-intl';
import random from 'canvas-sketch-util/random';

import './App.css';
import { Game } from './components/Game';
import { GameOptions } from './components/GameOptions';
import en from './intl/i18n.json';

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

export default function App() {
  const [win, setWin] = useState(false);
  const [counter, setCounter] = useState(0);
  const [solution, setSolution] = useState(generateSolution);
  const [gameState, setGameState] = useState(generateInitialGameState);

  const lang = window.location.pathname.split('/')[1];

  const selectedMessages = (lang) => {
    switch (lang) {
      case 'en':
      default:
        return en;
    }
  };

  const [locale, setLocale] = useState({
    selectedLang: lang ? lang : 'en',
    messages: lang ? selectedMessages(lang) : en,
  });

  const updateLocaleState = (event) => {
    const lang = event.target.value;

    setLocale({
      selectedLang: lang,
      messages: selectedMessages(lang),
    });
  };

  const appLangs = ['en'];

  const playAgain = () => {
    setSolution(generateSolution);
    setGameState(generateInitialGameState);
    setWin(false);
  };

  if (win && counter === 0) {
    setWin(false);
  }

  return (
    <IntlProvider locale={locale.selectedLang} messages={locale.messages}>
      <div className="container">
        <div className="game-title">
          <span>
            <FormattedMessage id="COLOR" />
          </span>
          <span>
            <FormattedMessage id="SHUFFLE" />
          </span>
        </div>
        <Game
          solution={solution}
          colorToAngle={colorToAngle}
          gameState={gameState}
          getSafeAngle={getSafeAngle}
          setWin={setWin}
          setCounter={setCounter}
          setGameState={setGameState}
          win={win}
          step={step}
          colors={colors}
        />
        <div className="counter">
          <h5>
            <FormattedMessage id="NO_OF_CLICKS" /> <span>{counter}</span>
          </h5>
        </div>
        {win && (
          <>
            <div className="msg">
              <h1>
                <FormattedMessage id="YOU_WON" />
              </h1>
            </div>
            <div className="play-again">
              <button className="btn" onClick={playAgain}>
                <FormattedMessage id="PLAY_AGAIN" />
              </button>
            </div>
          </>
        )}
        <GameOptions appLangs={appLangs} locale={locale} updateLocaleState={updateLocaleState} />
        <div className="visit-thub">
          <a href="https://translate.integrtr.com" className="thub-url">
            Visit INTEGRTR Translation Hub
          </a>
        </div>
      </div>
    </IntlProvider>
  );
}
