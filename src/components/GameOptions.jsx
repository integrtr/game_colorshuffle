import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

export const GameOptions = ({ appLangs, updateLocaleState }) => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <div className="options">
        <div>
          <select onChange={updateLocaleState} name="locale" id="locale">
            {appLangs.map((lang) => (
              <option value={lang}>{lang}</option>
            ))}
          </select>
        </div>
        <div>
          <button
            disabled={openDialog}
            className="how-to-play-btn"
            onClick={() => setOpenDialog(true)}
          >
            <FormattedMessage id="HOW_TO_PLAY" />
          </button>
        </div>
      </div>
      {openDialog && (
        <div className="dialog-box">
          <h1>
            <FormattedMessage id="HOW_TO_PLAY" />
          </h1>
          <ul>
            <li>
              <FormattedMessage id="TIP1" />
            </li>
            <li>
              <FormattedMessage id="TIP2" />
            </li>
            <li>
              <FormattedMessage id="TIP3" />
            </li>

            <li>
              <FormattedMessage id="TIP4" />
            </li>
            <li>
              <FormattedMessage id="TIP5" />
            </li>
            <li>
              <FormattedMessage id="TIP6" />
            </li>
          </ul>
          <button className="close-btn" onClick={() => setOpenDialog(false)}>
            <FormattedMessage id="CLOSE" />
          </button>
        </div>
      )}
    </>
  );
};
