jest.unmock('fs');
jest.unmock('mjml');
jest.unmock('path');

const request = require('request');

describe('Mailgun MJML smoke test', () => {
  it('should walk the fixture directory', () => {
    // eslint-disable-next-line
    require('..');
    return expect(request.get).toHaveBeenCalled();
  });
});
