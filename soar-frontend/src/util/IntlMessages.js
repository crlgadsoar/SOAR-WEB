import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';

/**
 * A higher-order component that injects a message from the message bundle using the
 * `FormattedMessage` component.
 */
const InjectMassage = (props) => <FormattedMessage {...props} />;
export default injectIntl(InjectMassage, {
  withRef: false,
});
