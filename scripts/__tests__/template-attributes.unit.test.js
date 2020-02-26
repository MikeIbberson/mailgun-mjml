jest.mock('fs');
jest.mock('mjml');
jest.mock('path');

const path = require('path');
const fs = require('fs');
const mjml = require('mjml');
const build = require('../template-attributes');

let b;

beforeEach(() => {
  b = build('beep', 'boop');
});

describe('Build', () => {
  describe('"isMjml"', () => {
    it('should return truthy on matching file extension', () => {
      path.extname.mockReturnValue('.mjml');
      expect(b.isMjml).toBeTruthy();
    });

    it('should return falsy on non-matching file extension', () => {
      path.extname.mockReturnValue('.html');
      expect(b.isMjml).toBeFalsy();
    });
  });

  describe('"templateName"', () => {
    it('should return null if isMjml returns falsy', () => {
      jest.spyOn(b, 'isMjml', 'get').mockReturnValue(false);
      expect(b.templateName).toBeNull();
    });

    it('should return value if isMjml returns truthy', () => {
      const name = 'foo';
      path.basename.mockReturnValue(name);
      jest.spyOn(b, 'isMjml', 'get').mockReturnValue(true);
      expect(b.templateName).toMatch(name);
    });
  });

  describe('"html"', () => {
    it('should return null if templateName returns null', () => {
      jest
        .spyOn(b, 'templateName', 'get')
        .mockReturnValue(null);
      expect(b.html).toBeNull();
      expect(mjml).not.toHaveBeenCalled();
      expect(fs.readFileSync).not.toHaveBeenCalled();
    });

    it('should return value if templateName returns a string', () => {
      const div = '<div />';

      jest
        .spyOn(b, 'templateName', 'get')
        .mockReturnValue('foo');

      mjml.mockReturnValue({ html: div });
      expect(b.html).toMatch(div);
      expect(mjml).toHaveBeenCalled();
      expect(fs.readFileSync).toHaveBeenCalledWith(
        'boop',
        expect.any(String),
      );
    });
  });
});
