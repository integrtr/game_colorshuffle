import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';

import './App.css';
import { Game } from './components/Game';
import { Options } from './components/Options';
import en from './intl/i18n.json';
import { GameName } from './components/GameName';
import { ExternalLink } from './components/ExternalLink';

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
        <GameName />
        <Game />
        <Options appLangs={appLangs} locale={locale} updateLocaleState={updateLocaleState} />
        <ExternalLink />
      </div>
    </IntlProvider>
  );
}
