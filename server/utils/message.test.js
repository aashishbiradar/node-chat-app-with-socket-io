const expect = require('expect');

const {generateMessage,generateLocationMessage} = require('./message');

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
    it('should generate correct location message object',()=>{
        var from = 'name';
        var latitude = 35.413214;
        var longitude = 45.54545;
        var url = `https://www.google.co.in/maps?q=${latitude},${longitude}`;

        var res = generateLocationMessage(from,latitude,longitude);
        expect(res).toMatchObject({from, url});
        expect(res.from).toEqual(from);
        expect(res.url).toEqual(url);
        expect(typeof res.createdAt).toBe('number');
    });
});