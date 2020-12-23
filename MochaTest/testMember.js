// testMember.js to test GET, ADD, DELETE on
// API /members with Good and Bad 
// login data, username, ...
const assert = require('chai').assert;
const fetch = require('node-fetch');
const getCookies = require('./getCookies');

const urlBase = "http://127.0.0.1:3039/";

describe('Member Testing', function () {
    let res = null;
    let members = null;
    let myCookie = null;

    let goodLog = { // role: member
        email: "umbrate1989@yahoo.com",
        password: "n3pLS4|="
    };

    let goodAdmin = {
        // firstName: "Melia",
        // lastName: "Barker",
        email: "tirrivees1820@outlook.com",
        password: "49OqspUq"
        // role: "admin",
        // _id: "wapMq5lhZhFXGoNC"
    };

    let goodMember = {
        firstName: "Malena",
        lastName: "Varner",
        email: "ouirries1820@outlook.com",
        passHash: "$2a$13$OhVaKoSQ1jfepHSOmA3VYetCAjCVMnTzAX0Z1jTr2Yb6g5gyA5/n6",
        role: "member"
        // _id: "wapMq5lhZhFXGoNC"
    };

    let missMember = {
        firstName: "Malena",
        lastName: "Varner",
        email: "ouirries1820@outlook.com",
        role: "member"
        // _id: "wapMq5lhZhFXGoNC"
    };

    
    let bigMember = {
        firstName: "MilaFile size is commonly measured in bytes. In a plain text file, typically each byte is equal to one letter. One page of text can hold a few thousand letters, so a plain text file that has one page of text might be about 4,000 bytes in size. Since 1,000 bytes equals 1 kilobyte, we could express that as 4 kilobytes (KB).Plain text files can only contain letters, numbers and punctuation marks. In other words, they can’t contain any formatting. Formatting is a general term that includes such things as bold text, colored text or fonts (typefaces). The information needed to store formatting details in a file takes up space and thus increases a file’s size. If we took that one-page plain text file and converted it into a Microsoft Word document, underlined some text, converted some of the text to the Palatino font and other text to Times New Roman, this formatted one-page document might grow to be around 100 KB in size.If you then placed a jpeg image into that one-page Word file, it’s size would increase further. The size of jpeg images can vary widely from tens of kilobytes to hundreds, thousands or even tens of thousands. Let’s imagine that we insert a jpeg that is about 2 inches x 3 inches in size and is a low resolution. Such a jpeg might be 100 KB in size. Now our Word file could be about 200 KB in size.At this point, you hopefully remember that 1 letter is typically 1 byte in size and have a sense for how file size grows. You likely have a rough idea of how large a word processing file can be. Let’s move on.MilaFile size is commonly measured in bytes. In a plain text file, typically each byte is equal to one letter. One page of text can hold a few thousand letters, so a plain text file that has one page of text might be about 4,000 bytes in size. Since 1,000 bytes equals 1 kilobyte, we could express that as 4 kilobytes (KB).Plain text files can only contain letters, numbers and punctuation marks. In other words, they can’t contain any formatting. Formatting is a general term that includes such things as bold text, colored text or fonts (typefaces). The information needed to store formatting details in a file takes up space and thus increases a file’s size. If we took that one-page plain text file and converted it into a Microsoft Word document, underlined some text, converted some of the text to the Palatino font and other text to Times New Roman, this formatted one-page document might grow to be around 100 KB in size.If you then placed a jpeg image into that one-page Word file, it’s size would increase further. The size of jpeg images can vary widely from tens of kilobytes to hundreds, thousands or even tens of thousands. Let’s imagine that we insert a jpeg that is about 2 inches x 3 inches in size and is a low resolution. Such a jpeg might be 100 KB in size. Now our Word file could be about 200 KB in size.At this point, you hopefully remember that 1 letter is typically 1 byte in size and have a sense for how file size grows. You likely have a rough idea of how large a word processing file can be. Let’s move on.",
        lastName: "Tiuner",
        email: "ouirries1820@outlook.com",
        passHash: "9OAqspUq",
        role: "member"
        // _id: "wapMq5lhZhFXGoNC"
    };
    let badEmailMember = {
        firstName: "Malena",
        lastName: "Varner",
        email: "ouirries1820outlook",
        passHash: "9OAqspUq",
        role: "member"
    };
    describe('Get Member Tests', function () {
        it('Try to access as member', async function () {
            let res1 = await fetch(urlBase + 'login', {
                method: "post",
                body: JSON.stringify(goodLog),
                headers: {
                    "Content-Type": "application/json",
                    cookie: myCookie
                },
            });
            myCookie = getCookies(res1);
            let res2 = await fetch(urlBase + 'members');
            assert.equal(res2.status, 401);
            res = await fetch(urlBase + 'logout');
            myCookie = getCookies(res);
        });
        it('Login as Admin', async function () {
            let res1 = await fetch(urlBase + 'login', {
                method: "post",
                body: JSON.stringify(goodAdmin),
                headers: {
                    "Content-Type": "application/json",
                    cookie: myCookie
                },
            });
            myCookie = getCookies(res1);
            // let rol = await res1.json();
            // console.log(`role is:  ${rol.role}`);
            let res2 = await fetch(urlBase + 'members', {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    cookie: myCookie
                },
            });
            assert.equal(res2.status, 200);
            res = await fetch(urlBase + 'logout');
            myCookie = getCookies(res);
        });
        it('Returns an array', async function () {
            let res1 = await fetch(urlBase + 'login', {
                method: "post",
                body: JSON.stringify(goodAdmin),
                headers: {
                    "Content-Type": "application/json",
                    cookie: myCookie
                },
            });
            myCookie = getCookies(res1);
            let res2 = await fetch(urlBase + 'members', {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    cookie: myCookie
                },
            });
            members = await res2.json();
            assert.isArray(members);
            res = await fetch(urlBase + 'logout');
            myCookie = getCookies(res);
        });
        it('All Member elements have email and firstName', async function () {
            let res1 = await fetch(urlBase + 'login', {
                method: "post",
                body: JSON.stringify(goodAdmin),
                headers: {
                    "Content-Type": "application/json",
                    cookie: myCookie
                },
            });
            myCookie = getCookies(res1);
            let res2 = await fetch(urlBase + 'members', {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    cookie: myCookie
                },
            });
            members = await res2.json();
            members.forEach(function (mem) {
                assert.containsAllKeys(mem, ['firstName', 'email']);
            });
            res = await fetch(urlBase + 'logout');
            myCookie = getCookies(res);
        });
    });
    describe('Add Member Tests', function () {
        it('Try Add Member w/o logging in', async function () {
            res = await fetch(urlBase + 'members', {
                method: "post",
                body: JSON.stringify(goodMember),
                headers: {
                    "Content-Type": "application/json",
                    cookie: myCookie
                },
            });
            assert.equal(res.status, 401);
        });
        describe('Admin Login', async function () {
            before(async function () {
                res = await fetch(urlBase + 'login', {
                    method: "post",
                    body: JSON.stringify(goodAdmin),
                    headers: {
                        "Content-Type": "application/json",
                        cookie: myCookie
                    },
                });
                myCookie = getCookies(res);
            })
            it('Add Good member', async function () {
                let res2 = await fetch(urlBase + 'members', {
                    method: "post",
                    body: JSON.stringify(goodMember),
                    headers: {
                        "Content-Type": "application/json",
                        cookie: myCookie
                    },
                });
                assert.equal(res2.status, 201);
            });
            it('Add Too Big member', async function () {
                let res2 = await fetch(urlBase + 'members', {
                    method: "post",
                    body: JSON.stringify(bigMember),
                    headers: {
                        "Content-Type": "application/json",
                        cookie: myCookie
                    },
                });
                assert.equal(res2.status, 400);
            });
            it('Add Missing stuff member', async function () {
                let res2 = await fetch(urlBase + 'members', {
                    method: "post",
                    body: JSON.stringify(missMember),
                    headers: {
                        "Content-Type": "application/json",
                        cookie: myCookie
                    },
                });
                assert.equal(res2.status, 404);
            });
            it('Add Bad Email member', async function () {
                let res2 = await fetch(urlBase + 'members', {
                    method: "post",
                    body: JSON.stringify(badEmailMember),
                    headers: {
                        "Content-Type": "application/json",
                        cookie: myCookie
                    },
                });
                assert.equal(res2.status, 404);
            });
            res = await fetch(urlBase + 'logout');
            myCookie = getCookies(res); 
        });
    });
    let goodMemId = "2VZjEhnNhcoI3K1A";
    let badMemId = "2MZjEhnNhcoI3K1A";
    describe('Delete Member Tests', function () {
        it('Try Delete member w/o logging in', async function () {
            res = await fetch(urlBase + 'logout');
            myCookie = getCookies(res);
            res = await fetch(urlBase + 'members/:id', {
                method: "delete",
                params: { id: goodMemId },
                headers: {
                    "Content-Type": "application/json",
                    cookie: myCookie
                },
            });
            assert.equal(res.status, 401);
        });
        it('Admin Login then Delete member', async function () {
            let res1 = await fetch(urlBase + 'login', {
                method: "post",
                body: JSON.stringify(goodAdmin),
                headers: {
                    "Content-Type": "application/json",
                    cookie: myCookie
                },
            });
            myCookie = getCookies(res1);
            let res2 = await fetch(urlBase + 'members/:' + goodMemId, {
                method: "delete",
                params: { id: goodMemId },
                headers: {
                    "Content-Type": "application/json",
                    cookie: myCookie
                },
            });
            assert.equal(res2.status, 200); // Had to make it code 400, becasue member already deleted
        });
        myCookie = null;
        it('Admin Login then Bad Delete Id', async function () {
            let res1 = await fetch(urlBase + 'login', {
                method: "post",
                body: JSON.stringify(goodAdmin),
                headers: {
                    "Content-Type": "application/json",
                    cookie: myCookie
                },
            });
            myCookie = getCookies(res1);
            let res2 = await fetch(urlBase + 'members/:' + badMemId, {
                method: "delete",
                params: { id: badMemId },
                headers: {
                    "Content-Type": "application/json",
                    cookie: myCookie
                },
            });
            assert.equal(res2.status, 400);
        });
    });
})
