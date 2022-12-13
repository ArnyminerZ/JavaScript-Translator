/**
 * The main script file for translate.js, a library for making translation
 * with JS in the web as easy as never. Written in plain-js.
 * 
 * @repository https://github.com/ArnyminerZ/JavaScript-Translator
 * @file translate.js
 * @version 1.5.0
 * @author ArnyminerZ
 */

let currentLang;
let defaultLang;
let loadedTranslationData;
/**
 * A list of all the languages available. Keys match the language code, and their values the respective display names
 * @since 20221213
 * @type {Object.<string, string>}
 */
let availableLanguages;
let langFolderPath;

function detectLanguage() {
  if (navigator && navigator.languages) {
    for (const i in navigator.languages) {
      const lang = navigator.languages[i];
      if (availableLanguages[lang]) {
        currentLang = lang;
        reloadLanguage();
        return true;
      }
    }
  }
  return false;
}

function setUpLanguages(
  defaultLanguage,
  selectLang,
  availableLanguagesList,
  languageFolderPath
) {
  currentLang = selectLang;
  defaultLang = defaultLanguage;
  availableLanguages = availableLanguagesList;
  if (languageFolderPath != null) {
    if (!languageFolderPath.endsWith("/")) languageFolderPath += "/";
    langFolderPath = languageFolderPath;
  } else langFolderPath = "/lang/";
}

function reloadLanguage() {
  document.querySelectorAll("*").forEach(function (node) {
    let translate = node.getAttribute("data-translate");
    let translateTitle = node.getAttribute("data-translate-title");
    let translatePlaceholder = node.getAttribute("data-translate-placeholder");
    let languageList = node.getAttribute("data-languages-list");
    let custom = node.getAttribute("data-languages-custom");

    let languagePath = loadedTranslationData[currentLang];
    let fallbackPath = loadedTranslationData[defaultLang];

    if (translate)
      node.innerHTML = languagePath[translate]
        ? languagePath[translate]
        : fallbackPath[translate]
        ? fallbackPath[translate]
        : translate;
    if (translateTitle)
      node.title = languagePath[translateTitle]
        ? languagePath[translateTitle]
        : fallbackPath[translateTitle]
        ? fallbackPath[translateTitle]
        : translateTitle;
    if (translatePlaceholder)
      node.placeholder = languagePath[translatePlaceholder]
        ? languagePath[translatePlaceholder]
        : fallbackPath[translatePlaceholder]
        ? fallbackPath[translatePlaceholder]
        : translatePlaceholder;
    if (languageList) {
      node.innerHTML = "";
      for (let langCode in availableLanguages) {
        if (availableLanguages.hasOwnProperty(langCode)) {
          const dispName = availableLanguages[langCode];
          const replace = languageList
            .replace(/%langCode%/g, langCode)
            .replace(/%langDispName%/g, dispName)
            .replace(/%langCodeQ%/g, '"' + langCode + '"')
            .replace(/%langDispName%/g, '"' + dispName + '"');
          node.innerHTML += replace;
        }
      }
    }
    if (custom) {
      const pairs = custom.split(";");
      for (const p in pairs)
        if (pairs.hasOwnProperty(p)) {
          const pair = pairs[p].split(":");
          const attr = pair[0];
          const valueKey = pair[1];
          const value = languagePath[valueKey]
            ? languagePath[valueKey]
            : fallbackPath[valueKey]
            ? fallbackPath[valueKey]
            : valueKey;
          node.setAttribute(attr, value);
        }
    }
  });
}

/**
 * Loads the currently selected language.
 * @since 20221213
 * @param {string} prefix A prefix to add to the language file name.
 * @param {string} suffix A suffix to add to the language file name.
 * @returns {Promise<void>}
 */
function loadLanguage(prefix = '', suffix = '') {
  return new Promise((resolve, reject) => {
    // Clear any loaded data
    loadedTranslationData = {};
    // Start iterating all the available languages.
    const languageKeys = Object.keys(availableLanguages);
    for (const langCode of languageKeys) {
      const xml = new XMLHttpRequest();
      xml.onerror = reject;
      xml.open('GET', langFolderPath + prefix + langCode + suffix + ".json", false);
      xml.send();

      const message = xml.responseText;
      const data = JSON.parse(message);
      loadedTranslationData[langCode] = data;
    }
    reloadLanguage();
    resolve();
  });
}

function isLangCodeValid(langCode) {
  const langCodes = Object.keys(availableLanguages);
  for (let c = 0; c < langCodes.length; c++)
    if (langCodes[c] === langCode) return true;
  return false;
}

function getTranslation(key) {
  return (
    loadedTranslationData[currentLang][key] ||
    loadedTranslationData[defaultLang][key] ||
    loadedTranslationData[defaultLang][key] ||
    key
  );
}

function setElementText(element, key, replace) {
  let text = getTranslation(key);
  const keys = Object.keys(replace);
  for (let c = 0; c < keys.length; c++) {
    text = text.replace(new RegExp(keys[c], "g"), replace[c]);
  }
  return text;
}

function changeLanguage(langCode) {
  currentLang = langCode;
  reloadLanguage();
}
