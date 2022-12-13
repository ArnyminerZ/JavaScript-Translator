# JavaScript Translator

Translating your HTML pages as easy as never!

[![Build Status](https://img.shields.io/github/forks/ArnyminerZ/JavaScript-Translator.svg?style=flat-square)](https://github.com/ArnyminerZ/JavaScript-Translator)
[![Build Status](https://img.shields.io/github/stars/ArnyminerZ/JavaScript-Translator.svg?style=flat-square)](https://github.com/ArnyminerZ/JavaScript-Translator)
[![License](https://img.shields.io/github/license/ArnyminerZ/JavaScript-Translator.svg?style=flat-square)](https://github.com/ArnyminerZ/JavaScript-Translator)

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://paypal.me/ArnyminerZ)

# Requires
For this project to work you must have *ECMAScript 6* Support.

# Usage
## Import
You can download the project, or use our CDN.
### Download
You can download our build files.

![translate.min.js](https://img.shields.io/static/v1.svg?label=1.5.1&message=translate.min.js&color=success&url=https://cdn.jsdelivr.net/gh/ArnyminerZ/JavaScript-Translator@1.5.1/dist/js/translate.min.js&style=flat-square)
![translate.js](https://img.shields.io/static/v1.svg?label=1.5.1&message=translate.js&color=success&url=https://cdn.jsdelivr.net/gh/ArnyminerZ/JavaScript-Translator@1.5.1/dist/js/translate.min.js&style=flat-square)
### CDN
We have our project hosted in jDelivr, import it to your HTML page with:
```HTML
<script src="https://cdn.jsdelivr.net/gh/ArnyminerZ/JavaScript-Translator@1.5.1/dist/js/translate.min.js"></script>
```

## Setup
Once you have imported the Javascript file, you can start using it. The first thing you have to do is prepare your languages, to do this, you have to call the `setUpLanguages` function:

*Note: It's important to use the ISO language code if you want to use the `detectLanguage()` function.*
```javascript
setUpLanguages('en-US', 'ca-ES', {
    "en-US": "English",
    "ca-ES": "Català",
    "es-ES": "Español"
}, "/lang/");
```
This will set English as the default language, it will select Català to be used right now, but it will also add support for Español.

The language prefix will be the name for the JSON file to be used, in this example, all the English translations will be in the `/lang/en-US.json` file, the Català ones in `/lang/ca-ES.json` and the Español ones in `/lang/es-ES.json`.
## Using
Now that you have loaded up your preferences, you have to start creating some translations to use them, we are going to show you an example for this.

Here's our `/lang/en-US.json` file:
```json
{
  "title": "Our Great Webpage",
  "home": "Home",
  "shop": "Shop",
  "buy": "Buy",
  "a-very-long-text": "This is an awesomely long text !!!!! :)",
  "user-name": "Username",
  "example-custom-tag": "Custom type tag",
  "example-custom-tag-2": "Another custom type tag"
}
```
You can put any text in JSON format.

We are then going to add also `/lang/ca-ES.json` file:
```json
{
  "title": "La Nostra Gran Pàgina",
  "home": "Inici",
  "shop": "Tenda",
  "buy": "Comprar",
  "a-very-long-text": "Un text increïblement llarg !!!!! :)",
  "user-name": "Nom d'Usuari",
  "example-custom-tag": "Etiqueta de tipus personalitzat",
  "example-custom-tag-2": "Una altra etiqueta de tipus personalizat."
}
```
and `/lang/es-ES.json`:
```json
{
  "title": "Nuestra Gran Página",
  "home": "Inicio",
  "shop": "Tienda",
  "buy": "Comprar",
  "a-very-long-text": "Un texto increíblemente largo !!!!! :)",
  "user-name": "Nombre de Usuario",
  "example-custom-tag": "Etiqueta de tipo personalizado",
  "example-custom-tag-2": "Otra etiqueta de tipo personalizado"
}
```
Once that we that ready, we can start loading up our page, for example, we are now going to translate our `title`, you just have to set the attribute `data-translate`, and the code will do it all for you:
```html
<title data-translate="title"></title>
```
We are also going to add some links:
```html
<a href="/home" data-translate="home"></a>
<a href="/shop" data-translate="shop"></a>
```
A button, with title included:
```html
<button onclick="buy()" data-translate="buy" data-translate-title="a-very-long-text"></button>
```
An input, with a placeholder:
```html
<input type="text" id="username" data-translate-placeholder="user-name" />
```
A list for selecting the desired language:
```html
<h3>Available Languages:</h3>
<div id="languagesList" data-languages-list="<a href='#' onclick='changeLanguage(%langCodeQ%);return false;'>%langCode%: %langDispName%</a><br/>"></div>
```
And even custom tags translation: ![Minimum required version: 1.4.0](https://img.shields.io/badge/min%20ver-1.4.0-brightgreen)
```html
<h3 data-languages-custom="data-content:example-custom-tag;data-content-2:example-custom-tag-2">This has a custom data tag updated</h3>
```
This will take all the text from `data-languages-list` and will iterate all the languages, adding over and over again that text, replacing some keywords:

- `%langCode%`: The language code. *Example: 'es-ES'*
- `%langDispName%`: The language code display name. *Example: 'Español'*
- `%langCodeQ%`: The language code quoted with ". *Example: '"es-ES"'*
- `%langDispNameQ%`: The language code display name quoted with ". *Example: '"Español"'*

This is all. One thing you can do, if you update any content of the page, or you change the language, you can call `reloadLanguage()`, and all the nodes with any translate content will reload.

### Change Language
To change the language dynamically you can:
```javascript
changeLanguage("es-ES");
```

### Get translation
For getting a translation string from a key just use:
```javascript
getTranslation("key");
```

### Set element text
We have developed an utility for setting an element's text from a translation, you can even replace text!

To do so, we have this sample `en-US.json` file:
```json
{
"concat-key": "The user %user% has been blocked by %buser%"
}
```
And then with JavaScript:
```javascript
const elem = document.getElementById("element");
setElementText(elem, "concat-key", { 
    "%user%": "Michael",
    "%buser%": "John"
});
```
And with this, we will get the from the following HTML:
```html
<h2 id="element"></h2>
```
this:
```
The user Michael has been blocked by John
```

# Migrations
## `1.5.1`
* jQuery is no longer required.
## `1.5.1`
* `setUpLanguages` now refreshes the page automatically. This can be disabled with the `loadAutomatically` parameter.
