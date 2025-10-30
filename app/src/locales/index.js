import { createI18n } from "vue-i18n";
import English from "./lang/English.js";
import Chinese from "./lang/Chinese.js";
const messages = {
  en: English.messages,
  zh: Chinese.messages,
}

const i18n = createI18n({
  locale: localStorage.getItem("language") || "zh",
  fallbackLocale: "zh", // 兜底语言
  messages,
});

export default i18n;
