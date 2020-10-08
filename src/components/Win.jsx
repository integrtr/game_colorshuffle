import React from 'react';
import { FormattedMessage } from 'react-intl';

export function Win({
  win,
  setSolution,
  setGameState,
  setWin,
  generateSolution,
  generateInitialGameState,
  playAgain,
}) {
  return (
    win && (
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
    )
  );
}
