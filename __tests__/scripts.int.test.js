jest.unmock('fs');
jest.unmock('mjml');
jest.unmock('path');

const request = require('request');

describe('Mailgun MJML integration', () => {
  it('should walk the fixture directory', (done) => {
    // eslint-disable-next-line
    require('../scripts');
    request.get.mockImplementation((fn) => {
      console.log(fn);
      //  fn(null, null);
    });

    setTimeout(() => {
      expect(request.get).toHaveBeenCalled();
      //   expect(request.post).toHaveBeenCalled();
      done();
    });
  });
});
