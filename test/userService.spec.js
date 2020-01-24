const assert = require('chai').assert
const {
    userService
} = require('../src/services');

describe('userService', () => {
    const username = "TestUser";
    const password = '123';

    before(() => {
        return new Promise(async (resolve) => {
            await userService.deleteUserByUsername(username);
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