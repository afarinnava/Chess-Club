// Testing a JSON delete interface
const fetch = require('node-fetch');
const urlBase = "http://127.0.0.1:3039/";
// const urlBase = "https://www.DrBsClasses.org/student39/node/";


let goodLogin = {
/*     email: "umbrate1989@yahoo.com",
    password: "n3pLS4|=" */
    "email": "boisset1829@live.com",
    "password": "dnRZ_.zR",
};

let badEmail = {
    email: "umbate1989@yahoo.com",
    password: "n3pLS4|="
};

let badPassword = {
    email: "chihuahua1899@gmail.com",
    password: "Afarin"
};

/* let verifyLog1 = { // to verify login
    url: urlBase + "login",
    options: {
        method: "POST",
        body: JSON.stringify(goodLog),
        headers: { "Content-Type": "application/json" },
    },
    json: true,
};

let verifyLog2 = { // to verify login
    url: urlBase + "login",
    options: {
        method: "POST",
        body: JSON.stringify(badELog),
        headers: { "Content-Type": "application/json" },
    },
    json: true,
};

let verifyLog3 = { // to verify login
    url: urlBase + "login",
    options: {
        method: "POST",
        body: JSON.stringify(badPLog),
        headers: { "Content-Type": "application/json" },
    },
    json: true,
}; */

async function someTests() {

/*     try {
        // Test 1- Good email, good password
        fetch(verifyLog1.url, verifyLog1.options)
            .then(res => res.json())
            .then(function (json) {
                console.log("Test 1- Good email, good password status: Ok");
                console.log(json);
            });
    } catch (e) {
        console.log(`Error: ${e}\n`);
    }

    try {
        // Test 2- Bad email (user not found)
        fetch(verifyLog2.url, verifyLog2.options)
            .then(res => res.json())
            .then(function (json) {
                console.log("Test 2- Bad email (user not found)");
                console.log(`After bad Email status: Unauthorized\n`);
                console.log(json);
            });
    } catch (e) {
        console.log(`Error: ${e}\n`);
    }

    try {
        // Test 3- Good email, incorrect password
        fetch(verifyLog3.url, verifyLog3.options)
            .then(res => res.json())
            .then(function (json) {
                console.log("Going to number 3");
                console.log("Test 3- Good email, incorrect password");
                console.log(`After bad Password status: Unauthorized\n`);
                console.log(json);
            });
    } catch (e) {
        console.log(`Error: ${e}\n`);
    } */

    // Using Professor's code

    // Good login
    console.log("Trying good login:");
    let res = await fetch(urlBase + 'login', {
        method: "POST",
        body: JSON.stringify(goodLogin),
        headers: { "Content-Type": "application/json" },
    });
    msg = await res.json();
    console.log(`After good login status: ${res.statusText}`);
    console.log(msg);

    // Bad Email
    console.log("Trying Bad email:");
    res = await fetch(urlBase + 'login', {
        method: "POST",
        body: JSON.stringify(badEmail),
        headers: { "Content-Type": "application/json" },
    });
    msg = await res.json();
    console.log(`After bad login status: ${res.statusText}`);
    console.log(msg);

    // Bad Password
    console.log("Trying Bad password:");
    res = await fetch(urlBase + 'login', {
        method: "POST",
        body: JSON.stringify(badPassword),
        headers: { "Content-Type": "application/json" },
    });
    msg = await res.json();
    console.log(`After bad password status: ${res.statusText}`);
    console.log(msg);
}


someTests();

