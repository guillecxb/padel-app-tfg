import { format as dateFnsFormat, formatDistance, parse } from "date-fns";
import { enGB } from "date-fns/locale";

const locales = { en: enGB };

export const formatDateToUS = (time) =>
  time.toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true });

export const localeOptions = (language) => ({
  locale: locales[language] || locales["en"],
});

export const localeDate = (date, language, format = "dd/MMM/yyyy h:mm a") => {
  if (!date) return "-";
  const dateObj = new Date(date);

  // Calcular el desplazamiento
  const offsetMinutes = dateObj.getTimezoneOffset();

  // Convertir a hora local (sumar el offset)
  const localTime = new Date(dateObj.getTime() - offsetMinutes * 60 * 1000);

  return dateFnsFormat(localTime, format, localeOptions(language)).toUpperCase();
};

export const localeParse = (date, language, format = "dd/MMM/yyyy h:mm a") =>
  parse(date, format, new Date(), localeOptions(language));

export const timeAgo = (date, language) => {
  return formatDistance(date, new Date(), {
    ...localeOptions(language),
  });
};
