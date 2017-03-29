const BASE_URL = `https://registry.npmjs.org`;
const MAX_RESULTS = 5;
export const SEARCH_API_URL = `${BASE_URL}/-/v1/search/?size=${MAX_RESULTS}&text=`;
export const SEARCH_DEFAULT_URL = `https://www.npmjs.com/search?q=`;

import highlight from './highlight';

export const defaultSuggestion = {
  description: `Search NPM (e.g. "react" | "webpack")`
};

export function handleInputChanged(text, addSuggestions) {
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

      return resolve(
        objects.map(pkg => {
          return {
            content: pkg.package.links.npm,
            description: highlight(pkg.package.name, text)
          };
        })
      );
    });
  });
}

export function handleInputEntered(text, disposition) {
  const url = text.startsWith('https://')
    ? text
    : `${SEARCH_DEFAULT_URL}${text}`;

  switch (disposition) {
    case 'currentTab':
      return chrome.tabs.update({ url });
    case 'newForegroundTab':
      return chrome.tabs.create({ url });
    case 'newBackgroundTab':
      return chrome.tabs.create({ url, active: false });
  }
}
