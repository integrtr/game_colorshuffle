import React, { useState } from 'react';

export const GameOptions = () => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <div className="options">
        <div>
          <button
            disabled={openDialog}
            className="how-to-play-btn"
            onClick={() => setOpenDialog(true)}
          >
            How to Play?
          </button>
        </div>
      </div>
      {openDialog && (
        <div className="dialog-box">
          <h1>How to Play? </h1>
          <ul>
            <li>In the game, there are two rows of 4 circles each.</li>
            <li>The top circles with a marker pointing down are the solution we have to achieve</li>
            <li>
              The bottom circles are rotateable, and the player has to rotate them to match the
              quadrant with the respective above color
            </li>
            <li>Whenever a bottom circle is clicked it rotates in the right direction</li>
            <li>Whenever a circle rotates, all it's adjacent circles rotate aswell</li>
            <li>The aim of the player is to match the quadrant with the above color </li>
          </ul>
          <button className="close-btn" onClick={() => setOpenDialog(false)}>
            Close
          </button>
        </div>
      )}
    </>
  );
};
