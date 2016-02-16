import index from '../../src/index.js';

describe('entry', () => {
  it('should return Entry', function () {
    expect(index()).toEqual("test");
  });
});
