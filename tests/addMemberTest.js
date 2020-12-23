// Testing a JSON delete interface
const fetch = require('node-fetch');

const urlBase = "http://127.0.0.1:3039/";
// const urlBase = "https://www.DrBsClasses.org/student39/node/";


let newMember = {
    firstName: "Lilianaa",
    lastName: "Abathon",
    email: "ate89@yahoo.com",
    passHash: "$2a$10$cdhMMKPlkWKJSjh7oZhAySDJRuxV2B73ezxgoM2FZEyAM4VykGZJh9p9S",
    role: "member"
};

let addMember = { // to delete a single activity
    url: urlBase + "members",
    options: {
        method: "POST",
        body: JSON.stringify(newMember),
        headers: { "Content-Type": "application/json" },
    },
    json: true,
};


async function someTests() {

/*     try {
        console.log("Testing POST a new member");
        fetch(addMember.url, addMember.options)
            .then(res => res.json())
            .then(json => console.log(`There are ${json.length} members`));
    } catch (e) {
        console.log(`Error: ${e}\n`);
    } */

    // Use professor's test
    let res = await fetch(urlBase + 'members', {
        method: "POST",
        body: JSON.stringify(newMember),
        headers: { "Content-Type": "application/json" }
    });

    let members = await res.json();
    console.log(`After add, there are ${members.length}`);
}

someTests();

