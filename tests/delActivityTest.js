// Testing a JSON delete interface
const fetch = require('node-fetch');

const urlBase = "http://127.0.0.1:3039/";
// const urlBase = "https://www.DrBsClasses.org/student39/node/";
let idL = "PWle3c9goUC3VDmf";
let idB = "PWle3c9goUC3VDmg";

let getActivity = { //to get the initial acivitities
    url: urlBase + "activities",
    options: { json: true }
};

let delActivity = { // to delete a single activity
    url: urlBase + "activities" + "/:" + idL,
    options: {
        method: "delete",
        params: { id: idL },
        headers: { "Content-Type": "application/json" },
    },
    json: true,
};

let delBadIndex = { // to delete a bad index
    url: urlBase + "activities" + "/:" + idB,
    options: {
        method: "delete",
        params: { id: idB },
        headers: { "Content-Type": "application/json" },
    },
    json: true,
};

async function someTests() {

/*     try {
        console.log("Test 1- Get initial activities");
        fetch(getActivity.url, getActivity.options)
            .then(res => res.json())
            .then(json => console.log(json));
    } catch (e) {
        console.log(`Error: ${e}\n`);
    }


    try {
        console.log("Test 2- Deleting a single activity");
        fetch(delActivity.url, delActivity.options)
            .then(res => res.json())
            .then(json => console.log(json));
    } catch (e) {
        console.log(`Error: ${e}\n`);
    }


    try {
        console.log("Test 3- Trying to delete an activity with a bad index value");
        fetch(delBadIndex.url, delBadIndex.options)
            .then(res => res.json())
            .then(json => console.log(json));
    } catch (e) {
        console.log(`Error: ${e}\n`);
    } */

    // Trying to use professor's code
    // 1- Get all activities
    let res = await fetch(urlBase + 'activities');
    let acts = await res.json();
    console.log(`Initially ${acts.length} activities`);

    // 2- Try delete
    res = await fetch(urlBase + 'activities/:' + idL, {
        method: "DELETE",
        params: { id: idL }
    });
    acts = await res.json();
    console.log(`After delete attempt ${acts.length} activities`);

    // 3- Try bad delete
    res = await fetch(urlBase + 'activities/:' + idB, {
        method: "DELETE",
        params: { id: idB },
    });
    console.log("Trying to delete a bad index:");
    console.log(`HTTP status: ${res.statusText}`);
    let msg = await res.json();
    console.log(msg);

}

someTests();