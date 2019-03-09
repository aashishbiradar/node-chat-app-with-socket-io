const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString',() => {
    it('should allow strings with non space characters',()=>{
        var res = isRealString('Some string');
        expect(res).toBeTruthy();
    });
    it('should reject strings with spaces',()=>{
        var res = isRealString('    ');
        expect(res).toBeFalsy();
    });
    it('should reject non string values',()=>{
        var res = isRealString(5484848);
        expect(res).toBeFalsy();
    });
});