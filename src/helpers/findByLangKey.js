import {getLocale} from "../utils/i18next.js";

// export const findByLangKey = data => data.find(item=> item.langKey === getLocale());
export const findByLangKey = data => {
  return Array.isArray(data) ? data.find(item=> item.langKey === getLocale()) : [];
}
