import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

export const GameOptions = ({ appLangs, updateLocaleState, locale }) => {
  const [openDialog, setOpenDialog] = useState(false);

  let language;
  if (appLangs.find((lang) => lang === locale.selectedLang)) {
    language = locale.selectedLang;
  } else {
    language = 'en';
  }

  return (
    <>
      <div className="options">
        <div>
          <select onChange={updateLocaleState} name="locale" id="locale">
            <option value={language}>{language}</option>
            {appLangs.map(
              (lang) =>
                lang !== language && (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                )
            )}
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
