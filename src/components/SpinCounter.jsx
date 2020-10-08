import React from 'react';
import { FormattedMessage } from 'react-intl';

export function SpinCounter({ counter }) {
  return (
    <div className="counter">
      <h5>
        <FormattedMessage id="NO_OF_CLICKS" /> <span>{counter}</span>
      </h5>
    </div>
  );
}
