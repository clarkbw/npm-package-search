import {
  defaultSuggestion,
  handleInputChanged,
  handleInputEntered,
  SEARCH_API_URL,
  SEARCH_DEFAULT_URL
} from '../src/omnibox';

describe('omnibox', () => {
  it('should return a default suggestion', () => {
    expect(defaultSuggestion).toMatchObject({
      description: expect.any(String)
    });
  });

  describe('handleInputChanged', () => {
    it('should return results from the query', done => {
      fetch.mockResponse(
        JSON.stringify({
          objects: [
            {
              package: {
                name: 'one',
                links: {
                  npm: 'https://one'
                }
              }
            }
          ]
        })
      );

      const callback = function(results) {
        expect(results).toHaveLength(1);
        expect(results[0]).toMatchObject({
          description: 'one',
          content: 'https://one'
        });
        done();
      };
      handleInputChanged('query', callback);
      expect(fetch).toHaveBeenCalled();
    });
    it('should return limited results', done => {
      const objects = new Array(10).fill({
        package: {
          name: 'x',
          links: {
            npm: 'https://x'
          }
        }
      });

      fetch.mockResponse(
        JSON.stringify({
          objects: objects
        })
      );
      const callback = function(results) {
        expect(results).toHaveLength(5);
        done();
      };
      handleInputChanged('query', callback);
      expect(fetch).toHaveBeenCalled();
    });
  });

  describe('handleInputEntered', () => {
    it('should open in the current tab', () => {
      const query = 'query';
      handleInputEntered(query, 'currentTab');
      expect(chrome.tabs.update).toHaveBeenCalledWith({
        url: `${SEARCH_DEFAULT_URL}${query}`
      });
    });

    it('should open in the current tab', () => {
      handleInputEntered(SEARCH_API_URL, 'currentTab');
      expect(chrome.tabs.update).toHaveBeenCalledWith({ url: SEARCH_API_URL });
    });

    it('should open in a new foreground tab', () => {
      handleInputEntered(SEARCH_API_URL, 'newForegroundTab');
      expect(chrome.tabs.create).toHaveBeenCalledWith({
        url: SEARCH_API_URL
      });
    });

    it('should open in a new foreground tab', () => {
      handleInputEntered(SEARCH_API_URL, 'newBackgroundTab');
      expect(chrome.tabs.create).toHaveBeenCalledWith({
        url: SEARCH_API_URL,
        active: false
      });
    });
  });
});
