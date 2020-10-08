import React from 'react';
import { FormattedMessage } from 'react-intl';

export function ExternalLink() {
  return (
    <div className="visit-thub">
      <a href="https://translate.integrtr.com" className="thub-url">
        <FormattedMessage id="VISIT" />
      </a>
    </div>
  );
}
