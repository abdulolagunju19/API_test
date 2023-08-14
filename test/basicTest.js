var assert = require('assert');

describe('BasicTest', function(){
    describe('Multiplication', function (){
        it('should equal 15 when 5 is multiplied by 3', function () {
            var result = 5 * 3;
            assert.equal(result, 15);
        });
    });
    describe('Divide', function() {
        it('15 divided by 5 should be 3.', function(){
            var result = 15 / 3;
            assert.equal(result, 3);
        });
        it('15 divided by 5 should not be 2.', function (){
            var value = 2;
            var result = 15 / 5;
            assert.notEqual(result, value);
        });
    });
});