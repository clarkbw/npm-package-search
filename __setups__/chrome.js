// Chrome globals are setup in the "jest" property of the package.json
// This setup file sets the chrome global with mock functions
chrome.omnibox.setDefaultSuggestion = jest.fn();
chrome.omnibox.onInputChanged.addListener = jest.fn();
chrome.omnibox.onInputEntered.addListener = jest.fn();
chrome.tabs.update = jest.fn(({ url }) => url);
chrome.tabs.create = jest.fn(obj => obj);
