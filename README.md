# JavaScript Translator

Translating your HTML pages as easy as never!

[![Build Status](https://img.shields.io/github/forks/ArnyminerZ/JavaScript-Translator.svg?style=flat-square)](https://github.com/ArnyminerZ/JavaScript-Translator)
[![Build Status](https://img.shields.io/github/stars/ArnyminerZ/JavaScript-Translator.svg?style=flat-square)](https://github.com/ArnyminerZ/JavaScript-Translator)
[![License](https://img.shields.io/github/license/ArnyminerZ/JavaScript-Translator.svg?style=flat-square)](https://github.com/ArnyminerZ/JavaScript-Translator)

# Requires
For this project to work you must have *ECMAScript 6* Support

# Usage
## Import
You can download the project, or use our CDN.
### Download
You can download our build files.

![translate.min.js](https://img.shields.io/static/v1.svg?label=1.0.1&message=translate.min.js&color=success&url=https://cdn.jsdelivr.net/gh/ArnyminerZ/JavaScript-Translator@1.0.1/dist/js/translate.min.js&style=flat-square)
![translate.js](https://img.shields.io/static/v1.svg?label=1.0.1&message=translate.js&color=success&url=https://cdn.jsdelivr.net/gh/ArnyminerZ/JavaScript-Translator@1.0.1/dist/js/translate.min.js&style=flat-square)
### CDN
We have our project hosted in jDelivr, import it to your HTML page with:
```HTML
<script src="https://cdn.jsdelivr.net/gh/ArnyminerZ/JavaScript-Translator@1.0.1/dist/js/translate.min.js"></script>
```
## Setup
Once you have imported the Javascript file, you can start using it. The first thing you have to do is prepare your languages, to do this, you have to call the `setUpLanguages` function:
```javascript
setUpLanguages('en', 'ca', {
    "en": "English",
    "ca": "Català",
    "es": "Español"
}, "/lang/");
```
This will set English as the default language, it will select Català to be used right now, but it will also add support for Español.

The language prefix will be the name for the JSON file to be used, in this example, all the English translations will be in the `/lang/en.json` file, the Català ones in `/lang/ca.json` and the Español ones in `/lang/es.json`.
## Using
Now that you have loaded up your preferences, you have to start creating some translations to use them, we are going to show you an example for this.

Here's our `/lang/en.json` file:
```json
{
  "title": "Our Great Webpage",
  "home": "Home",
  "shop": "Shop",
  "buy": "Buy",
  "a-very-long-text": "This is an awesomely long text !!!!! :)",
  "user-name": "Username"
}
```
You can put any text in JSON format.

We are then going to add also `/lang/ca.json` file:
```json
{
  "title": "La Nostra Gran Pàgina",
  "home": "Inici",
  "shop": "Tenda",
  "buy": "Comprar",
  "a-very-long-text": "Un text increïblement llarg !!!!! :)",
  "user-name": "Nom d'Usuari"
}
```
and `/lang/es.json`:
```json
{
  "title": "Nuestra Gran Página",
  "home": "Inicio",
  "shop": "Tienda",
  "buy": "Comprar",
  "a-very-long-text": "Un texto increíblemente largo !!!!! :)",
  "user-name": "Nombre de Usuario"
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
And an input, with a placeholder:
```html
<input type="text" id="username" data-translate-placeholder="user-name" />
```
Once you have all of your HTML code ready, you have to tell the program to set the elements text. You can do this with:
```javascript
loadLanguage();
```
This is all. One thing you can do, if you update any content of the page, or you change the language, you can call `reloadLanguage()`, and all the nodes with any translate content will reload.

To change the language dynamically you can:
```javascript
currentLang = "ca";
reloadLanguage();
```
