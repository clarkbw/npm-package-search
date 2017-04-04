import { chromeHighlightMatch, firefoxHighlightMatch } from '../src/highlight';

describe('highlight:chrome', () => {
  it('should return the text matched', () => {
    expect(chromeHighlightMatch('the test', 'the')).toEqual(
      '<match>the</match> test'
    );
  });
});

describe('highlight:firefox', () => {
  it('should return the same text as passed', () => {
    expect(firefoxHighlightMatch('the test', 'the')).toEqual('the test');
  });
});
