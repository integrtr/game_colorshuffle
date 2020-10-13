import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';

import './App.css';
import { Game } from './components/Game';
import { Options } from './components/Options';
import { GameName } from './components/GameName';
import { ExternalLink } from './components/ExternalLink';
import en from './intl/i18n.json';
import bn from './intl/i18n_bn.json';
import de from './intl/i18n_de.json';
import hi from './intl/i18n_hi.json';
import kn from './intl/i18n_kn.json';

export default function App() {
  const lang = window.location.pathname.split('/')[1];

  function mergeWithDefault(messages) {
    return {
      ...en,
      ...messages,
    };
  }

  const selectedMessages = (lang) => {
    switch (lang) {
      case 'de':
        return mergeWithDefault(de);
      case 'bn':
        return mergeWithDefault(bn);
      case 'hi':
        return mergeWithDefault(hi);
      case 'kn':
        return mergeWithDefault(kn);
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

  const appLangs = ['en', 'bn', 'de', 'hi', 'kn'];

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
