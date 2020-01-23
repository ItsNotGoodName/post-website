const assert = require('chai').assert
const {
    userService
} = require('../src/services');
const username = "TestUser";
const password = '123';

describe('user-service', () => {
    it('Delete user if exists', () => {
        return new Promise(async (resolve) => {
            const user = await userService.findUser(username);
            if (user !== null) {
                assert.equal(user.username, username)
                const delUser = await userService.deleteUserByUsername(username);
                assert.equal(delUser.username, username);
            }
            resolve();
        });
    });

    it('Register User', () => {
        return new Promise(async (resolve) => {
            const newUser = await userService.addUser(username, password);
            assert.equal(newUser.username, username);
            resolve();
        });
    });

    it('Find User', () => {
        return new Promise(async (resolve) => {
            const user = await userService.findUser(username)
            assert.equal(user.username, username);
            resolve();
        });
    })

    it('Delete User', () => {
        return new Promise(async (resolve) => {
            const delUser = await userService.deleteUserByUsername(username)
            assert.equal(delUser.username, username);
            resolve();
        });
    })
})