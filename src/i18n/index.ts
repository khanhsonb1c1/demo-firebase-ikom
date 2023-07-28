import { createI18n } from "vue-i18n";
import en from "./locales/en.json";
import vi from "./locales/vi.json";
import ja from "./locales/ja.json";
import { getActiveLocale } from "./translation";

export default createI18n({
  locale: getActiveLocale(),
  legacy: false,
  messages: {
    en,
    vi,
    ja,
  },
});
