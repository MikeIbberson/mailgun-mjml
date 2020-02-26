jest.mock('fs');
jest.mock('path');
jest.mock('../template-attributes');

const fs = require('fs');
const path = require('path');
const templateAttributes = require('../template-attributes');
const walker = require('../template-walker');

describe('Walker', () => {
  it('should call template for each result in readdirSync', () => {
    fs.readdirSync.mockReturnValue(['foo']);
    path.join.mockReturnValue({ data: 1 });
    walker('bar');
    expect(path.join).toHaveBeenCalledWith('bar', 'foo');
    expect(templateAttributes).toHaveBeenCalledWith('foo', {
      data: 1,
    });
  });
});
