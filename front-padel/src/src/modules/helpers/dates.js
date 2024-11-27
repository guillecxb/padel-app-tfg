import { format as dateFnsFormat } from "date-fns";
import { enGB } from "date-fns/locale";

const locales = { en: enGB };

export const localeOptions = (language) => ({
  locale: locales[language] || locales["en"],
});

export const localeDate = (date, language, format = "dd/MMM/yyyy h:mm a") => {
  if (!date) return "-";
  const dateObj = new Date(date);

  return dateFnsFormat(dateObj, format, localeOptions(language)).toUpperCase();
};
