const expect = require('expect');

const {Users} = require('./users');

describe('Users',() => {
    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id : '1',
            name : 'raju',
            room : 'room1'
        },{
            id : '2',
            name : 'ravi',
            room : 'room2'
        },{
            id : '3',
            name : 'mohan',
            room : 'room1'
        }];
    });


    it('should add new user',()=>{
        var users = new Users();
        var user = {
            id :'123',
            name : 'raju',
            room : 'some room'
        };
        var resUser = users.addUser(user.id,user.name,user.room);
        
        expect(users.users).toMatchObject([user]);
    });

    it('should remove user', () => {
        var userId = '1';
        var resUser = users.removeUser(userId);
        expect(resUser.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('should remove user', () => {
        var userId = '10';
        var resUser = users.removeUser(userId);
        expect(resUser).toBe(undefined);
        expect(users.users.length).toBe(3);
    });
    
    it('should find user', () => {
        var userId = '2';
        var resUser = users.getUser(userId);
        expect(resUser.id).toBe(userId);
        expect(resUser).toMatchObject(users.users[1]);
    });

    it('should not find user', () => {
        var userId = '10';
        var resUser = users.getUser(userId);
        expect(resUser).toBe(undefined);
    });

    it('should return names for room1', () => {
        var userList = users.getUserList('room1');
        expect(userList).toMatchObject(['raju','mohan']);
    });

    it('should return names for room2', () => {
        var userList = users.getUserList('room2');
        expect(userList).toMatchObject(['ravi']);
    });
});