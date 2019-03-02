const expect = require('expect');

const {generateMessage} = require('./message');

describe('generateMessage',() => {
    it('should generate correct message object',()=>{
        var from = 'name';
        var text = 'some text';

        var res = generateMessage(from,text);
        expect(res).toMatchObject({from, text});
        expect(res.from).toEqual(from);
        expect(res.text).toEqual(text);
        expect(typeof res.createdAt).toBe('number');
    });
});