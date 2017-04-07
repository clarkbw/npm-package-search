/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__highlight__ = __webpack_require__(2);
/* harmony export (immutable) */ __webpack_exports__["b"] = handleInputChanged;
/* harmony export (immutable) */ __webpack_exports__["c"] = handleInputEntered;
const BASE_URL = `https://registry.npmjs.org`;
const MAX_RESULTS = 5;
const SEARCH_API_URL = `${BASE_URL}/-/v1/search/?size=${MAX_RESULTS}&text=`;
/* unused harmony export SEARCH_API_URL */

const SEARCH_DEFAULT_URL = `https://www.npmjs.com/search?q=`;
/* unused harmony export SEARCH_DEFAULT_URL */




const defaultSuggestion = {
  description: `Search NPM (e.g. "react" | "webpack")`
};
/* harmony export (immutable) */ __webpack_exports__["a"] = defaultSuggestion;


function handleInputChanged(text, addSuggestions) {
  const headers = new Headers({ Accept: 'application/json' });
  const init = { method: 'GET', headers };
  const q = encodeURIComponent(text);
  const url = `${SEARCH_API_URL}${q}`;
  const request = new Request(url, init);
  const response = handleResponse.bind(undefined, text);

  fetch(request).then(response).then(addSuggestions);
}

function handleResponse(text, response) {
  return new Promise(resolve => {
    response.json().then(json => {
      const objects = json.objects.slice(0, MAX_RESULTS);

      return resolve(objects.map(pkg => {
        return {
          content: pkg.package.links.npm,
          description: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__highlight__["a" /* default */])(pkg.package.name, text)
        };
      }));
    });
  });
}

function handleInputEntered(text, disposition) {
  const url = text.startsWith('https://') ? text : `${SEARCH_DEFAULT_URL}${text}`;

  switch (disposition) {
    case 'currentTab':
      return chrome.tabs.update({ url });
    case 'newForegroundTab':
      return chrome.tabs.create({ url });
    case 'newBackgroundTab':
      return chrome.tabs.create({ url, active: false });
  }
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__omnibox__ = __webpack_require__(0);


// Provide help text to the user.
chrome.omnibox.setDefaultSuggestion(__WEBPACK_IMPORTED_MODULE_0__omnibox__["a" /* defaultSuggestion */]);

// Update the suggestions whenever the input is changed.
chrome.omnibox.onInputChanged.addListener(__WEBPACK_IMPORTED_MODULE_0__omnibox__["b" /* handleInputChanged */]);

// Open the page based on how the user clicks on a suggestion.
chrome.omnibox.onInputEntered.addListener(__WEBPACK_IMPORTED_MODULE_0__omnibox__["c" /* handleInputEntered */]);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export chromeHighlightMatch */
/* unused harmony export firefoxHighlightMatch */
const isChrome = typeof browser === 'undefined';

// Currently Firefox auto-highlights but Chrome requires this XML syntax
function chromeHighlightMatch() {
  let text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  let match = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  return text.replace(match, `<match>${match}</match>`);
}

function firefoxHighlightMatch(text) {
  return text;
}

const highlight = isChrome ? chromeHighlightMatch : firefoxHighlightMatch;

/* harmony default export */ __webpack_exports__["a"] = (highlight);

/***/ })
/******/ ]);