/**
 * The main script file for translate.js, a library for making translation
 * with JS in the web as easy as never. Written in plain-js.
 * 
 * @repository https://github.com/ArnyminerZ/JavaScript-Translator
 * @file translate.js
 * @version 1.5.0
 * @author ArnyminerZ
 */

/**
 * Stores the currently selected language.
 * @author Arnau Mora
 * @since 1.0.0
 */
let currentLang;

/**
 * Stores the fallback language, for fetching strings that are not available in the currently selected one.
 * @since 1.0.0
 * @type {string}
 */
let defaultLang;

/**
 * Caches the translation data loaded for all the languages. Keys are the language codes, and each of them contain all the localized Strings.
 * @since 1.0.0
 * @type {Object.<string, Object.<string,string>>}
 */
let loadedTranslationData;

/**
 * A list of all the languages available. Keys match the language code, and their values the respective display names
 * @since 1.0.0
 * @type {Object.<string, string>}
 */
let availableLanguages;

/**
 * Stores the directory where all the language files are stored at.
 * @author Arnau Mora
 * @type {string}
 */
let langFolderPath;

/**
 * Checks for the navigator's actual language, and selects it if it's available.
 * @author Arnau Mora
 * @since 1.4.0
 * @returns {boolean} `true` if the language is available, and after updating the page. `false` otherwise.
 */
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

/**
 * Configures the installation. Sets up a fallback language, selects one, and updates the list of available languages.
 * @author Arnau Mora
 * @since 1.0.0
 * @param {string} defaultLanguage The fallback language. The JSON file for this language must contain all the strings, otherwise errors will occur.
 * @param {string} selectLang The initial language to select.
 * @param {Object.<string,string>} availableLanguagesList A list of all the available languages. The keys are the language codes (use ISO), and the values their respective display names.
 * @param {string} languageFolderPath The path where all the language files are stored.
 */
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

/**
 * Updates the page with the currently selected language's values.
 * @author Arnau Mora
 * @since 20221213
 * @see setUpLanguages
 * @see changeLanguage
 */
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
 * Loads the currently selected language. Updates the UI automatically.
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

/**
 * Checks if a given translation code is available in the stored languages.
 * @author Arnau Mora
 * @since 1.0.0
 * @param {string} langCode The language code.
 * @returns {boolean} `true` if the given `langCode` is available, `false` otherwise.
 */
function isLangCodeValid(langCode) {
  const langCodes = Object.keys(availableLanguages);
  for (let c = 0; c < langCodes.length; c++)
    if (langCodes[c] === langCode) return true;
  return false;
}

/**
 * Fetches the translation of a given key.
 * @author Arnau Mora
 * @since 1.0.0
 * @param {string} key The key to fetch.
 * @returns {?string} The localized string.
 */
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

/**
 * Changes the currently selected language. Reloads the UI automatically.
 * @author Arnau Mora
 * @since 1.0.0
 * @param {string} langCode The language code to set.
 */
function changeLanguage(langCode) {
  currentLang = langCode;
  reloadLanguage();
}
