import React from 'react';
import { FormattedMessage } from 'react-intl';

export function GameName() {
  return (
    <div className="game-title">
      <span>
        <FormattedMessage id="COLOR" />
      </span>
      <span>
        <FormattedMessage id="SHUFFLE" />
      </span>
    </div>
  );
}
