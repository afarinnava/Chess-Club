// LoginTest.js to test login and logout 
// with Good and Bad login information.
const assert = require('chai').assert;
const fetch = require('node-fetch');
const getCookies = require('./getCookies');

const urlBase = "http://127.0.0.1:3039/";

describe('Applicant Tests', function () {
    let res;
    let myCookie = null;

    let goodApplicant = {
        "Name": "Amy Villa",
        "Email": "Second@Sunday.com",
        "Password": "At%the0club",
        "Age": "18-21",
        "comments": "Hello"
    };
    let longApplicant = {
        "Name": "File size is commonly measured in bytes. In a plain text file, typically each byte is equal to one letter. One page of text can hold a few thousand letters, so a plain text file that has one page of text might be about 4,000 bytes in size. Since 1,000 bytes equals 1 kilobyte, we could express that as 4 kilobytes (KB).Plain text files can only contain letters, numbers and punctuation marks. In other words, they can’t contain any formatting. Formatting is a general term that includes such things as bold text, colored text or fonts (typefaces). The information needed to store formatting details in a file takes up space and thus increases a file’s size. If we took that one-page plain text file and converted it into a Microsoft Word document, underlined some text, converted some of the text to the Palatino font and other text to Times New Roman, this formatted one-page document might grow to be around 100 KB in size.If you then placed a jpeg image into that one-page Word file, it’s size would increase further. The size of jpeg images can vary widely from tens of kilobytes to hundreds, thousands or even tens of thousands. Let’s imagine that we insert a jpeg that is about 2 inches x 3 inches in size and is a low resolution. Such a jpeg might be 100 KB in size. Now our Word file could be about 200 KB in size.At this point, you hopefully remember that 1 letter is typically 1 byte in size and have a sense for how file size grows. You likely have a rough idea of how large a word processing file can be. Let’s move on.Amy VillaVillaVillaVillaVillaVillaVillaVillaVillaVillaVillaVillaVillaVillaVillaVillaVillaVillaVillaVillaVillaVillaVillaVillaVillaVillaVillaVillaVillaVillaVillaVillaVillaVilla",
        "Email": "Second@Sunday.com",
        "Password": "At%the0club",
        "Age": "18-21",
        "comments": "Hello"
    };
    let missApplicant = {
        "Name": "Amy Villa",
        "Password": "At%the0club",
        "Age": "18-21",
        "comments": "Hello"
    };
    let badEmailApplicant = {
        "Name": "Afarin Nava",
        "Email": "SecondSunday",
        "Password": "Ak^5he0club",
        "Age": "18-21",
        "comments": "Hello"
    };

    describe('Add Applicant Tests', function () {
        it('Add Good Applicant', async function () {
            // before(async function () {
                res = await fetch(urlBase + 'applicants', {
                    method: "post",
                    body: JSON.stringify(goodApplicant),
                    headers: {
                        "Content-Type": "application/json",
                        cookie: myCookie
                    },
                });
                assert.equal(res.status, 200);
            // });

        });
        it('Too Long JSON Applicant', async function () {
            // before(async function () {
                res = await fetch(urlBase + 'applicants', {
                    method: "post",
                    body: JSON.stringify(longApplicant),
                    headers: {
                        "Content-Type": "application/json",
                        cookie: myCookie
                    },
                });
                assert.equal(res.status, 400);
            // });
        }); 
        it('Reject data with missing required fields', async function () {
            // before(async function () {
                res = await fetch(urlBase + 'applicants', {
                    method: "post",
                    body: JSON.stringify(missApplicant),
                    headers: {
                        "Content-Type": "application/json",
                        cookie: myCookie
                    },
                });
                assert.equal(res.status, 401);
            // });
        });
        it('Bad Email Applicant', async function () {
            // before(async function () {
                res = await fetch(urlBase + 'applicants', {
                    method: "post",
                    body: JSON.stringify(badEmailApplicant),
                    headers: {
                        "Content-Type": "application/json",
                        cookie: myCookie
                    },
                });
                assert.equal(res.status, 401);
            // });
        });
    });
})
