let currentLang;
let defaultLang;
let loadedTranslationData;
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

function setUpLanguages(defaultLanguage, selectLang, availableLanguagesList, languageFolderPath) {
    currentLang = selectLang;
    defaultLang = defaultLanguage;
    availableLanguages = availableLanguagesList;
    if (languageFolderPath != null) {
        if (!languageFolderPath.endsWith("/"))
            languageFolderPath += "/";
        langFolderPath = languageFolderPath;
    } else
        langFolderPath = "/lang/";
}

function reloadLanguage() {
    document.querySelectorAll('*').forEach(function (node) {
        let translate = node.getAttribute("data-translate");
        let translateTitle = node.getAttribute("data-translate-title");
        let translatePlaceholder = node.getAttribute("data-translate-placeholder");
        let languageList = node.getAttribute("data-languages-list");

        let languagePath = loadedTranslationData[currentLang];
        let fallbackPath = loadedTranslationData[defaultLang];

        if (translate) node.innerHTML = languagePath[translate] ? languagePath[translate] :
            fallbackPath[translate] ? fallbackPath[translate] : translate;
        if (translateTitle) node.title = languagePath[translateTitle] ? languagePath[translateTitle] :
            fallbackPath[translateTitle] ? fallbackPath[translateTitle] : translateTitle;
        if (translatePlaceholder) node.placeholder = languagePath[translatePlaceholder] ? languagePath[translatePlaceholder] :
            fallbackPath[translatePlaceholder] ? fallbackPath[translatePlaceholder] : translatePlaceholder;
        if (languageList) {
            node.innerHTML = "";
            for (let langCode in availableLanguages) {
                if (availableLanguages.hasOwnProperty(langCode)) {
                    const dispName = availableLanguages[langCode];
                    const replace = languageList.replace(/%langCode%/g, langCode).replace(/%langDispName%/g, dispName)
                        .replace(/%langCodeQ%/g, '"' + langCode + '"').replace(/%langDispName%/g, '"' + dispName + '"');
                    node.innerHTML += replace;
                }
            }
        }
    });
}

function loadLanguage(prefix, suffix) {
    loadedTranslationData = {};
    let counter = 0,
        target = Object.keys(availableLanguages).length;
    for (const langCode in availableLanguages) {
        if (availableLanguages.hasOwnProperty(langCode)) {
            $.getJSON(langFolderPath + (prefix || "") + langCode + (suffix || "") + ".json", function (data) {
                loadedTranslationData[langCode] = data;
                counter++;
                if (counter >= target)
                    reloadLanguage();
            });
        }
    }
}

function isLangCodeValid(langCode) {
    const langCodes = Object.keys(availableLanguages);
    for (let c = 0; c < langCodes.length; c++)
        if (langCodes[c] === langCode) return true;
    return false;
}

function getTranslation(key) {
    return loadedTranslationData[currentLang][key] ||
        loadedTranslationData[defaultLang][key] || loadedTranslationData[defaultLang][key] ||
        key;
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