// LoginTest.js to test login and logout 
// with Good and Bad login information.
const assert = require('chai').assert;
const fetch = require('node-fetch');
const getCookies = require('./getCookies');

const urlBase = "http://127.0.0.1:3039/";

describe('Login Tests', function () {
    let res;
    let myCookie = null;

    let goodLog = {
        email: "umbrate1989@yahoo.com",
        password: "n3pLS4|="
    };

    let badELog = {
        email: "umbate1989@yahoo.com",
        password: "n3pLS4|="
    };

    let badPLog = {
        email: "chihuahua1899@gmail.com",
        password: "Afarin"
    };

    it('Cookie with appropriate name is returned', async function () {
        res = await fetch(urlBase + 'info');
        myCookie = getCookies(res);
        assert.include(myCookie, 'gt6879Hello');
    });
    describe('Login Sequence', function () {
        it('Login Good', async function () {
            res = await fetch(urlBase + 'login', {
                method: "post",
                body: JSON.stringify(goodLog),
                headers: {
                    "Content-Type": "application/json",
                    cookie: myCookie
                },
            });
            assert.equal(res.status, 200);
        });
        it('User returned', async function () {
            res = await fetch(urlBase + 'login', {
                method: "post",
                body: JSON.stringify(goodLog),
                headers: {
                    "Content-Type": "application/json",
                    cookie: myCookie
                },
            });
            let member = await res.json();
            assert.containsAllKeys(member, ['firstName', 'lastName', 'email', 'role']);
        });
        it('Cookie session ID changed', async function () {
            res = await fetch(urlBase + 'login', {
                method: "post",
                body: JSON.stringify(goodLog),
                headers: {
                    "Content-Type": "application/json",
                    cookie: myCookie
                },
            });
            let cookie = getCookies(res);
            assert.notEmpty(cookie);
            assert.notEqual(cookie, myCookie);
        });
        it('Logout, cookie cleared', async function () {
            res = await fetch(urlBase + 'logout');
            myCookie = getCookies(res);
            assert.equal(myCookie, 'gt6879Hello=');
        });
    });
    describe('Bad Logins', function () {
         it('Bad Email', async function () {
            res = await fetch(urlBase + 'login', {
                method: "post",
                body: JSON.stringify(badELog),
                headers: {
                    "Content-Type": "application/json",
                    cookie: myCookie
                },
            });
            assert.equal(res.status, 401);
        }); 
        it('Bad Password', async function () {
            res = await fetch(urlBase + 'login', {
                method: "post",
                body: JSON.stringify(badPLog),
                headers: {
                    "Content-Type": "application/json",
                    cookie: myCookie
                },
            });
            assert.equal(res.status, 401);
        });
    })
})
