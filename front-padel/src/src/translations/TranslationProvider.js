/* eslint-disable import/no-named-as-default-member */
import PropTypes from "prop-types";

import { I18nextProvider } from "react-i18next";
import i18n from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18n
  .use(resourcesToBackend((language, namespace) => import(`./${language}/${namespace}.json`)))
  .init({
    interpolation: { escapeValue: false },
    lng: "en",
  });

export const TranslationProvider = ({ children }) => (
  <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
);

TranslationProvider.propTypes = {
  children: PropTypes.any,
};

export default i18n;
