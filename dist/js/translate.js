let currentLang = '';
let defaultLang = 'en';
let loadedTranslationData;
let availableLanguages = {
    "en": "English",
    "ca": "Català",
    "es": "Español"
};
let langFolderPath = "/lang/";

function setUpLanguages(defaultLanguage, selectLang, availableLanguagesList, languageFolderPath) {
    currentLang = selectLang;
    defaultLang = defaultLanguage;
    availableLanguages = availableLanguagesList;
    if (languageFolderPath) {
        if (!languageFolderPath.endsWith("/"))
            languageFolderPath += "/";
        langFolderPath = languageFolderPath;
    } else
        langFolderPath = "/lang/";
}

function loadLanguage(prefix, suffix) {
    $.getJSON(langFolderPath + (prefix ? prefix : "") + defaultLang + (suffix ? suffix : "") + ".json", function (defaultLangData) {
        $.getJSON(langFolderPath + (prefix ? prefix : "") + currentLang + (suffix ? suffix : "") + ".json", function (data) {
            loadedTranslationData = data;

            document.querySelectorAll('*').forEach(function (node) {
                let translate = node.getAttribute("data-translate");
                let translateTitle = node.getAttribute("data-translate-title");
                let translatePlaceholder = node.getAttribute("data-translate-placeholder");

                if (translate) node.innerHTML = data[translate] ? data[translate] :
                    defaultLangData[translate] ? defaultLangData[translate] : translate;
                if (translateTitle) node.title = data[translateTitle] ? data[translateTitle] :
                    defaultLangData[translateTitle] ? defaultLangData[translateTitle] : translateTitle;
                if (translatePlaceholder) node.placeholder = data[translatePlaceholder] ? data[translatePlaceholder] :
                    defaultLangData[translatePlaceholder] ? defaultLangData[translatePlaceholder] : translatePlaceholder;
            });
        });
    });
}

function isLangCodeValid(langCode) {
    const langCodes = Object.keys(availableLanguages);
    for (let c = 0; c < langCodes.length; c++) {
        if (langCodes[c] === langCode) return true;
    }
    return false;
}

function getTranslation(key) {
    if (!loadedTranslationData || !key) return null;
    const data = loadedTranslationData[key];
    return data ? data : key;
}

function reloadLanguage() {
    document.querySelectorAll('*').forEach(function (node) {
        let translate = node.getAttribute("data-translate");
        let translateTitle = node.getAttribute("data-translate-title");
        let translatePlaceholder = node.getAttribute("data-translate-placeholder");

        if (translate) node.innerHTML = loadedTranslationData[translate];
        if (translateTitle) node.title = loadedTranslationData[translateTitle];
        if (translatePlaceholder) node.placeholder = loadedTranslationData[translatePlaceholder];
    });
}