import locale from 'antd/locale/en_US';
import messages from '../locales/en_US.json';

const Lang = {
  messages: {
    ...messages,
  },
  antd: locale,
  locale: 'en-US', //react-intl
};
export default Lang;
