import {
  defaultSuggestion,
  handleInputChanged,
  handleInputEntered,
  SEARCH_API_URL,
  SEARCH_DEFAULT_URL
} from "../src/omnibox";

describe("omnibox", () => {
  it("should return a default suggestion", () => {
    expect(defaultSuggestion).toMatchObject({
      description: expect.any(String)
    });
  });

  describe("handleInputChanged", () => {
    it("should return results from the query", done => {
      fetch.mockResponse(
        JSON.stringify({
          objects: [
            {
              package: {
                name: "one",
                links: {
                  npm: "https://one"
                }
              }
            }
          ]
        })
      );
      const query = "query";
      const callback = function(results) {
        expect(results).toHaveLength(1);
        expect(results[0]).toMatchObject({
          description: "one",
          content: "https://one"
        });
        done();
      };
      handleInputChanged(query, callback);
      expect(fetch).toHaveBeenCalled();
    });
  });

  describe("handleInputEntered", () => {
    it("should open in the current tab", () => {
      const query = "query";
      expect(handleInputEntered(query, "currentTab")).toBe(
        `${SEARCH_DEFAULT_URL}${query}`
      );
      expect(chrome.tabs.update).toHaveBeenCalled();
    });

    it("should open in the current tab", () => {
      expect(handleInputEntered(SEARCH_API_URL, "currentTab")).toBe(
        SEARCH_API_URL
      );
      expect(chrome.tabs.update).toHaveBeenCalled();
    });

    it("should open in a new foreground tab", () => {
      expect(handleInputEntered(SEARCH_API_URL, "newForegroundTab")).toEqual({
        url: SEARCH_API_URL
      });
      expect(chrome.tabs.create).toHaveBeenCalled();
    });

    it("should open in a new foreground tab", () => {
      expect(handleInputEntered(SEARCH_API_URL, "newBackgroundTab")).toEqual({
        url: SEARCH_API_URL,
        active: false
      });
      expect(chrome.tabs.create).toHaveBeenCalled();
    });
  });
});
