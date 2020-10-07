import React, { useState } from 'react';
import { FormattedMessage, IntlProvider } from 'react-intl';

import './App.css';
import { Game } from './components/Game';
import { GameOptions } from './components/GameOptions';
import en from './intl/i18n.json';

export default function App() {
  const [locale, setLocale] = useState({
    selectedLang: 'en',
    messages: en,
  });

  const selectedMessages = (lang) => {
    switch (lang) {
      case 'en':
      default:
        return en;
    }
  };

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
        <GameOptions appLangs={appLangs} updateLocaleState={updateLocaleState} />
        <Game />
      </div>
    </IntlProvider>
  );
}
