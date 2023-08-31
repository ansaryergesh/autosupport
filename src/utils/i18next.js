import i18nextInstance from '../providers/i18next';

const i18n = {
  ...i18nextInstance,
  t: (messageId, defaultMessage = `${messageId}`, options) => {
    if (!messageId) return '';

    return i18nextInstance.t(messageId, defaultMessage, { ...options });
  },
};

const formatHTMLMessage = (messageId, identifier, defaultMessage = `Перевод: ${messageId}`) => {
  if (!messageId) return '';

  return i18n.t(messageId, defaultMessage, { ...identifier });
};

const getLocale = () => i18n.language.toUpperCase(); // 'ru' or 'kk' or 'qq'

export { formatHTMLMessage, getLocale, i18n };
