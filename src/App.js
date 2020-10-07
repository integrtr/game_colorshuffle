import React, { useState } from 'react';
import { FormattedMessage, IntlProvider } from 'react-intl';

import './App.css';
import { Game } from './components/Game';
import { GameOptions } from './components/GameOptions';
import en from './intl/i18n.json';

export default function App() {
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
        <GameOptions appLangs={appLangs} locale={locale} updateLocaleState={updateLocaleState} />
        <Game />
        <div className="visit-thub">
          <a href="https://translate.integrtr.com" className="thub-url">
            Visit INTEGRTR Translation Hub
          </a>
        </div>
      </div>
    </IntlProvider>
  );
}
