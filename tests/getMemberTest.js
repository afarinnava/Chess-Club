// Testing a JSON get member interface
const fetch = require('node-fetch');

const urlBase = "http://127.0.0.1:3039/";
// const urlBase = "https://www.DrBsClasses.org/student39/node/";

let getMembers = { //to get all members
    url: urlBase + "members",
    options: { json: true }
};

async function someTests() {
/*     try {
         console.log("Testing to Get All Members");
        fetch(getMembers.url, getMembers.options)
            .then(res => res.json())
            .then(json => console.log(`There are ${json.length} members and type: ${typeof(json)}`));
    } catch (e) {
        console.log(`Error: ${e}\n`);
    }  */

     // Using profrssor's code
    let res = await fetch(urlBase + 'members');
    let members = await res.json();
    console.log(`Initially ${members.length}`); 
}

someTests();