import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { MdLanguage } from 'react-icons/md';

export function Options({ appLangs, updateLocaleState, locale }) {
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
        <div className="language">
          <MdLanguage />
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
            <li>
              <h3>About</h3>
              <p>
                <FormattedMessage id="ABOUT" />
              </p>
            </li>
          </ul>
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
            <a href="www.example.com" className="view-blog">
              <FormattedMessage id="VIEW_BLOG" />
            </a>
            <button className="close-btn" onClick={() => setOpenDialog(false)}>
              <FormattedMessage id="CLOSE" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
