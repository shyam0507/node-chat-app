var expect = require('expect');

var {
    Users
} = require('./users');

describe('Manage users', () => {

    var users;

    beforeEach(() => {
        users = new Users();

        users.users = [{
            id: 1,
            name: 'Shyam',
            room: 'ML Course'
        }, {
            id: 2,
            name: 'Koyal',
            room: 'ML Course'
        }, {
            id: 3,
            name: 'Shashank',
            room: 'Networking'
        }];

    });

    it('should add new user', () => {
        var users = new Users();

        var user = {
            id: '123',
            name: 'shyam',
            room: 'java room'
        };

        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);


    });

    it('should find a user', () => {

        var user = users.getUser(3);

        expect(user).toMatchObject({
            id: 3,
            name: 'Shashank',
            room: 'Networking'
        });

    });

    it('should not find a user', () => {

        var user = users.getUser(4);

        expect(user).toBeFalsy();

    });

    it('should remove a user', () => {

        var userList = users.removeUser(3);

        expect(userList).not.toMatchObject({
            id: 3,
            name: 'Shashank',
            room: 'Networking'
        });
        expect(userList.length).toBe(2);

    });

    it('should not remove a user', () => {

        var userList = users.removeUser(4);

        expect(userList.length).toBe(3);

    });

    it('should retun name for Networking Course', () => {

        var userList = users.getUserList('Networking');

        expect(userList).toEqual(['Shashank']);

    });


});