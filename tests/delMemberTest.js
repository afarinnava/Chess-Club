// Testing a member JSON delete interface
const fetch = require('node-fetch');

const urlBase = "http://127.0.0.1:3039/";
// const urlBase = "https://www.DrBsClasses.org/student39/node/";
/* let idL = "2";
let idB = "50"; */

let idL = "2MIqCFmuvqo1SZgk";
let idB = "2MZjEhnNhcoI3K1A";

/* let getMember = { //to get the initial members
    url: urlBase + "members",
    options: { json: true }
};

let delMember = { // to delete a single activity
    url: urlBase + "members" + "/:" + idL,
    options: {
        method: "delete",
        params: { id: idL },
        headers: { "Content-Type": "application/json" },
    },
    json: true,
};

let delBadIndex = { // to delete a bad index
    url: urlBase + "members" + "/:" + idB,
    options: {
        method: "delete",
        params: { id: idB },
        headers: { "Content-Type": "application/json" },
    },
    json: true,
}; */

async function someTests() {

/*     try {
        // Test 1- Get initial members
        fetch(getMember.url, getMember.options)
            .then(res => res.json())
            .then(function(json){
                console.log("Test 1- Get initial members");
                console.log(`There are initial ${json.length} members`)
            });
    } catch (e) {
        console.log(`Error: ${e}\n`);
    }


    try {
        // Test 2- Deleting a single member"
        fetch(delMember.url, delMember.options)
            .then(res => res.json())
            .then(function(json){
                console.log("Test 2- Deleting a single member");
                console.log(`After deleting one member, there are ${json.length} members`)
            });
    } catch (e) {
        console.log(`Error: ${e}\n`);
    }


    try {
        // Test 3- Trying to delete a member with a bad index value
        fetch(delBadIndex.url, delBadIndex.options)
            .then(res => res.json())
            .then(function(json){
                console.log("Test 3- Trying to delete a member with a bad index value");
                console.log(`${json.message}`)
            });
    } catch (e) {
        console.log(`Error: ${e}\n`);
    } */

    // Use professor's code
    let res = await fetch(urlBase + `members`);
    members = await res.json();

    res = await fetch(urlBase + 'members/:' + idL, {
        method: "DELETE",
        params: { id: idL }
    });
    members = await res.json();
    console.log(`After delete attempt ${members.length} activities`);

    // Try bad delete
    res = await fetch(urlBase + 'members/:' + idB, {
        method: "DELETE",
        params: { id: idB },
    });
    console.log("Trying to delete a bad id:");
    console.log(`HTTP status: ${res.statusText}`);
    let msg = await res.json();
    console.log(msg);
}

someTests();