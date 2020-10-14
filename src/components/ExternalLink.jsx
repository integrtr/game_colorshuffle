import React from 'react';
import { FormattedMessage } from 'react-intl';

export function ExternalLink() {
  return (
    <div className="visit-thub">
      <a
        href="https://translate.integrtr.com"
        target="_blank"
        rel="noopener noreferrer"
        className="thub-url"
      >
        <FormattedMessage id="VISIT" />
      </a>
    </div>
  );
}
