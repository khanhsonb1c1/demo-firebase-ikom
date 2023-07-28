interface Language {
  id: string;
  name: string;
}

export function getActiveLocale() {
  const locale = getRememberLocale() ?? getBrowserLocale();
  const included = locales.some((item: Language) => item.id === locale);
  return included ? locale : "en";
}

export const locales = [
  { id: "en", name: "English" },
  { id: "ja", name: "Japanese" },
  { id: "vi", name: "Vietnamese" },
] as Array<Language>;

function getRememberLocale() {
  return localStorage.getItem("locale");
}

export function setRememberLocale(locale: string) {
  localStorage.setItem("locale", locale);
}

function getBrowserLocale() {
  const navigatorLocale = navigator.languages !== undefined ? navigator.languages[0] : navigator.language;

  if (!navigatorLocale) {
    return undefined;
  }

  return navigatorLocale.trim().split(/-|_/)[0];
}
