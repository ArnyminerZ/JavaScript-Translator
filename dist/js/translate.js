let currentLang = '';
let defaultLang = 'en';
let loadedTranslationData;
let availableLanguages = {
    "en": "English",
    "ca": "Català",
    "es": "Español"
};

function setUp(defaultLanguage, selectLang, availableLanguagesList) {
    currentLang = selectLang;
    defaultLang = defaultLanguage;
    availableLanguages = availableLanguagesList;
}

function loadLanguage(prefix, suffix) {
    $.getJSON("/lang/" + (prefix ? prefix : "") + defaultLang + (suffix ? suffix : "") + ".json", function (defaultLangData) {
        $.getJSON("/lang/" + (prefix ? prefix : "") + currentLang + (suffix ? suffix : "") + ".json", function (data) {
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

            const profileLangNavItemEng = document.getElementById("profileLangNavItemEng"),
                profileLangNavItemCat = document.getElementById("profileLangNavItemCat");

            if(profileLangNavItemEng && currentLang === 'en') profileLangNavItemEng.classList.add("active");
            else if(profileLangNavItemEng) profileLangNavItemEng.classList.remove("active");

            if(profileLangNavItemCat && currentLang === 'ca') profileLangNavItemCat.classList.add("active");
            else if(profileLangNavItemCat) profileLangNavItemCat.classList.remove("active");
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