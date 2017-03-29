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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultSuggestion = exports.SEARCH_DEFAULT_URL = exports.SEARCH_API_URL = undefined;
exports.handleInputChanged = handleInputChanged;
exports.handleInputEntered = handleInputEntered;

var _highlight = __webpack_require__(2);

var _highlight2 = _interopRequireDefault(_highlight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BASE_URL = 'https://registry.npmjs.org';
var MAX_RESULTS = 5;
var SEARCH_API_URL = exports.SEARCH_API_URL = BASE_URL + '/-/v1/search/?size=' + MAX_RESULTS + '&text=';
var SEARCH_DEFAULT_URL = exports.SEARCH_DEFAULT_URL = 'https://www.npmjs.com/search?q=';

var defaultSuggestion = exports.defaultSuggestion = {
  description: 'Search NPM (e.g. "react" | "webpack")'
};

function handleInputChanged(text, addSuggestions) {
  var headers = new Headers({ Accept: 'application/json' });
  var init = { method: 'GET', headers: headers };
  var q = encodeURIComponent(text);
  var url = '' + SEARCH_API_URL + q;
  var request = new Request(url, init);
  var response = handleResponse.bind(undefined, text);

  fetch(request).then(response).then(addSuggestions);
}

function handleResponse(text, response) {
  return new Promise(function (resolve) {
    response.json().then(function (json) {
      var objects = json.objects.slice(0, MAX_RESULTS);

      return resolve(objects.map(function (pkg) {
        return {
          content: pkg.package.links.npm,
          description: (0, _highlight2.default)(pkg.package.name, text)
        };
      }));
    });
  });
}

function handleInputEntered(text, disposition) {
  var url = text.startsWith('https://') ? text : '' + SEARCH_DEFAULT_URL + text;

  switch (disposition) {
    case 'currentTab':
      return chrome.tabs.update({ url: url });
    case 'newForegroundTab':
      return chrome.tabs.create({ url: url });
    case 'newBackgroundTab':
      return chrome.tabs.create({ url: url, active: false });
  }
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _omnibox = __webpack_require__(0);

// Provide help text to the user.
chrome.omnibox.setDefaultSuggestion(_omnibox.defaultSuggestion);

// Update the suggestions whenever the input is changed.
chrome.omnibox.onInputChanged.addListener(_omnibox.handleInputChanged);

// Open the page based on how the user clicks on a suggestion.
chrome.omnibox.onInputEntered.addListener(_omnibox.handleInputEntered);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chromeHighlightMatch = chromeHighlightMatch;
exports.firefoxHighlightMatch = firefoxHighlightMatch;
var isChrome = typeof browser === 'undefined';

// Currently Firefox auto-highlights but Chrome requires this XML syntax
function chromeHighlightMatch() {
  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var match = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  return text.replace(match, '<match>' + match + '</match>');
}

function firefoxHighlightMatch(text) {
  return text;
}

var highlight = isChrome ? chromeHighlightMatch : firefoxHighlightMatch;

exports.default = highlight;

/***/ })
/******/ ]);