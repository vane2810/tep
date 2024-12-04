const assert = require('assert');

describe('Array', function() {
  describe('#indexOf()', function() {
    it('debería retornar -1 cuando el valor no está presente', function() {
      assert.strictEqual([1, 2, 3].indexOf(4), -1);
    });
  });
});