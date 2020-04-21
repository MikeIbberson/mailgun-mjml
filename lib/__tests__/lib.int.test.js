jest.unmock('fs');
jest.unmock('path');
jest.unmock('mjml');

const path = require('path');
const fs = require('fs');
const lib = require('..');

let tmp;

beforeAll(() => {
  tmp = path.resolve(process.cwd(), './tmp');

  try {
    fs.unlinkSync(`${tmp}/sample.html`);
    fs.rmdirSync(tmp);
  } catch (e) {
    // noop
  }
});

describe('lib', () => {
  it('should create temporary directory', () => {
    lib('./__fixtures__');
    expect(fs.existsSync(tmp)).toBeTruthy();
  });

  it('should create temporary directory', () => {
    const run = lib('./__fixtures__');
    run('sample', {
      foo: 'TEMPLATE_VARIABLE',
    });

    expect(
      fs.existsSync(`${tmp}/sample.html`),
    ).toBeTruthy();

    expect(
      fs.readFileSync(`${tmp}/sample.html`, 'utf8'),
    ).toMatch('TEMPLATE_VARIABLE');
  });
});
