var expect = require('expect');

var {
    isRealString
} = require('./validation');

describe('isRealString', () => {

    it('should reject non string values', () => {

        var data = 123;
        var isString = isRealString(data);
        expect(isString).toBeFalsy();

    });

    it('should reject string with only spaces', () => {

        var data = "    ";
        var isString = isRealString(data);
        expect(isString).toBeFalsy();


    });

    it('should allow string with non-space characters', () => {

        var data = "java  ";
        var isString = isRealString(data);
        expect(isString).toBeTruthy();

    });


});