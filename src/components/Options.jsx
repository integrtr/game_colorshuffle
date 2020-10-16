import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { MdLanguage } from 'react-icons/md';
import {GoMarkGithub} from 'react-icons/go'

const isLanguageSelected = ({ lang, appLangs, locale }) => {
  if (appLangs.find((lang) => lang === locale.selectedLang)) {
    return lang === locale.selectedLang;
  } else {
    return lang === 'en';
  }
};

export function Options({ appLangs, updateLocaleState, locale }) {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <div className="options">
        <div className="language">
          <MdLanguage />
          <div>
            <select onChange={updateLocaleState} name="locale" id="locale">
              {appLangs.map((lang) => (
                <option
                  key={lang}
                  value={lang}
                  selected={isLanguageSelected({ lang, appLangs, locale })}
                >
                  {lang}
                </option>
              ))}
            </select>
          </div>
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
          <div className="instructions">
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
            </ul>
            <div className="about">
              <h3>About</h3>
              <p>
                <FormattedMessage id="ABOUT" />
              </p>
            </div>
          </div>
          <div className="actions">
            <div className="logo-container">
              <div>
                <div className="logo-text">
                  <FormattedMessage id="POWERED_BY" />
                </div>
                <img
                  className="logo"
                  src="https://cdn.integrtr.com/logos/integrtr_logo_dark.png"
                  alt="Integrtr Logo"
                />
              </div>
            </div>
            <div className="dialog-actions">
              <a
                href="https://www.integrtr.com/using-translation-hub-with-react/"
                target="_blank"
                rel="noopener noreferrer"
                className="view-blog"
              >
                <FormattedMessage id="VIEW_BLOG" />
              </a>
              <a
                href="https://github.com/integrtr/game_colorshuffle"
                target="_blank"
                rel="noopener noreferrer"
                className="view-source-code"
              >
                <GoMarkGithub className="github-icon" size="23px"/>
                <FormattedMessage id="VIEW_CODE" />
              </a>
              <button className="close-btn" onClick={() => setOpenDialog(false)}>
                <FormattedMessage id="CLOSE" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
