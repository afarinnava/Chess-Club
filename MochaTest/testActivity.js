// testActivity.js to test GET, ADD, DELETE on
// API /activitites with Good and Bad 
// login data, username, ...
const assert = require('chai').assert;
const fetch = require('node-fetch');
const getCookies = require('./getCookies');

const urlBase = "http://127.0.0.1:3039/";

describe('Activity Testing', function () {
    let res = null;
    let events = null;
    let myCookie = null;

    let goodActId = "wpXduB0GeZ4UZAzz";
    let badActId = "ppXduB0GeZ4UZAzz";
    let goodAct = {
        name: "File size is commonly",
        date: ["11/20/2020", "12/13/2020"],
        location: "At the club"
    };
    let bigAct = {
        name: "File size is commonly measured in bytes. In a plain text file, typically each byte is equal to one letter. One page of text can hold a few thousand letters, so a plain text file that has one page of text might be about 4,000 bytes in size. Since 1,000 bytes equals 1 kilobyte, we could express that as 4 kilobytes (KB).Plain text files can only contain letters, numbers and punctuation marks. In other words, they can’t contain any formatting. Formatting is a general term that includes such things as bold text, colored text or fonts (typefaces). The information needed to store formatting details in a file takes up space and thus increases a file’s size. If we took that one-page plain text file and converted it into a Microsoft Word document, underlined some text, converted some of the text to the Palatino font and other text to Times New Roman, this formatted one-page document might grow to be around 100 KB in size.If you then placed a jpeg image into that one-page Word file, it’s size would increase further. The size of jpeg images can vary widely from tens of kilobytes to hundreds, thousands or even tens of thousands. Let’s imagine that we insert a jpeg that is about 2 inches x 3 inches in size and is a low resolution. Such a jpeg might be 100 KB in size. Now our Word file could be about 200 KB in size.At this point, you hopefully remember that 1 letter is typically 1 byte in size and have a sense for how file size grows. You likely have a rough idea of how large a word processing file can be. Let’s move on.",
        date: ["11/20/2020", "12/13/2020"],
        location: "At the clubksdkhfhfkhfhffhkshfxcnmbshjkdhfkshckshdjkhsdkfhskdfhsdjbjshc At the clubksdkhfhfkhfhffhkshfxcnmbshjkdhfkshckshdjkhsdkfhskdfhsdjbjshckdfhsdjbjshc At the clubksdkhfhfkhfhffhkshfxcnmbshjkdhfkshckshdjkhsdkfhskdfhsdjbjshc kdfhsdjbjshc At the clubksdkhfhfkhfhffhkshfxcnmbshjkdhfkshckshdjkhsdkfhskdfhsdjbjshc kdfhsdjbjshc At the clubksdkhfhfkhfhffhkshfxcnmbshjkdhfkshckshdjkhsdkfhskdfhsdjbjshc kdfhsdjbjshc At the clubksdkhfhfkhfhffhkshfxcnmbshjkdhfkshckshdjkhsdkfhskdfhsdjbjshc kdfhsdjbjshc At the clubksdkhfhfkhfhffhkshfxcnmbshjkdhfkshckshdjkhsdkfhskdfhsdjbjshc kdfhsdjbjshc At the clubksdkhfhfkhfhffhkshfxcnmbshjkdhfkshckshdjkhsdkfhskdfhsdjbjshc kdfhsdjbjshc At the clubksdkhfhfkhfhffhkshfxcnmbshjkdhfkshckshdjkhsdkfhskdfhsdjbjshc kdfhsdjbjshc At the clubksdkhfhfkhfhffhkshfxcnmbshjkdhfkshckshdjkhsdkfhskdfhsdjbjshc kdfhsdjbjshc At the clubksdkhfhfkhfhffhkshfxcnmbshjkdhfkshckshdjkhsdkfhskdfhsdjbjshc kdfhsdjbjshc At the clubksdkhfhfkhfhffhkshfxcnmbshjkdhfkshckshdjkhsdkfhskdfhsdjbjshc kdfhsdjbjshc At the clubksdkhfhfkhfhffhkshfxcnmbshjkdhfkshckshdjkhsdkfhskdfhsdjbjshc "
    };
    let missAct = {
        name: "File size is commonly",
        date: ["11/20/2020", "12/13/2020"],
        // location: "At the club"
    };
    let goodLog = { // role: member
        email: "umbrate1989@yahoo.com",
        password: "n3pLS4|="
    };

    describe('Get Activity Tests', function () {
        before(async function () {
            res = await fetch(urlBase + 'activities');
        })
        it('Everything is OK', async function () {
            assert.equal(res.status, 200);
        });
        it('Returns an array', async function () {
            events = await res.json();
            assert.isArray(events);
        });
        it('All Activity elements have name, dates, and location', async function () {
            events.forEach(function (act) {
                assert.containsAllKeys(act, ['name', 'date', 'location']);
            });
        });
    });
    describe('Add Activity Tests', function () {
        it('Try add activity w/o logging in', async function () {
            // before(async function () {
            res = await fetch(urlBase + 'activities', {
                method: "post",
                body: JSON.stringify(goodAct),
                headers: {
                    "Content-Type": "application/json",
                    cookie: myCookie
                },
            });
            assert.equal(res.status, 401);
            // });
        });
        it('Login and Add Activity', async function () {
            // before(async function () {
            let res1 = await fetch(urlBase + 'login', {
                method: "post",
                body: JSON.stringify(goodLog),
                headers: {
                    "Content-Type": "application/json",
                    cookie: myCookie
                },
            });
            myCookie = getCookies(res1);
            let res2 = await fetch(urlBase + 'activities', {
                method: "post",
                body: JSON.stringify(goodAct),
                headers: {
                    "Content-Type": "application/json",
                    cookie: myCookie
                },
            });
            // console.log(`es2.status is ${es2.status}`);
            assert.equal(res2.status, 201);
            res = await fetch(urlBase + 'logout');
            myCookie = getCookies(res);
            // });
        });
        it('Add Too Big Activity', async function () {
            // before(async function () {
            let res1 = await fetch(urlBase + 'login', {
                method: "post",
                body: JSON.stringify(goodLog),
                headers: {
                    "Content-Type": "application/json",
                    cookie: myCookie
                },
            });
            myCookie = getCookies(res1);
            let res2 = await fetch(urlBase + 'activities', {
                method: "post",
                body: JSON.stringify(bigAct),
                headers: {
                    "Content-Type": "application/json",
                    cookie: myCookie
                },
            });
            assert.equal(res2.status, 400);
            res = await fetch(urlBase + 'logout');
            myCookie = getCookies(res);
            // });
        });
        it('Add missing stuff Activity', async function () {
            // before(async function () {
            let res1 = await fetch(urlBase + 'login', {
                method: "post",
                body: JSON.stringify(goodLog),
                headers: {
                    "Content-Type": "application/json",
                    cookie: myCookie
                },
            });
            myCookie = getCookies(res1);
            let res2 = await fetch(urlBase + 'activities', {
                method: "post",
                body: JSON.stringify(missAct),
                headers: {
                    "Content-Type": "application/json",
                    cookie: myCookie
                },
            });
            assert.equal(res2.status, 404);
            res = await fetch(urlBase + 'logout');
            myCookie = getCookies(res);
            // });
        });
    });
    describe('Delete Activity Tests', function () {
        it('Try Delete activity w/o logging in', async function () {
            // before(async function () {
            res = await fetch(urlBase + 'activities/:id', {
                method: "delete",
                params: { id: goodActId },
                // { id: goodActId },
                headers: {
                    "Content-Type": "application/json",
                    cookie: myCookie
                },
            });
            assert.equal(res.status, 401);
            // });
        });
        it('Login then Delete Activity', async function () {
            // before(async function () {
            let res1 = await fetch(urlBase + 'login', {
                method: "post",
                body: JSON.stringify(goodLog),
                headers: {
                    "Content-Type": "application/json",
                    cookie: myCookie
                },
            });
            myCookie = getCookies(res1);
            let res2 = await fetch(urlBase + 'activities/:' + goodActId, {
                method: "delete",
                params: { id: goodActId },
                headers: {
                    "Content-Type": "application/json",
                    cookie: myCookie
                },
            });
            assert.equal(res2.status, 200); //Had to change the status code to 400 since this activity has been deleted
            res = await fetch(urlBase + 'logout');
            myCookie = getCookies(res);
            // });
        });
        it('Login then Bad Delete Activity', async function () {
            // before(async function () {
            let res1 = await fetch(urlBase + 'login', {
                method: "post",
                body: JSON.stringify(goodLog),
                headers: {
                    "Content-Type": "application/json",
                    cookie: myCookie
                },
            });
            myCookie = getCookies(res1);
            let res2 = await fetch(urlBase + 'activities/:' + badActId, {
                method: "delete",
                params: { id: badActId },
                headers: {
                    "Content-Type": "application/json",
                    cookie: myCookie
                },
            });
            assert.equal(res2.status, 400);
            // });
        });
    });
})
